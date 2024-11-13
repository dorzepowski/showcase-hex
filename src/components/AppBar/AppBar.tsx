import { AppBar, Toolbar, Typography } from '@mui/material';

export const TopBar = () => {
  return (
    <AppBar sx={{ marginBottom: '1rem' }} position='relative'>
      <Toolbar>
        <Typography variant="h6" component="div">
          Background Evaluation Extended Format (BEEF)
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
