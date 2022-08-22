import { createContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
  INetworkManager,
  Network,
} from '../utils/network-manager/manager.types';
import { IAdapter } from '../utils/network-manager/adapters';
import { NetworkManager } from '../utils/network-manager/manager';
import { AdapterProvider } from './adapter-provider';
import { defaultNetwork } from '../utils/network-manager';

type ManagerProviderProps = {
  children: ReactNode;
  adapter: IAdapter;
};

export type ManagerContextType = {
  manager: INetworkManager;
  network: Network;
  setNetwork: (n: Network) => void;
};

export const ManagerContext = createContext<ManagerContextType | undefined>(
  undefined,
);

export function ManagerProvider({ children, adapter }: ManagerProviderProps) {
  if (!adapter) {
    throw new Error('adapter is not defined');
  }

  const [network, setNetwork] = useState(defaultNetwork);

  // adapter.switchNetwork(defaultNetwork.chainName);

  const value: ManagerContextType = useMemo(() => {
    const manager = new NetworkManager();
    manager.switchAdapter(adapter);

    return {
      manager,
      network,
      setNetwork,
    };
  }, [adapter, network]);

  return (
    <ManagerContext.Provider value={value}>
      <AdapterProvider manager={value.manager}>{children}</AdapterProvider>
    </ManagerContext.Provider>
  );
}
