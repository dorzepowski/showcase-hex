import { ValueProps } from '../../types.ts';
import { FC } from 'react';
import { BUMPs } from '../../parser/bsv-hex-reader.ts';
import { ListValue } from '../Values/Value.tsx';
import { MerklePath } from '../BUMP/MerklePath.tsx';

export const MerklePaths: FC<ValueProps<BUMPs>> = ({ value }) => {
  return <ListValue label="BUMPs" path={['bumps']} value={value}
                    render={(it, itemPath, i) => <MerklePath key={i} idx={i} value={it} path={itemPath} />}
  />;
};


