import { ElectronHandler, ReplacerApiHandler } from '../main/preload';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    replacer: ReplacerApiHandler;
    electron: ElectronHandler;
  }
}

export {};
