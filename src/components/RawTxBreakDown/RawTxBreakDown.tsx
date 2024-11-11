import { Stack, Typography } from '@mui/material';
import { useRawTx } from '../../context/RawTxProvider';
import { RawTx } from '../RawTx/RawTx.tsx';

export const RawTxBreakDown = () => {
  const parsedRawTx = useRawTx();

  if (parsedRawTx.empty) {
    return null;
  }

  const valuedRawTx = {
    hex: parsedRawTx.rawTx.hex,
    value: parsedRawTx.rawTx,
  };

  return <Stack spacing={1}>
    <Typography variant="h4">Break Down:</Typography>
    <RawTx value={valuedRawTx} path={[]} />
  </Stack>;
};
