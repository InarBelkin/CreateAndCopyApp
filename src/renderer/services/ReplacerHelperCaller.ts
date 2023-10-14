import { OpenFileDialogOptions } from '../../main/ReplacerApi/ReplacerHelper';

export class ReplacerHelperCaller {
  public async openFolderDialog(
    options: OpenFileDialogOptions,
  ): Promise<string | null> {
    return await window.replacerHelper.invoke('openFolderDialog', options);
  }
}

export default new ReplacerHelperCaller();
