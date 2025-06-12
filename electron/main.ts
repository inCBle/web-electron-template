import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import path from 'node:path';


function initEvents() {
	ipcMain.on('set-title', (event, title) => {
		const webContents = event.sender;
		const win = BrowserWindow.fromWebContents(webContents);
		win?.setTitle(title);
	})

	ipcMain.handle('get-title', (event,) => {
		const webContents = event.sender;
		const win = BrowserWindow.fromWebContents(webContents);
		return win?.getTitle()
	})
}

const createWindow = () => {
	const win = new BrowserWindow({
		width: 960,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, './preload.js'),
			nodeIntegration: false, // 设置是否在页面中启用 Node.js 集成模式
			contextIsolation: true, // 设置是否启用上下文隔离模式。
		},
	});

	const menu = Menu.buildFromTemplate([{
		label: '提醒用户',
		click: () => {
			win.webContents.send('sand-message', '测试消息')
		}
	}])

	win.setMenu(menu)


	if (process.env.VITE_DEV_SERVER_URL) {
		win.loadURL(process.env.VITE_DEV_SERVER_URL);
		win.webContents.openDevTools()
	} else {
		win.loadFile(path.join(__dirname, '../dist/index.html'));
		// win.loadFile(path.join(__dirname, '../index.html'));
		// win.loadFile(path.join(__dirname, '../web-dist/index.html'));
	}

	initEvents()

};

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
	if (process.platform === 'darwin') app.quit()
})


