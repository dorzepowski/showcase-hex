import { createContext } from 'react';
import { BEEF } from '../../parser/hex-parser.ts';

export interface ValidBEEF {
  beef: BEEF;
  empty: false;
  valid: true;
  error: undefined;
}

export interface EmptyBEEF {
  empty: true;
  valid: true;
  error: undefined;
}

export interface InvalidBEEF {
  empty: true;
  valid: false;
  error: string;
}

export type ParsedBEEF = ValidBEEF | EmptyBEEF | InvalidBEEF;


interface BEEFContextValue {
  value: ParsedBEEF;
}

export const Context = createContext<BEEFContextValue | undefined>(undefined);
Context.displayName = `BEEFProviderCtx`;
