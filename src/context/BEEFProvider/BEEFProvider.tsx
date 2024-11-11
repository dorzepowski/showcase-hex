import { FC, PropsWithChildren } from 'react';
import { Context, ParsedBEEF } from './context.ts';
import { useParams } from 'react-router-dom';
import { HexParser } from '../../parser/hex-parser.ts';

const parser = new HexParser();
const hexRegex = /^[0-9a-fA-F]+$/;
const beefMagicHex = /^\d\d00(beef|BEEF)/;

function validateHex(hex: string) {
  if (!hex.match(hexRegex)) {
    throw new Error('Invalid hex');
  }
}

function validateIsBEEF(beef: string) {
  if (!beef.match(beefMagicHex)) {
    throw new Error('Invalid BEEF magic bytes');
  }
}

function parse(beef: string): ParsedBEEF {
  let error = undefined;
  try {
    validateHex(beef);
    validateIsBEEF(beef);
    const parsed = parser.parseBEEF(beef);
    return {
      beef: parsed,
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

export const BEEFProvider: FC<PropsWithChildren> = ({ children }) => {
  const { beef } = useParams();
  let value: ParsedBEEF = { empty: true, valid: true, error: undefined };
  if (beef) {
    value = parse(beef);
  }

  return <Context.Provider value={{ value }}>{children}</Context.Provider>;
};
