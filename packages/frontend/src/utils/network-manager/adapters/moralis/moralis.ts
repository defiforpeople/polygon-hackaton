// import Moralis from 'moralis';
// import { networks, tokens } from '../../manager.constants';
// import {
//   NativeToken,
//   Network,
//   ChainName,
//   Profile,
//   Token,
//   Withdraw,
//   Deposit,
//   TokenSymbol,
// } from '../../manager.types';
// import { AdapterName, IAdapter } from '../adapter.types';
// import {
//   StrategyRecursiveFarming__factory,
//   StrategyRecursiveFarming,
//   IWETH__factory,
//   IWETH,
// } from '../../../../typechain';

// export default class MoralisAdapter implements IAdapter {
//   private _name: AdapterName;
//   private serverUrl: string;
//   private appUrl: string;
//   private _network: Network;
//   private ready: boolean;

//   constructor(serverUrl: string, appId: string) {
//     this._name = 'moralis';
//     this._network = undefined!;
//     this.ready = false;

//     this.serverUrl = serverUrl;
//     this.appUrl = appId;
//   }

//   public async initAdapter(): Promise<void> {
//     try {
//       await Moralis.start({
//         serverUrl: this.serverUrl,
//         appId: this.appUrl,
//       });

//       this.ready = true;
//     } catch (err) {
//       console.log(err);
//       throw err;
//     }
//   }

//   public async switchNetwork(name: ChainName): Promise<void> {
//     try {
//       if (!this.ready) {
//         await this.initAdapter();
//       }

//       await Moralis.enableWeb3();

//       const network = networks[name];
//       await Moralis.switchNetwork(network.chainId);

//       this._network = network;
//     } catch (err) {
//       console.log(err);
//       throw err;
//     }
//   }

//   public get network(): Network {
//     return this._network;
//   }

//   public get name(): AdapterName {
//     return this._name;
//   }

//   public async getNativeToken(): Promise<NativeToken> {
//     try {
//       if (!this.ready) {
//         await this.initAdapter();
//       }

//       const profile = await this.getProfile();
//       const { chainName, nativeToken } = this.network;

//       const res = await Moralis.Web3API.account.getNativeBalance({
//         chain: chainName,
//         address: profile.address,
//       });

//       return {
//         balance: Number(res.balance),
//         ...nativeToken,
//       };
//     } catch (err) {
//       console.log(err);
//       throw err;
//     }
//   }

//   public async getTokens(): Promise<Token[]> {
//     try {
//       if (!this.ready) {
//         await this.initAdapter();
//       }

//       const profile = await this.getProfile();
//       const { chainName } = this.network;

//       const res = await Moralis.Web3API.account.getTokenBalances({
//         chain: chainName,
//         address: profile.address,
//       });

//       const tokens = res.map(
//         ({ balance, symbol }) =>
//           ({
//             balance: Number(balance),
//             symbol,
//           } as Token),
//       );

//       return tokens;
//     } catch (err) {
//       console.log(err);
//       throw err;
//     }
//   }

//   public isAuthenticated(): boolean {
//     try {
//       if (!this.ready) {
//         return false;
//       }

//       const user = Moralis.User.current();
//       return !user ? false : true;
//     } catch (err) {
//       console.log(err);
//       throw err;
//     }
//   }

//   public async login(signMessage: string): Promise<Profile> {
//     try {
//       if (!this.ready) {
//         await this.initAdapter();
//       }

//       if (!this.isAuthenticated()) {
//         const user = await Moralis.authenticate({
//           signingMessage: signMessage,
//         });

//         console.log('logged in user:', user);
//       }

//       const profile: Profile = await this.getProfile();
//       return profile;
//     } catch (err) {
//       console.log(err);
//       throw err;
//     }
//   }

//   public async logout(): Promise<void> {
//     try {
//       if (!this.ready) {
//         await this.initAdapter();
//       }

//       await Moralis.User.logOut();
//     } catch (err) {
//       console.log(err);
//       throw err;
//     }
//   }

//   public async getProfile(): Promise<Profile> {
//     try {
//       if (!this.ready) {
//         await this.initAdapter();
//       }

//       const user = Moralis.User.current();
//       const address = user!.get('ethAddress');

//       const profile = {
//         address,
//         ens: '',
//       } as Profile;

