import {
  Box,
  Button,
  Center,
  HStack,
  Icon,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { ReactComponent as WalletIcon } from '../../assets/logos/wallet-icon.svg';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

import { useTranslation } from 'react-i18next';
import '../../i18n';

import { useAdapter } from '../../hooks/use-adapter';
import { useEffect, useState } from 'react';
import MobileConnectWalletModal from './navbar/MobileConnectWalletModal';
import { useNetworkManager } from '../../hooks/use-manager';

function ConnectWallet() {
  const { manager, network } = useNetworkManager();

  const { adapter, isAuthenticated, setIsAuthenticated, setProfile } =
    useAdapter();

  const { t } = useTranslation('ConnectWalletOnboarding');

  const [users, setUsers] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const login = async () => {
    console.log('here in login');
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

  useEffect(() => {
    async function getUsersConnected() {
      await manager.switchNetwork(network.chainName);
      const users = await adapter.getUsers();

      setUsers(users);
    }

    getUsersConnected();
  }, [adapter, manager, network.chainName]);

  return (
    <Center>
      <Box
        bg={'white'}
        borderRadius={15}
        height={['300px', '356px', '356px']}
        width={['80%', '80%', '500px']}
        marginTop={[10, 40, 40]}
      >
        <Box marginTop={10}>
          <Center>
            <WalletIcon width={80} height={80} />
          </Center>
        </Box>

        <Center margin={5}>
          <Text
            fontWeight={700}
            fontSize={'22'}
            letterSpacing={'5px'}
            lineHeight={'26.4px'}
          >
            {t('title')}
          </Text>
        </Center>

        <Center margin={5}>
          <Text
            fontWeight={400}
            fontSize={'18'}
            lineHeight={'21.6px'}
            color="grayLetter"
            textAlign={'center'}
          >
            {t('subtitle')}
          </Text>
        </Center>

        <Center marginTop={5}>
          <Box
            width={'100%'}
            borderRadius={20}
            boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
          >
            <Center paddingTop={5}>
              <Button
                bg={'primary'}
                color="white"
                borderRadius={70}
                display={['block', 'none', 'none']}
                onClick={onOpen}
              >
                <Text fontWeight={400} fontSize={'18px'} lineHeight={'21.6px'}>
                  {t('button')}
                </Text>
              </Button>

              <Button
                bg={'primary'}
                color="white"
                borderRadius={70}
                display={['none', 'block', 'block']}
                onClick={login}
              >
                <Text fontWeight={400} fontSize={'18px'} lineHeight={'21.6px'}>
                  {t('button')}
                </Text>
              </Button>
            </Center>

            <HStack margin={'auto'} paddingTop={5}>
              <Icon as={VisibilityIcon} margin={5} color="sixth" />

              <Text color={'grayLetter'} fontSize={'14'} paddingRight={2}>
                {t('permission')}
              </Text>
            </HStack>

            <HStack>
              <Icon as={FavoriteIcon} margin={5} color="sixth" />

              <Text color={'grayLetter'} fontSize={'14'}>
                {t('trustedBy')} {users} {t('users')}
              </Text>
            </HStack>

            <HStack>
              <Icon as={VerifiedUserIcon} margin={5} color="sixth" />

              <Text color={'grayLetter'} fontSize={'14'}>
                {t('verified')}
              </Text>
            </HStack>
          </Box>
        </Center>

        <MobileConnectWalletModal isOpen={isOpen} onClose={onClose} />
      </Box>
    </Center>
  );
}

export default ConnectWallet;
