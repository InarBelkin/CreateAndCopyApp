import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button, MenuItem, Select, TextField, Typography } from '@mui/material';
import { runInAction } from 'mobx';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
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
      <div className={s.pathContainer}>
        <TextField
          sx={{ m: 2, flexGrow: 1 }}
          label="path"
          value={compareStorage.pathFrom ?? ''}
          onChange={onPathFromChange}
        />
        <Button
          size="large"
          sx={{ m: 2, height: 55 }}
          variant="outlined"
          color="secondary"
          onClick={() => compareStorage.selectPathFrom()}
          startIcon={<FolderOutlinedIcon />}
        />
      </div>

      <Typography variant="h5">Target path:</Typography>
      <div className={s.pathContainer}>
        <TextField
          sx={{
            m: 2,
            flexGrow: 1,
            display: 'flex',
          }}
          label="path"
          value={compareStorage.pathTo ?? ''}
          onChange={onPathToChange}
        />
        <Button
          size="large"
          sx={{ m: 2, height: 55 }}
          variant="outlined"
          color="secondary"
          onClick={() => compareStorage.selectPathTo()}
          startIcon={<FolderOutlinedIcon />}
        />
      </div>
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
      <Button onClick={onStartClick} variant="contained" sx={{ m: 2 }}>
        Start replace
      </Button>
    </div>
  );
});

export default CopyPage;
