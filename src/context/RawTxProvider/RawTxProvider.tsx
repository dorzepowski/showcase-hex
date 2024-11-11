import { FC, PropsWithChildren } from 'react';
import { Context, ParsedRawTx } from './context.ts';
import { useParams } from 'react-router-dom';
import { HexParser } from '../../parser/hex-parser.ts';

const parser = new HexParser();
const hexRegex = /^[0-9a-fA-F]+$/;

function validateHex(hex: string) {
  if (!hex.match(hexRegex)) {
    throw new Error('Invalid hex');
  }
}

function parse(rawTx: string): ParsedRawTx {
  let error = undefined;
  try {
    validateHex(rawTx);
    const parsed = parser.parseRawTx(rawTx);
    return {
      rawTx: parsed,
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

export const RawTxProvider: FC<PropsWithChildren> = ({ children }) => {
  const { rawtx } = useParams();
  let value: ParsedRawTx = { empty: true, valid: true, error: undefined };
  if (rawtx) {
    value = parse(rawtx);
  }

  return <Context.Provider value={{ value }}>{children}</Context.Provider>;
};
