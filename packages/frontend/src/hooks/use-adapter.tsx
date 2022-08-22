import { useContext } from 'react';
import {
  AdapterContext,
  AdapterContextType,
} from '../providers/adapter-provider';

export function useAdapter(): AdapterContextType {
  const ctx = useContext(AdapterContext);
  if (ctx === undefined) {
    throw new Error('useAdapter must be used within a AdapterProvider');
  }

  return ctx;
}
