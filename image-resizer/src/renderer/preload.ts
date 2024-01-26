/* eslint-disable @typescript-eslint/no-explicit-any */
// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import os from 'os';
import path from 'path';
import { contextBridge, ipcRenderer } from 'electron';
import Toastify from 'toastify-js';

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
});


contextBridge.exposeInMainWorld('os', {
  homedir: () => os.homedir()
});

contextBridge.exposeInMainWorld('path', {
  join: (...args: string[]) => path.join(...args),
});

contextBridge.exposeInMainWorld('toastify', {
  toast: (options: Toastify.Options) => Toastify(options).showToast()
});

contextBridge.exposeInMainWorld('ipcRenderer', {
  send: (channel: string, ...data: any[]) => ipcRenderer.send(channel, ...data),
  on: (channel: string, callback: (...args: any[]) => void) => ipcRenderer.on(channel, (event, ...args) => callback(...args))
});