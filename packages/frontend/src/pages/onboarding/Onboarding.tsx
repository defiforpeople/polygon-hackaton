import React from 'react';

import { Flex } from '@chakra-ui/react';

import FooterApp from '../app/footers/FootersApp';
import DashboardOnboarding from './DashboardOnborading';
import NavbarLanding from '../app/navbar/NavbarLanding';

function Onboarding() {
  return (
    <Flex bg={'white'} display={'flex'} flexDirection="column" height={'100vh'}>
      <NavbarLanding />
      <DashboardOnboarding />
      <FooterApp />
    </Flex>
  );
}

export default Onboarding;
