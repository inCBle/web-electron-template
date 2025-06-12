declare global {
  var electron: ElectronAPI;
}

declare interface ElectronAPI {
  setTitle: (title: string) => void;
  getTitle: () => Promise<string>;
  onMessage: (callback: (...args: any[]) => void) => void;
}

export {};
