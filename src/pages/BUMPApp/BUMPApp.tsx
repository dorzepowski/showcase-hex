import { Outlet } from 'react-router-dom';
import { Grid2, Stack } from '@mui/material';
import { BUMPProvider } from '../../context/BUMPProvider';
import { BUMPForm } from '../../components/BUMPForm/BUMPForm.tsx';

function BUMPApp() {
  return (
    <BUMPProvider>
      <Stack spacing={2}>
        <Grid2>
          <BUMPForm />
        </Grid2>
        <Grid2>
          <Outlet />
        </Grid2>
      </Stack>
    </BUMPProvider>
  );
}

export default BUMPApp;
