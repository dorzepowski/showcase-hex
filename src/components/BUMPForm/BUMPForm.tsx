import { Grid2, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useBUMP } from '../../context/BUMPProvider';

export const BUMPForm = () => {
  const { bump: bumpParam } = useParams();

  const [bump, setBUMP] = useState(bumpParam || '');
  const { valid, error } = useBUMP();
  const navigate = useNavigate();

  const submitBeef = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`./${bump}`);
  };

  return (
    <Grid2 offset={2} size={8}>
      <form noValidate autoComplete="off" onSubmit={submitBeef}>
        <TextField
          fullWidth
          label="Merkle Path (BUMP)"
          id="bump"
          value={bump}
          error={!valid}
          helperText={error}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setBUMP(event.target.value);
          }}
        />
      </form>
    </Grid2>
  );
};
