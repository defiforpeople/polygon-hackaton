import * as React from 'react';

import ReactDOM from 'react-dom';

import App from './App';

import Fonts from './fonts';
import theme from './theme';

import { ChakraProvider } from '@chakra-ui/react';
import { HashRouter } from 'react-router-dom';
import { ManagerProvider } from './providers/manager-provider';
import { Adapters } from './utils/network-manager';

const { REACT_APP_API_URL } = process.env;
if (!REACT_APP_API_URL) {
  throw new Error('invalid ENV values');
}

const dfpAdapter = new Adapters.DfpAdapter(REACT_APP_API_URL);

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Fonts />
      <ManagerProvider adapter={dfpAdapter}>
        <HashRouter>
          <App />
        </HashRouter>
      </ManagerProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
