import { createContext } from 'react';
import { BUMP } from '../../parser/hex-parser.ts';

export interface ValidBUMP {
  bump: BUMP;
  empty: false;
  valid: true;
  error: undefined;
}

export interface EmptyBUMP {
  empty: true;
  valid: true;
  error: undefined;
}

export interface InvalidBUMP {
  empty: true;
  valid: false;
  error: string;
}

export type ParsedBUMP = ValidBUMP | EmptyBUMP | InvalidBUMP;

interface BUMPContextValue {
  value: ParsedBUMP;
}

export const Context = createContext<BUMPContextValue | undefined>(undefined);
Context.displayName = `BUMPProviderCtx`;
