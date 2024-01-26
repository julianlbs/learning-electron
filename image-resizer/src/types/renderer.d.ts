/* eslint-disable @typescript-eslint/no-explicit-any */
import type Toastify from 'toastify-js';

export interface IOs {
  homedir: () => string,
}
export interface IPath {
  join: (...args: string[]) => string,
}
export interface IToastify {
  toast: (options: Toastify.Options) => void,
}

export interface IIPCRenderer {
  send: (channel: string, ...data: any[]) => void,
  on: (channel: string, callback: (...args: any[]) => void) => void;
}

export interface IVersions {
  node: () => string,
  chrome: () => string,
  electron: () => string;
}

declare global {
  interface Window {
    os: IOs;
    path: IPath;
    ipcRenderer: IIPCRenderer;
    toastify: IToastify;
    versions: IVersions;
  }
}