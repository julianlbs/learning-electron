const { app, BrowserWindow, ipcMain, dialog, Menu } = require("electron/main");
const path = require("node:path");

async function handleFileOpen() {
	const { canceled, filePaths } = await dialog.showOpenDialog();
	if (!canceled) {
		return filePaths[0];
	}
}

const createWindow = () => {
	const mainWindow = new BrowserWindow({
		title: app.name,
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
		},
	});

	ipcMain.on("set-title", (event, title) => {
		const webContents = event.sender;
		const win = BrowserWindow.fromWebContents(webContents);
		win.setTitle(title);
	});

	const menu = Menu.buildFromTemplate([
		{
			label: app.name,
			submenu: [
				{
					click: () => mainWindow.webContents.send("update-counter", 1),
					label: "Increment",
				},
				{
					click: () => mainWindow.webContents.send("update-counter", -1),
					label: "Decrement",
				},
				{
					click: () => app.quit(),
					label: "Close Application",
					accelerator: "CmdOrCtrl+Q",
				},
			],
		},
	]);

	Menu.setApplicationMenu(menu);

	mainWindow.loadFile("index.html");
	mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
	ipcMain.handle("ping", () => "pong");
	ipcMain.handle("dialog:openFile", handleFileOpen);
	ipcMain.on("counter-value", (_event, value) => {
		console.log(value);
	});
	createWindow();

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});
