import { Outlet } from 'react-router-dom';
import { Grid2, Stack } from '@mui/material';
import { RawTxProvider } from '../../context/RawTxProvider';
import { RawTxForm } from '../../components/RawTxForm/RawTxForm.tsx';

function RawTxApp() {
  return (
    <RawTxProvider>
      <Grid2 size={12}>
        <Stack spacing={2}>
          <Grid2>
            <RawTxForm />
          </Grid2>
          <Grid2>
            <Outlet />
          </Grid2>
        </Stack>
      </Grid2>
    </RawTxProvider>
  );
}

export default RawTxApp;
