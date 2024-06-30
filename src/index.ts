/* import { app, BrowserWindow } from "electron";
import { initDb } from "./database/initDatabase"; // Assicurati di avere il percorso corretto per il tuo file initDatabase.ts
import chalk from "chalk";

// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 900,
    width: 1200,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  // Initialize the database
  await initDb();
  createWindow();
  console.log(chalk.green.bold("🚀 Applicazione avviata con successo!"));
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
 */

//! struttura che attualemnte funziona con il progetto

/* import { app, BrowserWindow, ipcMain } from "electron";
import { initDb } from "./database/initDatabase"; 
import path from "path";
import { format } from "url";
import chalk from "chalk";
import { openDb } from "./database/database";

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

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }

  // Initialize the database
  await initDb(mainWindow);

  console.log(chalk.green.bold("🚀 Applicazione avviata con successo!"));
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.handle('fetch-users', async () => {
  const db = await openDb();
  const users = await db.all('SELECT * FROM users');
  return users;
});

 */

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
