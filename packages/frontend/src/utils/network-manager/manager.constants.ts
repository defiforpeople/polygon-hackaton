import { Network, Token } from './manager.types';

export const networks: { [name: string]: Network } = {
  matic: {
    name: 'Polygon',
    chainName: 'matic',
    chainId: '0x89',
    dev: false,
    nativeToken: {
      balance: '0',
      symbol: 'matic',
      decimals: 18,
      isNative: true,
    },
  },
  maticmum: {
    name: 'Mumbai',
    chainName: 'maticmum',
    chainId: '0x13881',
    dev: false,
    nativeToken: {
      balance: '0',
      symbol: 'matic',
      decimals: 18,
      isNative: true,
    },
  },
};

export const tokens: { [name: string]: { [name: string]: Token } } = {
  maticmum: {
    matic: {
      symbol: 'matic',
      decimals: 18,
      address: '0xb685400156cF3CBE8725958DeAA61436727A30c3',
      isNative: true,
      balance: '0',
    },
    eth: {
      symbol: 'eth',
      decimals: 18,
      address: '0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa',
      isNative: false,
      balance: '0',
    },
  },
  // avalanche: {
  //   wavax: {
  //     symbol: 'wavax',
  //     decimals: 18,
  //     address: REACT_APP_AVAX_WAVAX_ADDRESS!,
  //   },
  // },
  // 'avalanche testnet': {
  //   wavax: {
  //     symbol: 'wavax',
  //     decimals: 18,
  //     address: REACT_APP_AVAX_TESTNET_WAVAX_ADDRESS!,
  //   },
  // },
  // rinkeby: {
  //   weth: {
  //     symbol: 'weth',
  //     decimals: 18,
  //     address: REACT_APP_RINKEBY_WETH_ADDRESS!,
  //   },
  // },
};

// export const ToNetwork = {
//   matic: 'polygon',
//   matimum: 'mumbai',
// };

export const defaultNetwork = networks['matic'];
