import { FC } from 'react';
import { Grid2, Stack } from '@mui/material';
import { BUMPExplorer } from '../../components/BUMPExplorer/BUMPExplorer.tsx';
import { BUMPBreakDown } from '../../components/BUMPBreakDown/BUMPBreakDown.tsx';

export const BUMPView: FC = () => {
  return (
    <>
      <Grid2 size={10} offset={1}>
        <Stack spacing={2}>
          <BUMPExplorer />
          <BUMPBreakDown />
        </Stack>
      </Grid2>
    </>
  );
};
