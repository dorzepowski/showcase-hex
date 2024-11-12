import { Grid2 } from '@mui/material';
import { useBEEF } from '../../context/BEEFProvider';
import { Version } from '../BEEF/Version.tsx';
import { MerklePaths } from '../BEEF/MerklePaths.tsx';
import { Transactions } from '../BEEF/Transactions.tsx';

export const BEEFBreakdown = () => {
  const parsedBEEF = useBEEF();

  if (parsedBEEF.empty) {
    return null;
  }

  const { version, BUMPs: bumps, transactions } = parsedBEEF.beef;

  return (
    <Grid2>
      <Version value={version} />
      <MerklePaths value={bumps} />
      <Transactions value={transactions} />
    </Grid2>
  );
};
