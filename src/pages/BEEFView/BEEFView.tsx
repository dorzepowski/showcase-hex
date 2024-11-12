import { FC } from 'react';
import { Divider, Grid2, Stack, Tab, Tabs } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { BEEFBreakdown } from '../../components/BEEFBreakdown/BEEFBreakdown.tsx';
import { BEEFExplorer } from '../../components/BEEFExplorer/BEEFExplorer.tsx';
import { useBEEF } from '../../context/BEEFProvider';

export const BEEFView: FC = () => {
  const [params, setParams] = useSearchParams();
  const view = params.get('view') || 'hex';
  const parsedBEEF = useBEEF();

  if (parsedBEEF.empty) {
    return null;
  }

  const chooseView = (_: unknown, view: string) => {
    const newParams = new URLSearchParams(params);
    params.forEach((value, key) => {
      newParams.set(key, value);
    });
    newParams.set('view', view);
    setParams(newParams);
  };

  return (
    <>
      <Grid2 size={10} offset={1}>
        <Tabs aria-label="viewer tabs" role="navigation" value={view} onChange={chooseView}>
          <Tab label="hex" value="hex" component={'a'} />
          <Tab label="breakdown" value="breakdown" component={'a'} />
        </Tabs>
        <Divider />
        {
          <Stack sx={{ display: view === 'hex' ? 'block' : 'none' }}>
            <BEEFExplorer />
          </Stack>
        }
        {
          <Stack sx={{ display: view === 'breakdown' ? 'block' : 'none' }}>
            <BEEFBreakdown />
          </Stack>
        }
      </Grid2>
    </>
  );
};
