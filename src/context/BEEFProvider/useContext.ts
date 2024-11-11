import { useContext } from 'react';
import { Context, ParsedBEEF } from './context.ts';

export const useBEEF = ():ParsedBEEF  => {
  const ctx = useContext(Context);
  if (!ctx) {
    throw new Error(`useBEEF must be used within BEEFProvider`);
  }
  return ctx.value;
};
