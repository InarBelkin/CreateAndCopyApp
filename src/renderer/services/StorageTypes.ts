import PouchDB from 'pouchdb-browser';
import { StartReplaceRequest } from '../../main/ReplacerApi/ReplacerApi';

export type StartReplaceDoc = PouchDB.Core.PutDocument<{
  request: StartReplaceRequest;
}>;
