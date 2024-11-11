import { FC } from 'react';
import { ValueProps } from '../../types.ts';
import { NumberValue } from '../Values/Value.tsx';

export const Version: FC<ValueProps> = ({ value }) => {
  return <NumberValue label="Version" path={['version']} value={value} />;
};
