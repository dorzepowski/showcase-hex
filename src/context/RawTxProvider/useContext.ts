import { useContext } from 'react';
import { Context, ParsedRawTx } from './context.ts';

export const useRawTx = ():ParsedRawTx  => {
  const ctx = useContext(Context);
  if (!ctx) {
    throw new Error(`useRawTx must be used within RawTxProvider`);
  }
  return ctx.value;
};
