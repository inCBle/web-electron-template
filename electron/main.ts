import {
  app,
  BrowserWindow,
  dialog,
  ipcMain,
  Menu,
  MessageChannelMain,
  MessagePortMain,
  Notification,
} from "electron";
import path from "node:path";
import { login } from "./api/login";

function initEvents(port2: MessagePortMain) {
  ipcMain.on("set-title", (event, title) => {
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);
    win?.setTitle(title);
  });

  ipcMain.on("send-message", (_, message) => {
    console.log(message);
  });

  ipcMain.handle("get-title", (event) => {
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);
    return win?.getTitle();
  });

  ipcMain.handle("open-login-view", () => {
    createLoginWindow(port2);
  });

  ipcMain.handle("login", (event, data) => {
    return login(data);
  });

  ipcMain.handle("open-system-dialog", (_, options) => {
    if (Notification.isSupported()) {
      new Notification(options).show();
    }
  });
}

const createWindow = (port: MessagePortMain) => {
  const win = new BrowserWindow({
    width: 960,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "./preload.js"),
      nodeIntegration: false, // 设置是否在页面中启用 Node.js 集成模式
      contextIsolation: true, // 设置是否启用上下文隔离模式。
    },
  });

  const menu = Menu.buildFromTemplate([
    {
      label: "提醒用户",
      click: () => {
        win.webContents.send("send-message", "测试消息");
      },
    },
  ]);

  win.setMenu(menu);

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
    // win.loadFile(path.join(__dirname, '../index.html'));
    // win.loadFile(path.join(__dirname, '../web-dist/index.html'));
  }

  win.once("ready-to-show", () => {
    win.webContents.postMessage("port", null, [port]);
  });
};

const createLoginWindow = (port: MessagePortMain) => {
  const loginWin = new BrowserWindow({
    title: "登录",
    webPreferences: {
      preload: path.join(__dirname, "./loginPreload.js"),
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    loginWin.loadURL(path.join(process.env.VITE_DEV_SERVER_URL, "/login"));
    loginWin.webContents.openDevTools();
  } else {
    loginWin.loadFile(path.join(__dirname, "../dist/index.html"));
  }

  loginWin.once("ready-to-show", () => {
    loginWin.webContents.postMessage("port", null, [port]);
  });
};

app.whenReady().then(() => {
  const { port1, port2 } = new MessageChannelMain();

  initEvents(port2);
  createWindow(port1);
});

app.on("window-all-closed", () => {
  if (process.platform === "darwin") app.quit();
});
