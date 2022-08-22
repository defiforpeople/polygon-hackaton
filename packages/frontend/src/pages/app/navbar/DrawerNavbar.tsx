import React from 'react';

import {
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  HStack,
  Text,
} from '@chakra-ui/react';

import Logo from '../../../components/logo';
import { ReactComponent as GithubLogo } from '../../../assets/logos/github-logo.svg';

import { useTranslation } from 'react-i18next';
import '../../../i18n';
import { Link } from 'react-router-dom';

type Props = {
  isOpen: any;
  onClose: any;
};

function DrawerNavbar({ isOpen, onClose }: Props) {
  const { t, i18n } = useTranslation('DrawerNavbar');

  const changeLanguage = () => {
    if (i18n.language === 'en') {
      i18n.changeLanguage('es');
    } else {
      i18n.changeLanguage('en');
    }
  };

  return (
    <Drawer placement={'left'} onClose={onClose} isOpen={isOpen} size={'full'}>
      <DrawerOverlay />
      <DrawerContent bg="#F1F4F6">
        <DrawerCloseButton color={'primary'} size={'lg'} />

        <Box marginLeft={'auto'} marginRight={'auto'} marginTop={'50px'}>
          <Logo w={160} h={10} color="#3A0CA3" />
        </Box>

        <DrawerBody textAlign={'center'}>
          <Link to="/strategies">
            <Text
              fontSize={'36px'}
              lineHeight={'43.2px'}
              color="grayLetter"
              marginTop={'30px'}
            >
              {t('strategies')}
            </Text>
          </Link>

          <HStack marginTop={'114px'} justifyContent="space-around">
            <Link to="/app">
              <Button
                height={'50px'}
                width={'150px'}
                bg={'white'}
                boxShadow="0px 2px 3px rgba(0, 0, 0, 0.15)"
                borderRadius={'70px'}
              >
                <Text fontSize={'18px'} lineHeight={'21.6px'} color="primary">
                  {t('enter')}
                </Text>
              </Button>
            </Link>

            <Link to="/onboarding">
              <Button
                height={'50px'}
                width={'150px'}
                bg={'primary'}
                boxShadow="0px 2px 3px rgba(0, 0, 0, 0.15)"
                borderRadius={'70px'}
              >
                <Text fontSize={'18px'} lineHeight={'21.6px'} color="white">
                  {t('begin')}
                </Text>
              </Button>
            </Link>
          </HStack>

          <Center marginTop={100}>
            <Text fontWeight={400} fontSize={'14'} color="grayLetter">
              {t('changeLanguage')}&nbsp;
            </Text>
            <Text
              fontWeight={400}
              fontSize={'14'}
              color="sixth"
              onClick={changeLanguage}
              _hover={{ cursor: 'pointer' }}
            >
              {i18n.language === 'en' ? 'Español 🇪🇸' : 'English 🇺🇸'}
            </Text>
          </Center>
        </DrawerBody>

        <DrawerFooter margin={'auto'}>
          <GithubLogo />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default DrawerNavbar;
