import { ipcMain } from 'electron';
import { replacerApi, StartReplaceRequest } from './ReplacerApi';

export default () => {
  ipcMain.handle('replaceFiles', (ev, args) =>
    replacerApi.replaceFiles(args as StartReplaceRequest),
  );
};
