import { Script, Utils } from '@bsv/sdk';
import { Reader } from '@bsv/sdk/primitives/utils';
import { Value } from '../types.ts';

export interface BEEFWriter {
  hex: string;
  version: Value;
  BUMPs: Value<BUMPs>;
  transactions: Value<BEEFTransactions>;
}

export interface HexList<T = unknown> {
  count: Value;
  list: Value<Value<T>[]>;
}

export interface BUMPsWriter extends BUMPs {
  hex: string;
}

export type BUMPs = HexList<BUMP>;

export interface BUMP {
  blockHeight: Value;
  treeHeight: Value;
  path: Value<Value<BUMPLevel>[]>;
}

export type BEEFTransactions = HexList<BEEFTransaction>;

export interface BUMPFlags {
  duplicate: boolean;
  txid: boolean;
}

export type BUMPLevel = HexList<BUMPLeaf>;

export interface BUMPLeaf {
  offset: Value;
  flags: Value<BUMPFlags>;
  hash: Value<string>;
}

export interface BUMPWriter {
  hex: string;
  blockHeight: Value;
  treeHeight: Value;
  path: Value<Value<BUMPLevel>[]>;
}

export interface BEEFTransaction {
  rawTx: Value<RawTx>;
  hasBUMP: Value<boolean>;
  bumpIndex?: Value;
}

export interface RawTx {
  version: Value;
  inputs: Value<RawTxInputs>;
  outputs: Value<RawTxOutputs>;
  nLockTime: Value;
}

export interface RawTxWriter extends RawTx {
  hex: string;
}

export type RawTxInputs = HexList<RawTxInput>;

export interface RawTxInput {
  sourceTxId: Value<string>;
  sourceOutputIndex: Value;
  scriptLength: Value;
  unlockingScript: Value<string>;
  sequenceNumber: Value;
}

export type RawTxOutputs = HexList<RawTxOutput>;

export interface RawTxOutput {
  value: Value;
  scriptLength: Value;
  lockingScript: Value<string>;
}

export class BsvHexReader {
  private bytes: number[];
  private reader: Reader;

  constructor(private hex: string) {
    this.bytes = Utils.toArray(this.hex, 'hex');
    this.reader = new Reader(this.bytes);
  }

  readBEEFTo(writer: BEEFWriter) {
    writer.version = this.int8valueFrom(this.reader.read(4));
    const BUMPS = anyWriter<BUMPsWriter>();
    this.readBUMPsTo(BUMPS);
    writer.BUMPs = {
      hex: BUMPS.hex,
      value: {
        count: BUMPS.count,
        list: BUMPS.list,
      },
    };
    this.readTransactionsTo(writer);

    writer.hex = writer.version.hex + writer.BUMPs.hex + writer.transactions.hex;
  }

  readBUMPTo(writer: BUMPWriter) {
    writer.blockHeight = this.varIntValueFrom(this.reader.readVarInt());

    const treeHeight = this.int8valueFrom(this.reader.read(1));
    const path = rangeTo(treeHeight.value).map(() => this.readBUMPLevel());

    writer.treeHeight = treeHeight;
    writer.path = {
      hex: path.map((p) => p.hex).join(''),
      value: path,
    };

    writer.hex = writer.blockHeight.hex + writer.treeHeight.hex + writer.path.hex;
  }

  readRawTxTo(writer: RawTxWriter) {
    writer.version = this.int32valueFrom(this.reader.read(4));
    writer.inputs = this.readInputs();
    writer.outputs = this.readOutputs();
    writer.nLockTime = this.int32valueFrom(this.reader.read(4));
    writer.hex = writer.version.hex + writer.inputs.hex + writer.outputs.hex + writer.nLockTime.hex;
  }

  private readBUMPsTo(writer: BUMPsWriter) {
    const numberOfBUMPs = this.varIntValueFrom(this.reader.readVarInt());
    const BUMPs = rangeTo(numberOfBUMPs.value)
      .map(() => anyWriter<BUMPWriter>())
      .map((w) => {
        this.readBUMPTo(w);
        return w;
      })
      .map((w) => ({
        hex: w.hex,
        value: w,
      }));

    const bumpListHex = BUMPs.map((b) => b.hex).join('');

    writer.hex = numberOfBUMPs.hex + bumpListHex;
    writer.count = numberOfBUMPs;
    writer.list = {
      hex: bumpListHex,
      value: BUMPs,
    };
  }

  private readTransactionsTo(writer: BEEFWriter) {
    const numberOfTransactions = this.varIntValueFrom(this.reader.readVarInt());
    const transactions = rangeTo(numberOfTransactions.value).map(() => this.readBEEFTransaction());

    const transactionsHex = transactions.map((t) => t.hex).join('');

    writer.transactions = {
      hex: numberOfTransactions.hex + transactionsHex,
      value: {
        count: numberOfTransactions,
        list: {
          hex: transactionsHex,
          value: transactions,
        },
      },
    };
  }

  private readBUMPLevel(): Value<BUMPLevel> {
    const leavesCount = this.varIntValueFrom(this.reader.readVarInt());
    const leaves = rangeTo(leavesCount.value).map(() => this.readBUMPLeaf());

    const leavesHex = leaves.map((l) => l.hex).join('');

    return {
      hex: leavesCount.hex + leavesHex,
      value: {
        count: leavesCount,
        list: {
          hex: leavesHex,
          value: leaves,
        },
      },
    };
  }

