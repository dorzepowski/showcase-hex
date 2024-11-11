import { createContext } from 'react';
import { RawTx } from '../../parser/hex-parser.ts';

export interface ValidRawTx {
  rawTx: RawTx;
  empty: false;
  valid: true;
  error: undefined;
}

export interface EmptyRawTx {
  empty: true;
  valid: true;
  error: undefined;
}

export interface InvalidRawTx {
  empty: true;
  valid: false;
  error: string;
}

export type ParsedRawTx = ValidRawTx | EmptyRawTx | InvalidRawTx;


interface RawTxContextValue {
  value: ParsedRawTx;
}

export const Context = createContext<RawTxContextValue | undefined>(undefined);
Context.displayName = `RawTxProviderCtx`;
