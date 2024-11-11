import { FC } from 'react';
import { ItemValuePathProps, ValuePathProps } from '../../types.ts';
import { RawTx as RawTxType, RawTxInput, RawTxInputs, RawTxOutput, RawTxOutputs } from '../../parser/bsv-hex-reader.ts';
import { HashValue, ListValue, NumberValue, ScriptValue, ValueContainer } from '../Values/Value.tsx';

export const Version: FC<ValuePathProps> = ({ value, path }) => {
  return <NumberValue label="Version" path={[...path, 'version']} value={value} />;
};

export const Inputs: FC<ValuePathProps<RawTxInputs>> = ({ value, path }) => {
  return (
    <ListValue
      label="Inputs"
      path={[...path, 'inputs']}
      value={value}
      render={(it, itemPath, i) => <Input key={i} idx={i} value={it} path={itemPath} />}
    />
  );
};

export const Input: FC<ItemValuePathProps<RawTxInput>> = ({ value, path, idx }) => {
  return (
    <ValueContainer label={`Inputs[${idx}]`} value={value} path={path}>
      <SourceTxId value={value.value.sourceTxId} path={path} />
      <SourceOutputIndex value={value.value.sourceOutputIndex} path={path} />
      <ScriptLength value={value.value.scriptLength} path={path} />
      <UnlockingScript value={value.value.unlockingScript} path={path} />
      <SequenceNumber value={value.value.sequenceNumber} path={path} />
    </ValueContainer>
  );
};

export const SourceTxId: FC<ValuePathProps<string>> = ({ value, path }) => {
  return <HashValue label="Source Tx ID" path={[...path, 'sourceTxId']} value={value} />;
};

export const SourceOutputIndex: FC<ValuePathProps> = ({ value, path }) => {
  return <NumberValue label="Source Vout" path={[...path, 'sourceOutputIndex']} value={value} />;
};

export const ScriptLength: FC<ValuePathProps> = ({ value, path }) => {
  return <NumberValue label="Script length" path={[...path, 'scriptLength']} value={value} />;
};

export const UnlockingScript: FC<ValuePathProps<string>> = ({ value, path }) => {
  return <ScriptValue label="Unlocking script" path={[...path, 'unlockingScript']} value={value} />;
};

export const SequenceNumber: FC<ValuePathProps> = ({ value, path }) => {
  return <NumberValue label="Sequence number" path={[...path, 'sequenceNumber']} value={value} />;
};

export const Outputs: FC<ValuePathProps<RawTxOutputs>> = ({ value, path }) => {
  return (
    <ListValue
      label="Outputs"
      path={[...path, 'outputs']}
      value={value}
      render={(it, itemPath, i) => <Output key={i} idx={i} value={it} path={itemPath} />}
    />
  );
};

export const Output: FC<ItemValuePathProps<RawTxOutput>> = ({ value, path, idx }) => {
  return (
    <ValueContainer label={`Outputs[${idx}]`} value={value} path={path}>
      <OutputValue value={value.value.value} path={path} />
      <ScriptLength value={value.value.scriptLength} path={path} />
      <LockingScript value={value.value.lockingScript} path={path} />
    </ValueContainer>
  );
};

export const OutputValue: FC<ValuePathProps> = ({ value, path }) => {
  return <NumberValue label="Value" path={[...path, 'value']} value={value} />;
};

export const LockingScript: FC<ValuePathProps<string>> = ({ value, path }) => {
  return <ScriptValue label="Locking script" path={[...path, 'lockingScript']} value={value} />;
};

export const NLockTime: FC<ValuePathProps> = ({ value, path }) => {
  return <NumberValue label="NLockTime" path={[...path, 'nLockTime']} value={value} />;
};

export const RawTx: FC<ValuePathProps<RawTxType>> = ({ value, path }) => {
  const rawTxPath = [...path, 'rawTx'];

  return (
    <ValueContainer value={value} label="Raw Transaction" path={rawTxPath}>
      <Version value={value.value.version} path={rawTxPath} />
      <Inputs value={value.value.inputs} path={rawTxPath} />
      <Outputs value={value.value.outputs} path={rawTxPath} />
      <NLockTime value={value.value.nLockTime} path={rawTxPath} />
    </ValueContainer>
  );
};
