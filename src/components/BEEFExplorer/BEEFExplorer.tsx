import { FC } from 'react';
import { useBEEF } from '../../context/BEEFProvider';
import { HexExplorer } from '../HexExplorer/HexExplorer.tsx';

export const BEEFExplorer: FC = () => {
  const parsedBEEF = useBEEF();
  if (parsedBEEF.empty) {
    return null;
  }

  const valuedBEEF = {
    hex: parsedBEEF.beef.hex,
    value: parsedBEEF.beef,
  };

  return <HexExplorer>{valuedBEEF}</HexExplorer>;
};
