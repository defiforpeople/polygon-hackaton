import React from 'react';

import { Box, Center, Grid, GridItem, Text, Wrap } from '@chakra-ui/react';

import { ReactComponent as EthereumLogo } from '../assets/logos/ethereum-logo.svg';
import { ReactComponent as PolygonLogo } from '../assets/logos/polygon-logo.svg';
import { ReactComponent as BnbChainLogo } from '../assets/logos/bnbchain-logo.svg';
import { ReactComponent as AvalancheLogo } from '../assets/logos/avalanche-logo.svg';
import { ReactComponent as FantomLogo } from '../assets/logos/fantom-logo.svg';

function Portofolio() {
  return (
    <Center>
      <Box
        bg={'white'}
        width={'80%'}
        borderRadius={10}
        marginTop={10}
        padding={5}
      >
        <Text color={'third'} fontSize="lg" fontWeight={'bold'}>
          Portfolio
        </Text>

        <Wrap justify="center" marginTop={5}>
          <Grid
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(3, 1fr)"
            gap={1}
            width={'250px'}
          >
            <GridItem rowSpan={2} colSpan={1} margin="auto">
              <EthereumLogo width={40} height={40} />
            </GridItem>

            <GridItem colSpan={2} justifyContent="start">
              <Text color={'sixth'} fontSize="small">
                Assets on Ethereum
              </Text>
            </GridItem>

            <GridItem colSpan={2} justifyContent="start">
              <Text color={'fifth'} fontWeight={'bold'}>
                $211
              </Text>
            </GridItem>
          </Grid>

          <Grid
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(3, 1fr)"
            gap={1}
            width={'250px'}
          >
            <GridItem rowSpan={2} colSpan={1} margin="auto">
              <PolygonLogo width={40} height={40} />
            </GridItem>

            <GridItem colSpan={2} justifyContent="start">
              <Text color={'sixth'} fontSize="small">
                Assets on Polygon
              </Text>
            </GridItem>

            <GridItem colSpan={2} justifyContent="start">
              <Text color={'fifth'} fontWeight={'bold'}>
                $0
              </Text>
            </GridItem>
          </Grid>

          <Grid
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(3, 1fr)"
            gap={1}
            width={'250px'}
          >
            <GridItem rowSpan={2} colSpan={1} margin="auto">
              <BnbChainLogo width={40} height={40} />
            </GridItem>

            <GridItem colSpan={2} justifyContent="start">
              <Text color={'sixth'} fontSize="small">
                Assets on BNB Chain
              </Text>
            </GridItem>

            <GridItem colSpan={2} justifyContent="start">
              <Text color={'fifth'} fontWeight={'bold'}>
                $98
              </Text>
            </GridItem>
          </Grid>

          <Grid
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(3, 1fr)"
            gap={1}
            width={'250px'}
          >
            <GridItem rowSpan={2} colSpan={1} margin="auto">
              <AvalancheLogo width={40} height={40} />
            </GridItem>

            <GridItem colSpan={2} justifyContent="start">
              <Text color={'sixth'} fontSize="small">
                Assets on Avalance
              </Text>
            </GridItem>

            <GridItem colSpan={2} justifyContent="start">
              <Text color={'fifth'} fontWeight={'bold'}>
                $0
              </Text>
            </GridItem>
          </Grid>

          <Grid
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(3, 1fr)"
            gap={1}
            width={'250px'}
          >
            <GridItem rowSpan={2} colSpan={1} margin="auto">
              <FantomLogo width={40} height={40} />
            </GridItem>

            <GridItem colSpan={2} justifyContent="start">
              <Text color={'sixth'} fontSize="small">
                Assets on Fantom
              </Text>
            </GridItem>

            <GridItem colSpan={2} justifyContent="start">
              <Text color={'fifth'} fontWeight={'bold'}>
                $0
              </Text>
            </GridItem>
          </Grid>
        </Wrap>
      </Box>
    </Center>
  );
}

export default Portofolio;
