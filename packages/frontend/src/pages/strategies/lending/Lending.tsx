import { Box } from '@chakra-ui/react';

import NavbarLanding from '../../app/navbar/NavbarLanding';
import FooterLanding from '../../landing/Footer/FooterLanding';

function Lending() {
  return (
    <Box bg={'white'}>
      <NavbarLanding />
      Prestamos
      <FooterLanding />
    </Box>
  );
}

export default Lending;
