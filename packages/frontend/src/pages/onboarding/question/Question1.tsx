import React from 'react';

import { Box, Center, Divider, Text } from '@chakra-ui/react';

type Props = {
  setQuestion: any;
};

function Question1({ setQuestion }: Props) {
  return (
    <Box width={'100%'}>
      <Center>
        <Box
          border={'2px'}
          borderColor={'#E5E4E5'}
          borderRadius={'20px'}
          width={'90%'}
          marginTop={'50px'}
        >
          <Box>
            <Text padding={3} fontWeight={'bold'} fontSize={'22px'}>
              Do you have some experience investing in cryptocurrencies?
            </Text>
          </Box>

          <Box
            height={'50px'}
            fontWeight={'regular'}
            fontSize={'18px'}
            _hover={{
              backgroundColor: 'rgba(228, 62, 132, .5)',
            }}
            onClick={() => setQuestion(2)}
          >
            <Text padding={3}>Yes</Text>
          </Box>

          <Divider />

          <Box
            height={'50px'}
            fontWeight={'regular'}
            fontSize={'18px'}
            _hover={{
              backgroundColor: 'rgba(228, 62, 132, .5)',
            }}
            onClick={() => setQuestion(2)}
          >
            <Text padding={3}>No</Text>
          </Box>

          <Divider />

          <Box
            height={'50px'}
            fontWeight={'regular'}
            fontSize={'18px'}
            _hover={{
              backgroundColor: 'rgba(228, 62, 132, .5)',
              borderBottomRadius: '20px',
            }}
            onClick={() => setQuestion(2)}
          >
            <Text padding={3}>Only holding</Text>
          </Box>
        </Box>
      </Center>
    </Box>
  );
}

export default Question1;
