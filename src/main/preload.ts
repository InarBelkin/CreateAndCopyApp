// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { ReplacerApi } from './ReplacerApi/ReplacerApi';
import { ReplacerHelper } from './ReplacerApi/ReplacerHelper';

export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

const replacerApiHandler = {
  invoke(name: keyof ReplacerApi, ...args: unknown[]) {
    return ipcRenderer.invoke(`replacer_${name}`, ...args);
  },
};

contextBridge.exposeInMainWorld('replacer', replacerApiHandler);

const replacerHelperHandler = {
  invoke(name: keyof ReplacerHelper, ...args: unknown[]) {
    return ipcRenderer.invoke(`replacerHelper_${name}`, ...args);
  },
};

contextBridge.exposeInMainWorld('replacerHelper', replacerHelperHandler);

export type ReplacerApiHandler = typeof replacerApiHandler;
export type ElectronHandler = typeof electronHandler;
export type ReplacerHelperHandler = typeof replacerHelperHandler;
