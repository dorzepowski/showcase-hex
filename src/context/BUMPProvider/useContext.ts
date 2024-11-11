import { useContext } from 'react';
import { Context, ParsedBUMP } from './context.ts';

export const useBUMP = ():ParsedBUMP  => {
  const ctx = useContext(Context);
  if (!ctx) {
    throw new Error(`useBUMP must be used within BUMPProvider`);
  }
  return ctx.value;
};
