import React from 'react';

import { Box } from '@chakra-ui/react';

import NavbarLanding from '../app/navbar/NavbarLanding';
import FooterLanding from '../landing/Footer/FooterLanding';
import StrategyList from './StrategyList';
import StrategyPresentation from './StrategyPresentation';

function Strategies() {
  return (
    <Box bg={'white'}>
      <NavbarLanding />
      <StrategyPresentation />
      <StrategyList />
      <FooterLanding />
    </Box>
  );
}

export default Strategies;
