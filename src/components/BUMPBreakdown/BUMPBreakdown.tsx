import { Stack, Typography } from '@mui/material';
import { useBUMP } from '../../context/BUMPProvider';
import { MerklePath } from '../BUMP/MerklePath.tsx';

export const BUMPBreakdown = () => {
  const parsedBUMP = useBUMP();

  if (parsedBUMP.empty) {
    return null;
  }

  const valuedBUMP = {
    hex: parsedBUMP.bump.hex,
    value: parsedBUMP.bump,
  };

  return (
    <Stack spacing={1}>
      <Typography variant="h4">Break Down:</Typography>
      <MerklePath idx={0} value={valuedBUMP} path={[]} />
    </Stack>
  );
};
