import React from 'react';

import { Flex, Text } from '@chakra-ui/react';

import { useTranslation } from 'react-i18next';
import '../../../i18n';

function FooterApp() {
  const { t } = useTranslation('footer');

  return (
    <Flex
      as="footer"
      marginTop={'auto'}
      height={'50px'}
      align="center"
      alignItems={'center'}
    >
      <Text padding={3} color={'grayLetter'}>
        {t('copyright')}{' '}
      </Text>
    </Flex>
  );
}

export default FooterApp;
