import { FC, PropsWithChildren } from 'react';
import { Context, ParsedBUMP } from './context.ts';
import { useParams } from 'react-router-dom';
import { HexParser } from '../../parser/hex-parser.ts';

const parser = new HexParser();
const hexRegex = /^[0-9a-fA-F]+$/;

function validateHex(hex: string) {
  if (!hex.match(hexRegex)) {
    throw new Error('Invalid hex');
  }
}

function parse(bump: string): ParsedBUMP {
  let error = undefined;
  try {
    validateHex(bump);
    const parsed = parser.parseBUMP(bump);
    return {
      bump: parsed,
      empty: false,
      valid: true,
      error: undefined,
    };
  } catch (e) {
    if (e instanceof Error) {
      error = e.message;
    } else {
      error = JSON.stringify(e);
    }
    return {
      empty: true,
      valid: false,
      error,
    };
  }
}

export const BUMPProvider: FC<PropsWithChildren> = ({ children }) => {
  const { bump } = useParams();
  let value: ParsedBUMP = { empty: true, valid: true, error: undefined };
  if (bump) {
    value = parse(bump);
  }

  return <Context.Provider value={{ value }}>{children}</Context.Provider>;
};
