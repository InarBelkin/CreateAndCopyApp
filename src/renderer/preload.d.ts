import {
  ElectronHandler,
  ReplacerApiHandler,
  ReplacerHelperHandler,
} from '../main/preload';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    replacer: ReplacerApiHandler;
    electron: ElectronHandler;
    replacerHelper: ReplacerHelperHandler;
  }
}

export {};
