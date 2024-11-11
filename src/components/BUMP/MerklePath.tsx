import { FC } from 'react';
import { ItemValuePathProps, Value, ValuePathProps } from '../../types.ts';
import { BUMP, BUMPFlags, BUMPLeaf, BUMPLevel } from '../../parser/bsv-hex-reader.ts';
import { HashValue, ListValue, NumberValue, StringValue, ValueContainer } from '../Values/Value.tsx';

export const MerklePath: FC<ItemValuePathProps<BUMP>> = ({ value, path, idx }) => {
  return <ValueContainer label={`BUMPs[${idx}]`} value={value} path={[...path, idx.toString()]}>
    <BlockHeight value={value.value.blockHeight} path={path} />
    <TreeHeight value={value.value.treeHeight} path={path} />
    <Path value={value.value.path} path={path} />
  </ValueContainer>;
};

const BlockHeight: FC<ValuePathProps> = ({ value, path }) => {
  return <NumberValue label="Block Height" value={value} path={[...path, 'blockHeight']} />;
};

const TreeHeight: FC<ValuePathProps> = ({ value, path }) => {
  return <NumberValue label="Tree Height" value={value} path={[...path, 'treeHeight']} />;
};

const Path: FC<ValuePathProps<Value<BUMPLevel>[]>> = ({ value, path }) => {
  const pathOfPath = [...path, 'path'];
  return <ValueContainer label="Path" value={value} path={pathOfPath}>
    {value.value.map((it, i) => <PathLeaves key={i} idx={i} value={it} path={[...pathOfPath, i.toString()]} />)}
  </ValueContainer>;
};

const PathLeaves: FC<ItemValuePathProps<BUMPLevel>> = ({ value, path, idx }) => {
  return <ListValue label={`Level[${idx}] Leaves`} value={value} path={path}
                    render={(it, itemPath, i) => <PathLeaf key={i} idx={i} value={it} path={itemPath} />}
  />;
};

const PathLeaf: FC<ItemValuePathProps<BUMPLeaf>> = ({ value, path, idx }) => {
  return <ValueContainer label={`Leaves[${idx}]`} value={value} path={path}>
    <Offset value={value.value.offset} path={path} />
    <Flags value={value.value.flags} path={path} />
    <Hash value={value.value.hash} path={path} />
  </ValueContainer>;
};

const Offset: FC<ValuePathProps> = ({ value, path }) => {
  return <NumberValue label="Offset" value={value} path={[...path, 'offset']} />;
};

const Flags: FC<ValuePathProps<BUMPFlags>> = ({ value, path }) => {
  const { txid, duplicate } = value.value;

  const stringValue = `txid: ${txid}, duplicate: ${duplicate}`;

  const flagsValue = {
    hex: value.hex,
    value: stringValue
  }

  return <StringValue label="Flags" path={[...path, 'flags']} value={flagsValue} />;
};

const Hash: FC<ValuePathProps<string>> = ({ value, path }) => {
  return <HashValue label="Hash" path={[...path, 'hash']} value={value} />;
};
