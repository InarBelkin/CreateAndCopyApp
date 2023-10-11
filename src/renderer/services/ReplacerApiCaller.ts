import { StartReplaceRequest } from '../../main/ReplacerApi/ReplacerApi';
import { ResultHolder } from '../../main/API/ResultHolder';

export class ReplacerApiCaller {
  async replaceFiles(
    request: StartReplaceRequest,
  ): Promise<ResultHolder<string>> {
    return await window.replacer.invoke('replaceFiles', request);
  }
}

export default new ReplacerApiCaller();
