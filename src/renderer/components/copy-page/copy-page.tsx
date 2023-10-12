import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button, MenuItem, Select, TextField, Typography } from '@mui/material';
import { runInAction } from 'mobx';
import s from './copy-page.module.sass';
import compareStorage from '../../services/CompareStorage';
import { CompareAccuracy } from '../../../main/ReplacerApi/ReplacerApi';
import Loader from '../loading/Loader';

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
        sx={{ m: 2 }}
        label="path"
        fullWidth
        value={compareStorage.pathFrom ?? ''}
        onChange={onPathFromChange}
      />
      <Typography variant="h5">Target path:</Typography>
      <TextField
        sx={{ m: 2 }}
        label="path"
        fullWidth
        value={compareStorage.pathTo ?? ''}
        onChange={onPathToChange}
      />
      <Select
        value={compareStorage.compareAccuracy}
        sx={{ m: 2 }}
        onChange={(e) => {
          compareStorage.compareAccuracy = e.target.value as CompareAccuracy;
        }}
      >
        <MenuItem value={'names' as CompareAccuracy}>names</MenuItem>
        <MenuItem value={'size' as CompareAccuracy}>size</MenuItem>
        <MenuItem value={'content' as CompareAccuracy}>content</MenuItem>
      </Select>
      {compareStorage?.result && (
        <Loader
          state={compareStorage.result}
          view={(v) => <Typography>{v}</Typography>}
        />
      )}
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
