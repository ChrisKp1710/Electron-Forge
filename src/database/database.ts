/* eslint-disable @typescript-eslint/no-explicit-any */
// src/database/database.ts
import { app } from "electron";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import fs from "fs";

const isProd = process.env.NODE_ENV === "production";
const dbPath = isProd
  ? path.join(app.getPath("userData"), "database.db")
  : path.join(__dirname, "../../src/database/database.db");

let dbExistsLogged = false; // Variabile di stato per controllare se il messaggio è stato stampato

export const openDb = async () => {
  let dbExists = false;

  // Verifica se il database esiste
  if (!fs.existsSync(dbPath)) {
    console.error(`Database not found at ${dbPath}. Creating a new one.`);
  } else {
    if (!dbExistsLogged) {
      // Controlla se il messaggio è già stato stampato
      console.log(`Using existing database at ${dbPath}.`);
      dbExistsLogged = true; // Imposta la variabile per evitare ulteriori stampe
    }
    dbExists = true;
  }

  // Invia il messaggio al renderer
  if ((global as any).mainWindow) {
    (global as any).mainWindow.webContents
      .executeJavaScript(
        `console.log(${JSON.stringify(
          dbExists ? `Database found at ${dbPath}` : "Database not found"
        )});`
      )
      .catch((error: any) => {
        console.error("Error logging database path to renderer", error);
      });
  }

  return open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
};
