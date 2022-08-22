import { useEffect } from 'react';

import { Button, Box, Text, Icon, useDisclosure } from '@chakra-ui/react';

import PersonIcon from '@mui/icons-material/Person';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { useTranslation } from 'react-i18next';
import '../../../i18n';

import MobileConnectWalletModal from './MobileConnectWalletModal';

import { useAdapter } from '../../../hooks/use-adapter';

type Props = {
  handleOpenModal: any;
};

function ConnectButton({ handleOpenModal }: Props) {
  // console.log('Its rendering ConnectButton component');

  const { t } = useTranslation('connectWallet');

  const { adapter, isAuthenticated, setIsAuthenticated, setProfile, profile } =
    useAdapter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchProfile = async () => {
      if (isAuthenticated) {
        setIsAuthenticated(true);

        const profile = await adapter.getProfile();
        setProfile(profile);
      }
    };

    fetchProfile();
  }, [adapter, isAuthenticated, setIsAuthenticated, setProfile]);

  const login = async () => {
    if (!isAuthenticated) {
      try {
        const profile = await adapter.login(t('signingMessage'));

        setIsAuthenticated(true);
        setProfile(profile);

        console.log('Logged profile user:', profile);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return isAuthenticated ? (
    <Box display="flex" marginRight={10}>
      <Button
        onClick={handleOpenModal}
        border="1px solid transparent"
        _hover={{
          backgroundColor: 'primary',
          color: 'white',
        }}
        borderRadius="xl"
        m="1px"
        px={3}
        height="38px"
        color="grayLetter"
      >
        <Icon as={PersonIcon} marginRight={3} />

        <Text fontWeight={700} fontSize={'18'} lineHeight={'21.6px'}>
          {profile.ens !== ''
            ? profile.ens
            : profile.address &&
              `${profile.address.slice(0, 6)}...${profile.address.slice(
                profile.address.length - 4,
                profile.address.length,
              )}`}
        </Text>

        <Icon as={KeyboardArrowDownIcon} marginRight={3} />
      </Button>
    </Box>
  ) : (
    <Box>
      <Button
        onClick={login}
        bg="primary"
        color="white"
        border="1px solid transparent"
        _hover={{
          border: '1px',
          borderStyle: 'solid',
          borderColor: 'sixth',
          backgroundColor: 'sixth',
        }}
        borderRadius="xl"
        marginRight={5}
        px={3}
        height="38px"
        display={['none', 'block', 'block']}
      >
        {t('connectWallet')}
      </Button>

      <Button
        onClick={onOpen}
        bg="primary"
        color="white"
        border="1px solid transparent"
        _hover={{
          border: '1px',
          borderStyle: 'solid',
          borderColor: 'sixth',
          backgroundColor: 'sixth',
        }}
        borderRadius="xl"
        marginRight={5}
        px={3}
        height="38px"
        display={['block', 'none', 'none']}
      >
        {t('connectWallet')}
      </Button>

      <MobileConnectWalletModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}

export default ConnectButton;
