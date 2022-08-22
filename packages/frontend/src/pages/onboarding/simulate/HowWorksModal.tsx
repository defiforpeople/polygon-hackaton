import React from 'react';

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';

import { useTranslation } from 'react-i18next';
import '../../../i18n';

type Props = {
  isOpen: any;
  onClose: any;
};

function HowWorksModal({ isOpen, onClose }: Props) {
  const { t } = useTranslation('Simulation');

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={'sm'}>
      <ModalOverlay />
      <ModalContent
        background="white"
        borderColor="gray.700"
        borderRadius="3xl"
      >
        <ModalHeader>
          <Text fontSize="lg" fontWeight="bold">
            {t('howIsCalculated')}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{t('text1')}</Text>

          <Text marginTop={5}>{t('APYoptimistic')}</Text>
          <Text>{t('APYpessimistic')}</Text>

          <Text marginTop={5}>{t('text2')}</Text>

          <Text paddingTop={4} paddingBottom={10} textAlign="center">
            {t('calculateValue')}
          </Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default HowWorksModal;
