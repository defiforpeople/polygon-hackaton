import React from 'react';

import { Box, Center, Divider, Text } from '@chakra-ui/react';

type Props = {
  question: number;
  setQuestion: any;
};

function Question3({ setQuestion, question }: Props) {
  return (
    <Box width={'100%'}>
      <Center>
        <Box
          border={'2px'}
          borderColor={'#E5E4E5'}
          borderRadius={'20px'}
          marginTop={'50px'}
        >
          <Box>
            <Text padding={3} fontWeight={'bold'} fontSize={'22px'}>
              Do you want to invest monthly?
            </Text>
          </Box>

          <Box height={'50px'} fontWeight={'regular'} fontSize={'18px'}>
            <Text padding={3}>Yes</Text>
          </Box>

          <Divider />

          <Box height={'50px'} fontWeight={'regular'} fontSize={'18px'}>
            <Text padding={3}>No</Text>
          </Box>

          <Divider />

          <Box height={'50px'} fontWeight={'regular'} fontSize={'18px'}>
            <Text padding={3}>I don't know yet</Text>
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

export default Question3;
