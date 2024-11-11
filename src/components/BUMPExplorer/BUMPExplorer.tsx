import { FC } from 'react';
import { Stack, Typography } from '@mui/material';
import { HexExplorer } from '../HexExplorer/HexExplorer.tsx';
import { useBUMP } from '../../context/BUMPProvider';

export const BUMPExplorer: FC = () => {
  const parsedBUMP = useBUMP();
  if (parsedBUMP.empty) {
    return null;
  }

  const valuedBUMP = {
    hex: parsedBUMP.bump.hex,
    value: parsedBUMP.bump,
  };

  return (
    <Stack>
      <Typography variant="h4">Merkle Path (BUMP):</Typography>
      <HexExplorer>{valuedBUMP}</HexExplorer>
    </Stack>
  );
};
