import React from 'react';

import { Box, Center, Text } from '@chakra-ui/react';

import NavbarLanding from '../app/navbar/NavbarLanding';
import FooterApp from '../app/footers/FootersApp';

function Building() {
  return (
    <Box bg={'white'}>
      <NavbarLanding />

      <Center>
        <Text fontSize={'50'} color="primary" marginTop={100}>
          Coming soon
        </Text>
      </Center>

      <Center>
        <Text
          fontSize={'70'}
          // lineHeight={'21.6px'}
          // color="primary"
          marginTop={50}
        >
          👷🏗
        </Text>
      </Center>

      <FooterApp />
    </Box>
  );
}

export default Building;
