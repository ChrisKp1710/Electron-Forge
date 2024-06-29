/* // src/database/database.ts
import { app } from "electron";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import fs from "fs";

const isProd = process.env.NODE_ENV === "production";
const dbPath = isProd
  ? path.join(app.getPath("userData"), "database.db")
  : path.join(__dirname, "../../src/database/database.db");

export const openDb = async () => {
  // Verifica se il database esiste
  if (!fs.existsSync(dbPath)) {
    console.error(`Database not found at ${dbPath}. Creating a new one.`);
  } else {
    console.log(`Using existing database at ${dbPath}.`);
  }

  return open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
};
 */

import { app } from "electron";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import fs from "fs";

const isProd = process.env.NODE_ENV === "production";
const dbPath = isProd
  ? path.join(app.getPath("userData"), "database.db")
  : path.join(__dirname, "../../src/database/database.db");

export const openDb = async () => {
  let dbExists = false;

  // Verifica se il database esiste
  if (!fs.existsSync(dbPath)) {
    console.error(`Database not found at ${dbPath}. Creating a new one.`);
  } else {
    console.log(`Using existing database at ${dbPath}.`);
    dbExists = true;
  }

  // Invia il messaggio al renderer
  if ((global as any).mainWindow) {
    (global as any).mainWindow.webContents.executeJavaScript(
      `console.log(${JSON.stringify(
        dbExists ? `Database found at ${dbPath}` : "Database not found"
      )});`
    );
  }

  return open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
};
