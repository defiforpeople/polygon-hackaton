import React from 'react';

import {
  Center,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import { useTranslation } from 'react-i18next';
import '../../../i18n';

import Logo from '../../../components/logo';

type Props = {
  isOpen: any;
  onClose: any;
};

function MobileConnectWalletModal({ isOpen, onClose }: Props) {
  const { t } = useTranslation('mobileConnectWalletModal');

  return (
    <Modal size={'xs'} isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent h="200px">
        <ModalHeader>
          <Center>
            <Logo w={160} h={6} color="#3A0CA3" />
          </Center>
        </ModalHeader>

        <ModalBody textAlign={'center'}>{t('message')}</ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default MobileConnectWalletModal;
