import { BEEFProvider } from '../../context/BEEFProvider';
import { BEEFForm } from '../../components/BEEFForm/BEEFForm.tsx';
import { Outlet } from 'react-router-dom';
import { Stack } from '@mui/material';

function BEEFApp() {
  return (
    <BEEFProvider>
      <Stack sx={{marginBottom: '2rem'}}><BEEFForm /></Stack>
      <Stack><Outlet /></Stack>
    </BEEFProvider>
  );
}

export default BEEFApp;