//       try {
//         const { name: ensName } = await Moralis.Web3API.resolve.resolveAddress({
//           address,
//         });
//         profile.ens = ensName;
//       } catch (err) {
//         console.warn('error ens resolveAddress, err=', err);
//       }

//       return profile;
//     } catch (err) {
//       console.log(err);
//       throw err;
//     }
//   }

//   public async getUsers(): Promise<number> {
//     try {
//       if (!this.ready) {
//         await this.initAdapter();
//       }

//       const users: number = await Moralis.Cloud.run('get_nr_users');

//       return users;
//     } catch (err) {
//       console.log('entro en el error');
//       console.log(err);
//       throw err;
//     }
//   }

//   public async getDeposits(): Promise<Deposit[]> {
//     try {
//       if (!this.ready) {
//         await this.initAdapter();
//       }

//       const profile = await this.getProfile();

//       const q = new Moralis.Query('DepositEventssss');
//       q.equalTo('userAddr', profile.address);
//       const results = await q.find();

//       return results.map((res) => {
//         const timestamp = new Date(res.get('block_timestamp')).getTime();

//         return {
//           amount: Number(res.get('amount')),
//           timestamp,
//         };
//       });
//     } catch (err) {
//       console.log('entro en el error');
//       console.log(err);
//       throw err;
//     }
//   }

//   public async getWithdrawals(): Promise<Withdraw[]> {
//     try {
//       if (!this.ready) {
//         await this.initAdapter();
//       }

//       const profile = await this.getProfile();

//       const q = new Moralis.Query('WithdrawEventssss');
//       q.equalTo('userAddr', profile.address);
//       const results = await q.find();

//       return results.map((res) => {
//         const timestamp = new Date(res.get('block_timestamp')).getTime();

//         return {
//           amount: Number(res.get('amount')),
//           timestamp,
//         };
//       });
//     } catch (err) {
//       console.log('entro en el error');
//       console.log(err);
//       throw err;
//     }
//   }

//   public async approveDeposit(
//     amount: number,
//     symbol: TokenSymbol,
//   ): Promise<Deposit> {
//     // validate inputs
//     const { balance } = await this.getNativeToken();
//     if (amount < 0 || amount > balance!) {
//       throw new Error('invalid amount');
//     }

//     // get token address
//     const tokenAddr = tokens[this.network.chainName][symbol].address;

//     // prepare provider
//     const provider = await Moralis.enableWeb3();
//     const ethers = Moralis.web3Library;
//     const signer = provider.getSigner();

//     // prepare weth contract
//     const wrapContract = new ethers.Contract(
//       tokenAddr,
//       IWETH__factory.abi,
//       signer,
//     ) as IWETH;

//     console.log(1111111);
//     console.log(1111111);
//     console.log(1111111);
//     console.log(1111111);
//     console.log(1111111, tokenAddr);

//     // get strategy address
//     const contractAddr = this.network.strategies['recursive_farming'].address;

//     // parse amount to bignumber
//     const parsedAmount = ethers.utils.parseEther(amount.toString());

//     // make approve weth contract to strategy addres
//     const tx = await wrapContract.approve(contractAddr, parsedAmount);

//     console.log(222222);
//     console.log(222222);
//     console.log(222222);
//     console.log(222222);
//     console.log(222222, contractAddr, parsedAmount);

//     return {
//       amount,
//       timestamp: new Date().getTime(),
//       approveTx: tx,
//     };
//   }

//   public async deposit(deposit: Deposit): Promise<Deposit> {
//     // get strategy address
//     const contractAddr = this.network.strategies['recursive_farming'].address;

//     // prepare provider
//     const provider = await Moralis.enableWeb3();
//     const ethers = Moralis.web3Library;
//     const signer = provider.getSigner();

//     // parse amount to bignumber
//     const parsedAmount = ethers.utils.parseEther(deposit.amount.toString());

//     console.log('PARSED AMOUNT');
//     console.log('PARSED AMOUNT');
//     console.log('PARSED AMOUNT');
//     console.log('PARSED AMOUNT');
//     console.log('PARSED AMOUNT', parsedAmount, contractAddr);

//     // prepare strategy contract
//     const strategyContract = new ethers.Contract(
//       contractAddr,
//       StrategyRecursiveFarming__factory.abi,
//       signer,
//     ) as StrategyRecursiveFarming;

//     // make transaction
//     const tx = await strategyContract.deposit(parsedAmount);

//     return {
//       ...deposit,
//       depositTx: tx,
//     };
//   }
// }

export {};
