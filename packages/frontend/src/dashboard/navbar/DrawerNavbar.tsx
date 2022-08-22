import React from 'react';

import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  HStack,
  Link,
  Text,
} from '@chakra-ui/react';

import Logo from '../../components/logo';
import { ReactComponent as GithubLogo } from '../../assets/logos/github-logo.svg';

import { useTranslation } from 'react-i18next';
import '../../i18n';

type Props = {
  isOpen: any;
  onClose: any;
};

function DrawerNavbar({ isOpen, onClose }: Props) {
  const { t } = useTranslation('DrawerNavbar');

  return (
    <Drawer placement={'left'} onClose={onClose} isOpen={isOpen} size={'full'}>
      <DrawerOverlay />
      <DrawerContent bg="#F1F4F6">
        <DrawerCloseButton color={'primary'} size={'lg'} />

        <Box marginLeft={'auto'} marginRight={'auto'} marginTop={'50px'}>
          <Logo w={160} h={10} color="#3A0CA3" />
        </Box>

        <DrawerBody textAlign={'center'}>
          <Text
            fontSize={'36px'}
            lineHeight={'43.2px'}
            color="grayLetter"
            marginTop={'50px'}
          >
            {t('how')}
          </Text>

          <Text
            fontSize={'36px'}
            lineHeight={'43.2px'}
            color="grayLetter"
            marginTop={'30px'}
            _hover={{
              cursor: 'pointer',
              color: 'primary',
            }}
          >
            {t('gobernance')}
          </Text>

          <HStack marginTop={'114px'} justifyContent="space-around">
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
          </HStack>
        </DrawerBody>

        <DrawerFooter margin={'auto'}>
          <Link
            href="https://github.com/defiforpeople/chainlink-hackathon"
            isExternal
          >
            <GithubLogo />
          </Link>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default DrawerNavbar;
