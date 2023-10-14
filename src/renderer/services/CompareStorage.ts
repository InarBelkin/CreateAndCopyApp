import { makeAutoObservable } from 'mobx';
import PouchDB from 'pouchdb-browser';
import replacerApiCaller from './ReplacerApiCaller';
import { LoadLoading, ValueHolder } from '../../main/API/ResultHolder';
import {
  CompareAccuracy,
  StartReplaceRequest,
} from '../../main/ReplacerApi/ReplacerApi';
import replacerHelperCaller from './ReplacerHelperCaller';
import { StartReplaceDoc } from './StorageTypes';

class CompareStorage {
  pathFrom: string | null = null;

  pathTo: string | null = null;

  compareAccuracy: CompareAccuracy = 'names';

  private db = new PouchDB('folders');

  constructor() {
    makeAutoObservable(this);
    this.onInit();
  }

  async onInit() {
    try {
      const { request } = await this.db.get<StartReplaceDoc>('somekey');
      this.pathFrom = request.pathFrom;
      this.pathTo = request.pathTo;
      this.compareAccuracy = request.compareAccuracy;
    } catch (e) {}
  }

  result: ValueHolder<string> | undefined;

  async startReplace() {
    if (this.pathFrom && this.pathTo) {
      let request: Partial<StartReplaceDoc> | undefined;
      try {
        request = await this.db.get<StartReplaceDoc>('somekey');
      } catch (e) {
        request = {
          _id: 'somekey',
        };
      }
      request.request = {
        pathFrom: this.pathFrom,
        pathTo: this.pathTo,
        folderNames: [],
        compareAccuracy: this.compareAccuracy,
      };
      await this.db.put(request, { force: true });
      this.result = new LoadLoading();
      this.result = await replacerApiCaller.replaceFiles(request.request);
    }
  }

  async selectPathFrom() {
    const path = await replacerHelperCaller.openFolderDialog({
      defaultPath: this.pathFrom ?? '',
    });
    if (path) {
      this.pathFrom = path;
    }
  }

  async selectPathTo() {
    const path = await replacerHelperCaller.openFolderDialog({
      defaultPath: this.pathTo ?? '',
    });
    if (path) {
      this.pathTo = path;
    }
  }
}

export default new CompareStorage();
