import { Grid2, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, FormEvent, ChangeEvent } from 'react';
import { useBEEF } from '../../context/BEEFProvider';

export const BEEFForm = () => {
  const { beef: beefParam } = useParams();

  const [beef, setBeef] = useState(beefParam || '');
  const { valid, error } = useBEEF();
  const navigate = useNavigate();

  const submitBeef = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`./${beef}`);
  };

  return (
    <Grid2 offset={2} size={8}>
      <form noValidate autoComplete="off" onSubmit={submitBeef}>
        <TextField
          fullWidth
          label="BEEF"
          id="beef"
          value={beef}
          error={!valid}
          helperText={error}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setBeef(event.target.value);
          }}
        />
      </form>
    </Grid2>
  );
};
