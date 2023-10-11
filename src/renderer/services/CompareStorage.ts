import { makeAutoObservable } from 'mobx';
import replacerApiCaller from './ReplacerApiCaller';
import { LoadLoading, ValueHolder } from '../../main/API/ResultHolder';

class CompareStorage {
  pathFrom: string | null = null;

  pathTo: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  result: ValueHolder<string> | undefined;

  async startReplace() {
    if (this.pathFrom && this.pathTo) {
      this.result = new LoadLoading();
      this.result = await replacerApiCaller.replaceFiles({
        pathFrom: this.pathFrom,
        pathTo: this.pathTo,
        folderNames: [],
        compareFilesContent: false,
      });
    }
  }
}

export default new CompareStorage();
