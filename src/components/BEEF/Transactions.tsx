import { FC } from 'react';
import { ItemValuePathProps, ValuePathProps, ValueProps } from '../../types.ts';
import { BEEFTransaction, BEEFTransactions } from '../../parser/bsv-hex-reader.ts';
import { BooleanValue, ListValue, NumberValue, ValueContainer } from '../Values/Value.tsx';
import { RawTx } from '../RawTx/RawTx.tsx';


export const Transactions: FC<ValueProps<BEEFTransactions>> = ({ value }) => {
  return <ListValue label={"Transactions"} path={['transactions']} value={value}
                    render={(it, itemPath, i) => <Transaction key={i} idx={i} value={it} path={itemPath} />}
  />
}

const Transaction: FC<ItemValuePathProps<BEEFTransaction>> = ({ value, path, idx }) => {
  return <ValueContainer label={`Transactions[${idx}]`} value={value} path={path} >
    <RawTx value={value.value.rawTx} path={path} />
    <HasBUMP value={value.value.hasBUMP} path={path} />
    {value.value.bumpIndex && <BumpIndex value={value.value.bumpIndex} path={path} />}
  </ValueContainer>
};

const HasBUMP: FC<ValuePathProps<boolean>> = ({ value, path }) => {
  return <BooleanValue label="Has BUMP" path={[...path, 'hasBUMP']} value={value} />;
};

const BumpIndex: FC<ValuePathProps> = ({ value, path }) => {
  return <NumberValue label="Bump Index" path={[...path, 'bumpIndex']} value={value} />;
};
