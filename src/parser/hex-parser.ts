import { anyWriter, BEEFWriter, BsvHexReader, BUMPWriter, RawTxWriter } from './bsv-hex-reader.ts';

export type BEEF = BEEFWriter;
export type BUMP = BUMPWriter;
export type RawTx = RawTxWriter;

export class HexParser {
  public parseBEEF(hex: string): BEEF {
    const beef = anyWriter<BEEF>();
    new BsvHexReader(hex).readBEEFTo(beef);
    return beef;
  }

  public parseBUMP(hex: string): BUMP {
    const bump = anyWriter<BUMPWriter>();
    new BsvHexReader(hex).readBUMPTo(bump);
    return bump;
  }

  public parseRawTx(hex: string): RawTx {
    const rawTx = anyWriter<RawTxWriter>();
    new BsvHexReader(hex).readRawTxTo(rawTx);
    return rawTx;
  }
}
