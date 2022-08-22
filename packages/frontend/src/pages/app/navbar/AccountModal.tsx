import { useEffect } from 'react';

import {
  Box,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
} from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';
import { useAdapter } from '../../../hooks/use-adapter';
import { Profile } from '../../../utils/network-manager';

type Props = {
  isOpen: any;
  onClose: any;
};

export default function AccountModal({ isOpen, onClose }: Props) {
  const { adapter, isAuthenticated, setIsAuthenticated, profile, setProfile } =
    useAdapter();

  useEffect(() => {
    async function getProfile() {
      const profile = await adapter.getProfile();
      setProfile(profile);
    }

    if (isAuthenticated) {
      getProfile();
    }
  }, [adapter, isAuthenticated, setProfile]);

  const logOut = async () => {
    await adapter.logout();
    setIsAuthenticated(false);
    setProfile({
      address: '',
      ens: '',
    } as Profile);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay />
      <ModalContent
        boxShadow="0px 0px 10px rgba(0, 0, 0, 0.25)"
        borderRadius={'15px'}
      >
        <ModalHeader color="white" px={4} fontSize="lg" fontWeight="medium">
          Account
        </ModalHeader>
        <ModalCloseButton
          color="black"
          fontSize="sm"
          _hover={{
            color: 'gray.300',
          }}
        />
        <ModalBody pt={0} px={4}>
          <Box
            borderRadius="3xl"
            border="1px"
            borderStyle="solid"
            borderColor="gray.600"
            px={5}
            pt={4}
            pb={2}
            mb={3}
          >
            <Flex justifyContent="space-between" alignItems="center" mb={3}>
              <Text color="black" fontSize="sm">
                Connected with MetaMask
              </Text>
            </Flex>
            <Flex alignItems="center" mt={2} mb={4} lineHeight={1}>
              <Text
                color="black"
                fontSize="xl"
                fontWeight="semibold"
                ml="2"
                lineHeight="1.1"
              >
                {isAuthenticated &&
                  `${profile?.address.slice(0, 6)}...${profile?.address.slice(
                    profile?.address.length - 4,
                    profile?.address.length,
                  )}`}
              </Text>
            </Flex>
            <Flex alignContent="center" m={5}>
              <Button
                onClick={() =>
                  navigator.clipboard.writeText(profile?.address!.toString())
                }
                variant="link"
                color="black"
                fontWeight="normal"
                fontSize="sm"
                _hover={{
                  textDecoration: 'none',
                  color: 'gray.400',
                }}
              >
                <CopyIcon mr={1} />
                Copy Address
              </Button>
              <Button
                margin={3}
                onClick={() => {
                  logOut();
                  onClose();
                }}
              >
                Logout
              </Button>
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
