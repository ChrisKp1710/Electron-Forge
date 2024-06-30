import { app, BrowserWindow, ipcMain } from "electron";
import { initDb } from "./database/initDatabase"; // Assicurati di avere il percorso corretto per il tuo file initDatabase.ts
import { openDb } from "./database/database";
import path from "path";
import { format } from "url";
import chalk from "chalk";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

if (require("electron-squirrel-startup")) {
  app.quit();
}

let mainWindow: BrowserWindow | undefined;

const createWindow = async (): Promise<void> => {
  mainWindow = new BrowserWindow({
    height: 900,
    width: 1200,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  (global as any).mainWindow = mainWindow;

  if (app.isPackaged) {
    mainWindow.loadURL(
      format({
        pathname: path.join(__dirname, "../index.html"),
        protocol: "file:",
        slashes: true,
      })
    );
  } else {
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
    mainWindow.webContents.openDevTools();
  }

  try {
    // Initialize the database
    await initDb(mainWindow);
    console.log(chalk.green.bold("🚀 Applicazione avviata con successo!"));
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.handle("fetch-users", async () => {
  const db = await openDb();
  const users = await db.all("SELECT * FROM users");
  return users;
});
