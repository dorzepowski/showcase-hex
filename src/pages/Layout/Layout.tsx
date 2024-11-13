import { TopBar } from '../../components/AppBar/AppBar.tsx';
import { Grid2, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <Grid2 container>
      <Stack sx={{ width: '100vw', height: '100dvh' }}>
        <TopBar />
        <Grid2 size={12}>
          <Outlet />
        </Grid2>
      </Stack>
    </Grid2>
  );
};
