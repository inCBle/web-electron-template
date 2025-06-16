export interface ElectronAPI {
  setTitle: (title: string) => void;
  getTitle: () => Promise<string>;
  onMessage: (callback: (...args: any[]) => void) => void;
  sendMessage: (message: string) => void;
  postMessage: (message:any,options?:StructuredSerializeOptions) => void;
  openLoginView: () => void;
  login: (data: LoginRequestParams) => Promise<any>;
}

declare global {
  var electron: ElectronAPI;
}

declare enum APP_ENV {
  WEB,
  ELECTRON,
}

export {};
