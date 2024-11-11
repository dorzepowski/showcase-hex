import { FC } from 'react';
import { BEEFBreakDown } from '../../components/BEEFBreakDown/BEEFBreakDown.tsx';
import { Grid2, Stack } from '@mui/material';
import { BEEFExplorer } from '../../components/BEEFExplorer/BEEFExplorer.tsx';

export const BEEFView: FC = () => {
  return <>
    <Grid2 size={10} offset={1}>
      <Stack spacing={2}>
        <BEEFExplorer />
        <BEEFBreakDown />
      </Stack>
    </Grid2>
  </>;
};
