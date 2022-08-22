import React from 'react';

import { Box, Center, Divider, Flex, Text } from '@chakra-ui/react';

type Props = {
  question: number;
  setQuestion: any;
};

function Question2({ setQuestion, question }: Props) {
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
              Do you know the neutral delta strategy? 
            </Text>
          </Box>

          <Box
            height={'50px'}
            _hover={{
              backgroundColor: 'rgba(228, 62, 132, .5)',
            }}
            onClick={() => setQuestion(3)}
          >
            <Text padding={3} fontWeight={'regular'} fontSize={'18px'}>
              Yes
            </Text>
          </Box>

          <Divider />

          <Box
            height={'50px'}
            _hover={{
              backgroundColor: 'rgba(228, 62, 132, .5)',
              borderBottomRadius: '20px',
            }}
            onClick={() => setQuestion(3)}
          >
            <Text padding={3} fontWeight={'regular'} fontSize={'18px'}>
              No
            </Text>
          </Box>
        </Box>
      </Center>

      <Text
        padding={5}
        fontWeight={'regular'}
        fontSize={'18px'}
        color={'grayLetter'}
        onClick={() => setQuestion(question - 1)}
      >
        Anterior
      </Text>
    </Box>
  );
}

export default Question2;
