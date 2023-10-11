import fs from 'fs/promises';
import path from 'path';
import { LoadError, LoadSuccess, ResultHolder } from '../API/ResultHolder';

export interface StartReplaceRequest {
  pathFrom: string;
  pathTo: string;
  folderNames: string[];
  compareAccuracy: 'names' | 'size' | 'content';
}

export interface startReplaceResult {
  message: string;
}

export class ReplacerApi {
  async replaceFiles(
    request: StartReplaceRequest,
  ): Promise<ResultHolder<string>> {
    try {
      const fromFiles = await fs.readdir(request.pathFrom);
      const toFiles = await fs.readdir(request.pathTo);

      // update files
      for (let i = 0; i < fromFiles.length; i++) {
        const fName = fromFiles[i];
        this.upToDateFile(fName, fromFiles, toFiles, request);
      }

      // delete extra files
      const extraToFiles = toFiles.filter((f) => !fromFiles.includes(f));
      for (let i = 0; i < extraToFiles.length; i++) {
        await fs.unlink(path.join(request.pathTo, extraToFiles[i]));
      }

      return new LoadSuccess('Files are up to date');
    } catch (e) {
      return new LoadError(e as Error);
    }
  }

  private async upToDateFile(
    fileName: string,
    fromFiles: string[],
    toFiles: string[],
    request: StartReplaceRequest,
  ) {
    const fromPath = path.join(request.pathFrom, fileName);
    const toPath = path.join(request.pathTo, fileName);

    let needToCopy = false;
    if (toFiles.includes(fileName)) {
      if (await this.needToReplace(fromPath, toPath, request)) {
        await fs.unlink(toPath);
        needToCopy = true;
      }
    } else {
      needToCopy = true;
    }
    if (needToCopy) {
      await fs.copyFile(fromPath, toPath);
    }
  }

  private async needToReplace(
    fromPath: string,
    toPath: string,
    request: StartReplaceRequest,
  ) {
    if (request.compareAccuracy === 'names') return false;
    const fStats = await fs.stat(fromPath);
    const toStats = await fs.stat(toPath);
    if (fStats.size !== toStats.size) {
      return true;
    }
    return false;
  }
}

export const replacerApi = new ReplacerApi();
