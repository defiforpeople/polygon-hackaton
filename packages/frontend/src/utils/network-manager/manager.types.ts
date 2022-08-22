import { IAdapter } from './adapters';
import { ContractTransaction } from 'ethers';

export type TokenSymbol =
  | 'WETH'
  | 'eth'
  | 'avax'
  | 'wavax'
  | 'bnb'
  | 'ftm'
  | 'matic';

export type Token = {
  balance: string;
  symbol: TokenSymbol;
  decimals: number;
  address?: string;
  isNative: boolean;
};

export type ChainName =
  // | 'eth'
  // | 'goerli'
  // | 'rinkeby'
  'matic' | 'maticmum';
// | 'bsc'
// | 'avalanche'
// | 'avalanche testnet'
// | 'fantom';

export type Network = {
  name: string;
  chainName: ChainName;
  chainId: string;
  dev: boolean;
  nativeToken: Token;
};

export interface INetworkManager {
  get chainName(): ChainName;
  getAdapter(): IAdapter;
  switchAdapter(adapter: IAdapter): void;
  switchNetwork(name: ChainName): Promise<void>;
  listNetworks(): { [name: string]: Network };
  // listTokens(): { [name: string]: { [name: string]: Token } };
}

export type Profile = {
  address: string;
  ens: string;
};

export enum EventType {
  Deposit = 'deposit',
  Withdraw = 'withdraw',
}

export type Deposit = {
  amount: number;
  timestamp: number;
  symbol?: string;
  quotas?: number;
  approveTx?: ContractTransaction;
  depositTx?: ContractTransaction;
};

export type Withdraw = {
  amount: number;
  timestamp: number;
  quotas?: number;
  tx?: ContractTransaction;
};

export type Strategy = {
  id: number;
  name: string;
  network: string;
  contract: string;
  data: unknown;
  type: string;
};

export type Event = {
  id?: number;
  strategyId: number;
  hash: string;
  block: number;
  type: EventType;
  wallet: string;
  createdAt?: number;
  data: unknown;
};

export type SupplyAaveStrategy = Strategy & {
  data: {
    token: {
      symbol: TokenSymbol;
      address: string;
    };
  };
};

export type SupplyUniswapStrategy = Strategy & {
  data: {
    poolId: string;
    poolFee: string;
    token0: {
      symbol: TokenSymbol;
      address: string;
    };
    token1: {
      symbol: TokenSymbol;
      address: string;
    };
  };
};

export type DFPStrategy = SupplyAaveStrategy | SupplyUniswapStrategy;

export type StrategiesByNetworks = {
  [name: string]: DFPStrategy[];
};
