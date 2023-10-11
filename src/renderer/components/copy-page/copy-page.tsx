import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button, TextField, Typography } from '@mui/material';
import s from './copy-page.module.sass';
import compareStorage from '../../services/CompareStorage';
import { runInAction } from 'mobx';

const CopyPage = observer(() => {
  const onPathFromChange = (v: React.ChangeEvent<HTMLInputElement>) => {
    runInAction(() => {
      compareStorage.pathFrom = v.target.value;
    });
  };
  const onPathToChange = (v: React.ChangeEvent<HTMLInputElement>) => {
    runInAction(() => {
      compareStorage.pathTo = v.target.value;
    });
  };

  const onStartClick = () => {
    compareStorage.startReplace();
  };
  return (
    <div className={s.back}>
      <Typography variant="h5">From path:</Typography>
      <TextField
        label="path"
        fullWidth
        value={compareStorage.pathFrom ?? ''}
        onChange={onPathFromChange}
      />
      <Typography variant="h5">Target path:</Typography>
      <TextField
        label="path"
        fullWidth
        value={compareStorage.pathTo ?? ''}
        onChange={onPathToChange}
      />
      {/*{compareStorage?.result === undefined ? <></>}*/}
      <Button
        onClick={onStartClick}
        variant="contained"
        className={s.startButton}
        sx={{ m: 2 }}
      >
        Start replace
      </Button>
    </div>
  );
});

export default CopyPage;
