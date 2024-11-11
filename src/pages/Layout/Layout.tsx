import { TopBar } from '../../components/AppBar/AppBar.tsx';
import { Box, Grid2, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <TopBar />
      <Grid2 container>
        <Stack sx={{ width: '100vw', height: '100vh' }}>
          <Box sx={{ marginBottom: '6rem' }} />
          <Grid2 size={12}>
            <Outlet />
          </Grid2>
        </Stack>
      </Grid2>
    </>
  );
};
