const { dialog } = require('electron');

export interface OpenFileDialogOptions {
  defaultPath: string;
}

export class ReplacerHelper {
  public async openFolderDialog(options: OpenFileDialogOptions) {
    const result = await dialog.showOpenDialog({
      defaultPath: options.defaultPath,
      properties: ['openDirectory'],
    });
    if (result.filePaths.length === 1) {
      return result.filePaths[0];
    }
    return null;
  }
}

export const replacerHelper = new ReplacerHelper();
