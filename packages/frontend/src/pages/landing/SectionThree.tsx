import React from 'react';

import { Box, Center, Flex, Text } from '@chakra-ui/react';

function SectionThree() {
  return (
    <Box bg={'#F1F4F6'}>
      <Center>
        <Flex flexDirection={'column'} alignItems="center">
          <Text
            fontSize={['40px', '55px', '55px']}
            lineHeight={['48px', '66px', '66px']}
            color="#282828"
            marginTop={['40px', '100px', '100px']}
            textAlign="center"
            width={['300px', '100%', '100%']}
          >
            Investments opportunities
          </Text>

          <Box
            width={'387px'}
            height={'546px'}
            bg={'white'}
            borderRadius={'15px'}
            margin={10}
          >
            <Box
              bgGradient="linear(to-r, sixth, primary)"
              height={'10px'}
              borderTopRadius={'15px'}
            ></Box>
            <Text
              fontWeight={'500'}
              fontSize={'34px'}
              lineHeight={'39.4px'}
              color="sixth"
              padding={3}
            >
              Delta Neutral
            </Text>

            <Text
              fontWeight={'400'}
              fontSize={'18px'}
              lineHeight={'26px'}
              color="#7A8AA0"
              padding={3}
            >
              Deposit USDC to yield farm on STARS-USDC pools, while remaining
              pseudo delta-neutral to STARS but covering all impermanent loss on
              your deposit + borrowed amount
            </Text>

            <Text
              fontWeight={'500'}
              fontSize={'18px'}
              lineHeight={'26px'}
              color="#7A8AA0"
              padding={3}
            >
              Current Average APR
            </Text>

            <Text
              fontWeight={'700'}
              fontSize={'30px'}
              lineHeight={'26px'}
              color="#273852"
              padding={3}
            >
              97.16 %
            </Text>
          </Box>
        </Flex>
      </Center>
    </Box>
  );
}

export default SectionThree;
