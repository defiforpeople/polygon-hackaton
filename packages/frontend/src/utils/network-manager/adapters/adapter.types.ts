import {
  Network,
  ChainName,
  Profile,
  Token,
  Deposit,
  Withdraw,
  TokenSymbol,
  DFPStrategy,
  StrategiesByNetworks,
} from '../manager.types';
import { Balances } from './dfp/dfp';

export type AdapterName = 'moralis' | 'web3' | 'ethers.js' | 'dfp' | 'none';

export interface IAdapter {
  get network(): Network;
  get name(): AdapterName;
  isAuthenticated(): boolean;
  login(signMessage: string): Promise<Profile>;
  logout(): Promise<void>;
  getProfile(): Promise<Profile>;
  getNativeToken(): Promise<Token>;
  getTokens(): Promise<Token[]>;
  switchNetwork(name: ChainName): Promise<void>;
  getUsers(): Promise<number>;
  getDeposits(): Promise<Deposit[]>;
  getWithdrawals(): Promise<Withdraw[]>;
  approveDeposit(amount: number, symbol: TokenSymbol): Promise<Deposit>;
  // TODO change any
  approveDepositAave(amount: number, symbol: TokenSymbol): Promise<any>;
  depositAave(amount: number, symbol: TokenSymbol): Promise<any>;
  withdrawAave(amount: number): Promise<any>;
  getBalanceAave(): Promise<number>;

  approveDepositUniswap(amount: number, symbol: TokenSymbol): Promise<any>;
  mintNewPosition(amount1: number, amount2: number): Promise<any>;

  deposit(deposit: Deposit): Promise<Deposit>;
  listStrategies(): Promise<DFPStrategy[]>;
  listStrategiesByNetworks(): Promise<StrategiesByNetworks>;
  getStrategiesBalances(wallet: string): Promise<Balances>;
}
