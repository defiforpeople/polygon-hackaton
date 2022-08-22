import React from 'react';

import { Box, Button, Center, Text } from '@chakra-ui/react';

type Props = {
  setQuestion: any;
};

function IntroductionQuestions({ setQuestion }: Props) {
  return (
    <Box marginTop={['20px', '50px', '50px']}>
      <Center>
        <Box>
          <Text fontWeight={'bold'} fontSize={'22px'} marginTop={'30px'}>
            A short guide
          </Text>
        </Box>
      </Center>

      <Center>
        <Box padding={5}>
          <Text fontWeight={'regular'} fontSize={'18px'} textAlign="center">
            We will make some questions in order to disover your investments profile, 
            meanwhile we will help you understand some Defi and financial
          </Text>
        </Box>
      </Center>

      <Center>
        <Button
          height={'50px'}
          width={'150px'}
          bg={'sixth'}
          boxShadow="0px 2px 3px rgba(0, 0, 0, 0.15)"
          borderRadius={'70px'}
          onClick={() => setQuestion(1)}
        >
          <Text fontSize={'18px'} lineHeight={'21.6px'} color="white">
            Let's begin!
          </Text>
        </Button>
      </Center>

      <Center marginTop={'20px'}>
        <Text fontSize={'14px'} lineHeight={'21.6px'} color="grayLetter">
          🕓&nbsp; 1 min aprox.
        </Text>
      </Center>
    </Box>
  );
}

export default IntroductionQuestions;
