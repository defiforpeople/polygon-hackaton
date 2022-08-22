import React, { useEffect } from 'react';

import { Box, Button, Center, HStack, Icon, Text } from '@chakra-ui/react';

import { ReactComponent as WalletIcon } from '../../assets/logos/wallet-icon.svg';

import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { useTranslation } from 'react-i18next';
import '../../i18n';

import { useAdapter } from '../../hooks/use-adapter';

import { Link } from 'react-router-dom';

import { useNetworkManager } from '../../hooks/use-manager';

function ConnectWalletOnboarding() {
  const { adapter } = useAdapter();

  const { manager, network } = useNetworkManager();

  const { t } = useTranslation('ConnectWalletOnboarding');

  const [users, setUsers] = React.useState(0);

  useEffect(() => {
    async function getUsersConnected() {
      await manager.switchNetwork(network.chainName);

      const users = await adapter.getUsers();

      setUsers(users);
    }

    getUsersConnected();
  }, [adapter]);

  return (
    <Center>
      <Box
        bg={'white'}
        borderRadius={15}
        height={['300px', '356px', '356px']}
        width={['80%', '80%', '500px']}
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
              <Link to={'/app'}>
                <Button bg={'primary'} color="white" borderRadius={70}>
                  <Text
                    fontWeight={400}
                    fontSize={'18px'}
                    lineHeight={'21.6px'}
                  >
                    {t('button')}
                  </Text>
                </Button>
              </Link>
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
          </Box>
        </Center>
      </Box>
    </Center>
  );
}

export default ConnectWalletOnboarding;
