import { Box, Icon } from '@chakra-ui/react';

import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { useAdapter } from '../../../hooks/use-adapter';

function ConnectedNetwork(props: { networkName: string }) {
  const { isAuthenticated } = useAdapter();

  return (
    <Box width={'100%'}>
      {props.networkName}
      <Icon
        as={RadioButtonCheckedIcon}
        w={2.5}
        h={2.5}
        color={isAuthenticated ? 'green' : 'red'}
        marginLeft={2}
      />
    </Box>
  );
}

export default ConnectedNetwork;
