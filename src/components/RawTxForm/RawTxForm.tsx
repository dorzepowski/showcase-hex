import { Grid2, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useRawTx } from '../../context/RawTxProvider';

export const RawTxForm = () => {
  const { rawTx: rawTxParam } = useParams();

  const [rawTx, setRawTx] = useState(rawTxParam || '');
  const { valid, error } = useRawTx();
  const navigate = useNavigate();


  const submitBeef = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`./${rawTx}`);
  };

  return <Grid2 size={8} offset={2}>
    <form noValidate autoComplete="off" onSubmit={submitBeef}>
      <TextField fullWidth
                 label="Raw Transaction" id="rawTx"
                 value={rawTx}
                 error={!valid}
                 helperText={error}
                 onChange={(event: ChangeEvent<HTMLInputElement>) => {
                   setRawTx(event.target.value);
                 }} />
    </form>
  </Grid2>;
};
