import { ipcMain } from 'electron';
import { replacerApi, StartReplaceRequest } from './ReplacerApi';
import { OpenFileDialogOptions, replacerHelper } from './ReplacerHelper';

export default () => {
  ipcMain.handle('replacer_replaceFiles', (ev, args) =>
    replacerApi.replaceFiles(args as StartReplaceRequest),
  );

  ipcMain.handle('replacerHelper_openFolderDialog', (ev, args) =>
    replacerHelper.openFolderDialog(args as OpenFileDialogOptions),
  );
};
