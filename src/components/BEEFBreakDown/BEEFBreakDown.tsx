import { Grid2, Stack, Typography } from '@mui/material';
import { useBEEF } from '../../context/BEEFProvider';
import { Version } from '../BEEF/Version.tsx';
import { MerklePaths } from '../BEEF/MerklePaths.tsx';
import { Transactions } from '../BEEF/Transactions.tsx';

export const BEEFBreakDown = () => {
  const parsedBEEF = useBEEF();

  if (parsedBEEF.empty) {
    return null;
  }

  const { version, BUMPs: bumps, transactions } = parsedBEEF.beef;

  return (
    <Stack spacing={1}>
      <Typography variant="h4">Break Down:</Typography>
      <Grid2>
        <Version value={version} />
        <MerklePaths value={bumps} />
        <Transactions value={transactions} />
      </Grid2>
    </Stack>
  );
};