  private readBUMPLeaf(): Value<BUMPLeaf> {
    const offset = this.varIntValueFrom(this.reader.readVarInt());
    const flags = this.bumpFlagsValueFrom(this.reader.read(1));
    const txid = this.txidValueFrom(this.reader.read(32));

    return {
      hex: offset.hex + flags.hex + txid.hex,
      value: {
        offset,
        flags,
        hash: txid,
      },
    };
  }

  private txidValueFrom(bytes: number[]): Value<string> {
    const hex = Utils.toHex(bytes);
    const txid = new Reader(bytes).read(32).reverse();

    return {
      hex,
      value: Utils.toHex(txid),
    };
  }

  private readBEEFTransaction(): Value<BEEFTransaction> {
    const rawtxWriter = anyWriter();
    this.readRawTxTo(rawtxWriter);
    const hasBUMP = this.boolValueFrom(this.reader.read(1));

    let hex = rawtxWriter.hex + hasBUMP.hex;

    const tx: BEEFTransaction = {
      rawTx: {
        hex: rawtxWriter.hex,
        value: {
          ...rawtxWriter,
          hex: undefined,
        },
      },
      hasBUMP: hasBUMP,
    };

    if (hasBUMP.value) {
      tx.bumpIndex = this.varIntValueFrom(this.reader.readVarInt());
      hex += tx.bumpIndex.hex;
    }
    return {
      hex,
      value: tx,
    };
  }

  private readInputs(): Value<RawTxInputs> {
    const inputsCount = this.varIntValueFrom(this.reader.readVarInt());
    const inputs = rangeTo(inputsCount.value).map(() => this.readInput());

    const inHex = inputs.map((i) => i.hex).join('');

    return {
      hex: inputsCount.hex + inputs.map((i) => i.hex).join(''),
      value: {
        count: inputsCount,
        list: {
          hex: inHex,
          value: inputs,
        },
      },
    };
  }

  private readInput(): Value<RawTxInput> {
    const sourceTxId = this.txidValueFrom(this.reader.read(32));
    const sourceOutputIndex = this.int32valueFrom(this.reader.read(4));
    const scriptLength = this.varIntValueFrom(this.reader.readVarInt());
    const unlockingScript = this.scriptValueFrom(this.reader.read(scriptLength.value));
    const sequenceNumber = this.int32valueFrom(this.reader.read(4));
    return {
      hex: sourceTxId.hex + sourceOutputIndex.hex + scriptLength.hex + unlockingScript.hex + sequenceNumber.hex,
      value: {
        sourceTxId,
        sourceOutputIndex,
        scriptLength,
        unlockingScript,
        sequenceNumber,
      },
    };
  }

  private readOutputs(): Value<RawTxOutputs> {
    const outputsCount = this.varIntValueFrom(this.reader.readVarInt());
    const outputs = rangeTo(outputsCount.value).map(() => this.readOutput());

    const outHex = outputs.map((o) => o.hex).join('');

    return {
      hex: outputsCount.hex + outHex,
      value: {
        count: outputsCount,
        list: {
          hex: outHex,
          value: outputs,
        },
      },
    };
  }

  private readOutput(): Value<RawTxOutput> {
    const value = this.int64valueFrom(this.reader.read(8));
    const scriptLength = this.varIntValueFrom(this.reader.readVarInt());
    const lockingScript = this.scriptValueFrom(this.reader.read(scriptLength.value));

    const hex = value.hex + scriptLength.hex + lockingScript.hex;

    return {
      hex,
      value: {
        value,
        scriptLength,
        lockingScript,
      },
    };
  }

  private scriptValueFrom(bytes: number[]): Value<string> {
    const value = Script.fromBinary(bytes).toASM();
    const hex = Utils.toHex(bytes);
    return {
      hex,
      value,
    };
  }

  private bumpFlagsValueFrom(bytes: number[]): Value<BUMPFlags> {
    const flags = this.int8valueFrom(bytes);
    const duplicate = !!(flags.value & 1);
    const txid = !!(flags.value & 2);

    return {
      hex: flags.hex,
      value: {
        duplicate,
        txid,
      },
    };
  }

  private boolValueFrom(bytes: number[]): Value<boolean> {
    const value = new Reader(bytes).readUInt8();
    const hex = Utils.toHex(bytes);
    return {
      hex,
      value: value !== 0,
    };
  }

  private int8valueFrom(bytes: number[]): Value {
    const value = new Reader(bytes).readUInt8();
    const hex = Utils.toHex(bytes);
    return {
      hex,
      value,
    };
  }

  private int64valueFrom(bytes: number[]): Value {
    const value = new Reader(bytes).readUInt64LEBn().toNumber();
    const hex = Utils.toHex(bytes);
    return {
      hex,
      value,
    };
  }

  private int32valueFrom(bytes: number[]): Value {
    const value = new Reader(bytes).readUInt32LE();
    const hex = Utils.toHex(bytes);
    return {
      hex,
      value,
    };
  }

  private varIntValueFrom(bytes: number[]): Value {
    const value = new Reader(bytes).readVarIntNum();
    const hex = Utils.toHex(bytes);
    return {
      hex,
      value,
    };
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function anyWriter<T = any>(): T {
  return {} as T;
}

function rangeTo(n: number): number[] {
  return Array.from(Array(n).keys());
}
