import { useContext } from 'react';
import {
  ManagerContext,
  ManagerContextType,
} from '../providers/manager-provider';

export function useNetworkManager(): ManagerContextType {
  const ctx = useContext(ManagerContext);
  if (ctx === undefined) {
    throw new Error('useNetworkManager must be used within a ManagerProvider');
  }

  return ctx;
}
