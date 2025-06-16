import { contextBridge, ipcRenderer, MessageChannelMain } from "electron";
import { LoginRequestParams } from "typings/login";

let port: MessagePort | null = null;
ipcRenderer.on("port", (e) => {
  // port received, make it globally available.
  port = e.ports[0];

  port.onmessage = (messageEvent) => {
    console.log(messageEvent, "login 收到了消息");
  };

  port.start();
});

contextBridge.exposeInMainWorld("electron", {
  setTitle: (title: string) => {
    ipcRenderer.send("set-title", title);
  },
  getTitle: () => {
    return ipcRenderer.invoke("get-title");
  },
  onMessage: (callback: (...args: any[]) => void) => {
    ipcRenderer.on("send-message", (_, ...args) => callback(...args));
  },
  sendMessage: (message: string) => {
    ipcRenderer.send("send-message", message);
  },
  postMessage: (message: any, options?: StructuredSerializeOptions) => {
    port?.postMessage(message, options);
  },
  login: (data: LoginRequestParams) => {
    return ipcRenderer.invoke("login", data);
  },
});
