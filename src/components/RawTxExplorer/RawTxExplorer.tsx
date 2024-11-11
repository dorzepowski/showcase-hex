import { FC } from 'react';
import { Stack, Typography } from '@mui/material';
import { HexExplorer } from '../HexExplorer/HexExplorer.tsx';
import { useRawTx } from '../../context/RawTxProvider';

export const RawTxExplorer: FC = () => {
  const parsedRawTx = useRawTx();
  if (parsedRawTx.empty) {
    return null;
  }

  const valuedRawTx = {
    hex: parsedRawTx.rawTx.hex,
    value: parsedRawTx.rawTx,
  };

  return <Stack>
    <Typography variant="h4">Raw Transaction:</Typography>
    <HexExplorer>{valuedRawTx}</HexExplorer>
  </Stack>;
};
