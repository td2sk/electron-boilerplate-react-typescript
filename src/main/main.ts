const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow = null;

if (process.env.NODE_ENV === "development") {
  require("electron-debug")();
}

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

const installExtensions = async () => {
  const installer = require("electron-devtools-installer");
  const extensions = ["REACT_DEVELOPER_TOOLS"];
  return installer
    .default(
      extensions.map((name) => installer[name]),
      { loadExtensionOptions: { allowFileAccess: true }, forceDownload: false }
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (process.env.NODE_ENV === "development") {
    await installExtensions();
  }
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });
  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:8080/");
  } else {
    mainWindow.loadURL("file://" + __dirname + "/index.html");
  }
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
};

app.whenReady().then(createWindow).catch(console.log);
