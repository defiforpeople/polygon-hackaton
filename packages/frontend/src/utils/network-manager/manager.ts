import { IAdapter } from './adapters';
import { networks } from './manager.constants';
import { INetworkManager, Network, ChainName } from './manager.types';

export class NetworkManager implements INetworkManager {
  private adapter: IAdapter;
  private _chainName: ChainName;

  constructor() {
    this.adapter = undefined!;
    this._chainName = undefined!;
  }

  public getAdapter(): IAdapter {
    if (!this.adapter) {
      throw new Error('adapter is not defined');
    }
    return this.adapter;
  }

  public get chainName(): ChainName {
    if (!this._chainName) {
      throw new Error('chainName is not defined');
    }
    return this._chainName;
  }

  public switchAdapter(adapter: IAdapter): void {
    this.adapter = adapter;
  }

  public async switchNetwork(name: ChainName): Promise<void> {
    await this.adapter.switchNetwork(name);
    this._chainName = name;
  }

  public listNetworks(): { [name: string]: Network } {
    return networks;
  }

  // public listTokens(): { [name: string]: { [name: string]: Token } } {
  //   return {};
  // }
}
