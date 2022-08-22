import { Box, Button, Flex, Link as ChakraLink, Text } from '@chakra-ui/react';

import Logo from '../../../components/logo';
import { ReactComponent as GithubLogo } from '../../../assets/logos/github-logo.svg';

import { useTranslation } from 'react-i18next';
import '../../../i18n';

import { Link } from 'react-router-dom';

import BlurFooterLanding from './BlurFooterLanding';

function FooterLanding() {
  const { t, i18n } = useTranslation('FooterLanding');

  const changeLanguage = () => {
    if (i18n.language === 'en') {
      i18n.changeLanguage('es');
    } else {
      i18n.changeLanguage('en');
    }
  };

  return (
    <Box bg={'red'} height={'0px'}>
      <BlurFooterLanding />

      <Box paddingTop={50} paddingLeft={[5, 100, 100]}>
        <Logo w={160} h={10} color="#3A0CA3" />
      </Box>

      <Flex paddingTop={5} paddingLeft={[5, 100, 100]}>
        <Box width={['45%', '20%', '20%']}>
          <Text
            fontSize={['24px', '28px', '28px']}
            lineHeight={['28.8px', '33.6px', '33.6px']}
            letterSpacing={'5%'}
            fontWeight={'600'}
            color="#282828"
          >
            {t('info')}
          </Text>

          <Link to="/strategies">
            <Text
              fontSize={['12px', '22px', '22px']}
              lineHeight={['19.2px', '28.8px', '28.8px']}
              color="grayLetter"
              paddingTop={2}
            >
              {t('strategies')}
            </Text>
          </Link>
        </Box>

        <Box width={['45%', '20%', '20%']}>
          <Text
            fontSize={['24px', '28px', '28px']}
            lineHeight={['28.8px', '33.6px', '33.6px']}
            letterSpacing={'5%'}
            fontWeight={'600'}
            color="#282828"
          >
            {t('products')}
          </Text>

          <Link to="/app">
            <Text
              fontSize={['16px', '22px', '22px']}
              lineHeight={['19.2px', '28.8px', '28.8px']}
              color="grayLetter"
              paddingTop={2}
            >
              {t('strategy1')}
            </Text>
          </Link>

          <Link to="/app">
            <Text
              fontSize={['16px', '22px', '22px']}
              lineHeight={['19.2px', '28.8px', '28.8px']}
              color="grayLetter"
              paddingTop={2}
            >
              {t('strategy2')}
            </Text>
          </Link>
        </Box>

        <Box width={'40%'} display={['none', 'block', 'block']}>
          <Text
            fontSize={'28px'}
            lineHeight={'33.6px'}
            letterSpacing={'5px'}
            fontWeight={'600'}
            color="#282828"
          >
            {t('touch')}
          </Text>

          <Text
            fontSize={'22px'}
            lineHeight={'28.8px'}
            color="grayLetter"
            paddingTop={2}
          >
            {t('touchMessage')}
          </Text>

          <ChakraLink href="mailto:defiforpeople@gmail.com" isExternal>
            <Button bg="primary" borderRadius={'24px'} marginTop={10}>
              <Text
                fontSize={'18px'}
                lineHeight={'26.4px'}
                letterSpacing={'2px'}
                color="white"
              >
                {t('suscribe')}
              </Text>
            </Button>
          </ChakraLink>
        </Box>
      </Flex>

      <Box marginTop={[5, 5, 5]} paddingLeft={[5, 100, 100]} width="20%">
        <ChakraLink href="https://github.com/defiforpeople" isExternal>
          <GithubLogo />
        </ChakraLink>
      </Box>

      <Flex marginTop={5} paddingLeft={[5, 100, 100]}>
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
      </Flex>

      <Box
        marginTop={['20px', '30px', '30px']}
        paddingBottom={'20px'}
        paddingLeft={[5, 100, 100]}
      >
        <Text
          fontSize={['16px', '24px', '24px']}
          lineHeight={['19.2px', '28.8px', '28.8px']}
          color="grayLetter"
        >
          {t('copyright')}
        </Text>
      </Box>
    </Box>
  );
}

export default FooterLanding;
