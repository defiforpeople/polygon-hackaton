import { ReactElement } from 'react';
import { Box, SimpleGrid, Icon, Text, Stack, Flex } from '@chakra-ui/react';

import { ReactComponent as AaveLogo } from '../../assets/logos/aave-logo.svg';
import { ReactComponent as UniswapLogo } from '../../assets/logos/uniswap-logo.svg';

import { useTranslation } from 'react-i18next';
import '../../i18n';
import { Link } from 'react-router-dom';

interface FeatureProps {
  title: string;
  text: string;
  icon: ReactElement;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <Stack align={'center'} pl={10} pr={10}>
      <Flex w={16} h={16} align={'center'} justify={'center'} color={'white'}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text textAlign={'center'}>{text}</Text>
    </Stack>
  );
};

function StrategyList() {
  const { t } = useTranslation('strategies');

  return (
    <Box maxW={'4xl'} margin={'auto'} padding={10}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={20}>
        <Feature
          icon={<Icon as={AaveLogo} w={14} h={14} />}
          title={t('strategy1')}
          text={t('strategy1_description')}
        />
        <Feature
          icon={<Icon as={UniswapLogo} w={20} h={20} />}
          title={t('strategy2')}
          text={t('strategy2_description')}
        />
      </SimpleGrid>
    </Box>
  );
}

export default StrategyList;
