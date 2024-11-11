import { FC } from 'react';
import { useBEEF } from '../../context/BEEFProvider';
import { Stack, Typography } from '@mui/material';
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

  return <Stack>
    <Typography variant="h4">BEEF:</Typography>
    <HexExplorer>{valuedBEEF}</HexExplorer>
  </Stack>;
};
