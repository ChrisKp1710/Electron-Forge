import { app, BrowserWindow, ipcMain } from "electron";
import { initDb } from "./database/initDatabase"; // percorso corretto per il tuo file initDatabase.ts
import { openDb } from "./database/database";
import chalk from "chalk";
//import path from "path";
//import { format } from "url";

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
      contextIsolation: true, // Attiva l'isolamento del contesto
      nodeIntegration: false, // Disabilita l'integrazione di Node.js
    },
  });

  (global as any).mainWindow = mainWindow;

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  if (!app.isPackaged) {
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
