import { Link } from 'react-router-dom';
import { Flex, Text, Button, useDisclosure } from '@chakra-ui/react';

import Logo from '../../../components/logo';
import { HamburgerIcon } from '@chakra-ui/icons';

import { useTranslation } from 'react-i18next';
import '../../../i18n';
import DrawerNavbar from '../../landing/DrawerNavbar';

function NavbarLanding() {
  const { t } = useTranslation('NavbarLanding');

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      justify={['space-between', 'space-around', 'space-around']}
      bg="white"
      height={['70px', '76px', '76px']}
      align="center"
      alignItems={'center'}
      width={'100%'}
    >
      <HamburgerIcon
        w={6}
        h={6}
        color="grayLetter"
        display={['block', 'none', 'none']}
        marginLeft={3}
        onClick={onOpen}
      />

      <DrawerNavbar isOpen={isOpen} onClose={onClose} />

      <Link to="/">
        <Logo w={160} h={10} color="#3A0CA3" />
      </Link>

      <Link to="/strategies">
        <Text
          fontSize={'18'}
          lineHeight={'21.6px'}
          color="grayLetter"
          display={['none', 'block', 'block']}
          _hover={{
            cursor: 'pointer',
            color: 'primary',
          }}
        >
          {t('strategies')}
        </Text>
      </Link>

      {/* 
      <Text
        fontSize={'18'}
        lineHeight={'21.6px'}
        color="grayLetter"
        display={['none', 'block', 'block']}
        _hover={{
          cursor: 'pointer',
          color: 'primary',
        }}
      >
        {t('gobernance')}
      </Text> */}

      {/* <HStack display={['none', 'inherit', 'inherit']}>
        <Text fontSize={'18'} lineHeight={'21.6px'} color="grayLetter">
          {t('more')}
        </Text>

        <Icon as={KeyboardArrowDownIcon} />
      </HStack> */}

      <Flex flexDirection="row" alignItems="center" justifyContent="center">
        <Link to="/app">
          <Text
            fontWeight={700}
            fontSize={'20'}
            lineHeight={'21.6px'}
            color="primary"
            marginRight={10}
            display={['none', 'block', 'block']}
          >
            {t('enter')}
          </Text>
        </Link>

        <Flex display={'flex'} align="center">
          <Link to="/onboarding">
            <Button
              bg={'primary'}
              borderRadius={'70'}
              width="120px"
              marginRight={2}
              display={['none', 'block', 'block']}
            >
              <Text
                fontSize={['14', '16', '16']}
                lineHeight={['16px', ' 21.6px', '21.6px']}
                color="white"
              >
                {t('button')}
              </Text>
            </Button>
          </Link>

          <Link to="/app">
            <Button
              bg={'white'}
              borderRadius={'70'}
              width="90px"
              marginRight={2}
              boxShadow="0px 2px 3px rgba(0, 0, 0, 0.15)"
              display={['block', 'none', 'none']}
            >
              <Text
                fontWeight={'700'}
                fontSize={'14'}
                lineHeight={['16px', ' 21.6px', '21.6px']}
                color="primary"
              >
                {t('enter')}
              </Text>
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default NavbarLanding;
