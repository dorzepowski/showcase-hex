import { FC } from 'react';
import { Grid2, Stack } from '@mui/material';
import { RawTxExplorer } from '../../components/RawTxExplorer/RawTxExplorer.tsx';
import { RawTxBreakDown } from '../../components/RawTxBreakDown/RawTxBreakDown.tsx';

export const RawTxView: FC = () => {
  return <>
    <Grid2 size={10} offset={1}>
      <Stack spacing={2}>
        <RawTxExplorer />
        <RawTxBreakDown />
      </Stack>
    </Grid2>
  </>;
};
