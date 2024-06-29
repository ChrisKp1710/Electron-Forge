/* // src/database/initDatabase.ts
import { openDb } from "./database";
import chalk from "chalk";
import figlet from "figlet";
import winston from "winston";
import path from "path";
import { app } from "electron";

// Configura winston per scrivere i log su un file e sulla console
const logPath = app.getPath("userData"); // Usa il path appropriato per i log in produzione
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(
      ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`
    )
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: path.join(logPath, "app.log") }),
  ],
});

const printHeader = () => {
  logger.info(
    chalk.cyan(
      figlet.textSync("TestApp+DB", {
        horizontalLayout: "full",
        verticalLayout: "default",
      })
    )
  );
};

export const initDb = async () => {
  printHeader();
  const db = await openDb();

  // Verifica se la tabella 'users' esiste già
  const tableCheck = await db.get(
    `SELECT name FROM sqlite_master WHERE type='table' AND name='users';`
  );
  if (tableCheck) {
    logger.warn(
      "⚠️  La tabella 'users' esiste già. Utilizziamo la tabella già esistente."
    );
  } else {
    logger.info(
      "✔ La tabella 'users' non esiste. Creazione della tabella 'users'."
    );
    await db.exec(`CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE
    )`);
    logger.info("✔ Tabella 'users' creata con successo.");
  }

  logger.info(
    "\nConnessione al database stabilita e tabelle verificate/creati.\n"
  );
}; */

/* import { openDb } from "./database";
import chalk from "chalk";
import figlet from "figlet";

const printHeader = () => {
  console.log(
    chalk.cyan(
      figlet.textSync("TestApp+DB", {
        horizontalLayout: "full",
        verticalLayout: "default",
      })
    )
  );
};

export const initDb = async () => {
  printHeader();
  const db = await openDb();

  // Verifica se la tabella 'users' esiste già
  const tableCheck = await db.get(
    `SELECT name FROM sqlite_master WHERE type='table' AND name='users';`
  );
  if (tableCheck) {
    console.log(
      chalk.yellow(
        "⚠️  La tabella 'users' esiste già. Utilizziamo la tabella già esistente."
      )
    );
  } else {
    console.log(
      chalk.green(
        "✔ La tabella 'users' non esiste. Creazione della tabella 'users'."
      )
    );
    await db.exec(`CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE
    )`);
    console.log(chalk.green("✔ Tabella 'users' creata con successo."));
  }

  console.log(
    chalk.blue(
      "\nConnessione al database stabilita e tabelle verificate/creati.\n"
    )
  );
}; */

import { openDb } from "./database";
import chalk from "chalk";
import figlet from "figlet";
import winston from "winston";
import path from "path";
import { app, BrowserWindow } from "electron";

// Configura winston per scrivere i log su un file e sulla console
const logPath = app.getPath("userData"); // Usa il path appropriato per i log in produzione
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(
      ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`
    )
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: path.join(logPath, "app.log") }),
  ],
});

const printHeader = (mainWindow: BrowserWindow) => {
  const headerText = figlet.textSync("TestApp+DB", {
    horizontalLayout: "full",
    verticalLayout: "default",
  });
  logger.info(chalk.cyan(headerText));
  mainWindow.webContents.executeJavaScript(
    `console.log(${JSON.stringify(headerText)});`
  );
};

export const initDb = async (mainWindow: BrowserWindow) => {
  printHeader(mainWindow);
  const db = await openDb();

  // Verifica se la tabella 'users' esiste già
  const tableCheck = await db.get(
    `SELECT name FROM sqlite_master WHERE type='table' AND name='users';`
  );
  if (tableCheck) {
    const message =
      "⚠️  La tabella 'users' esiste già. Utilizziamo la tabella già esistente.";
    logger.warn(message);
    mainWindow.webContents.executeJavaScript(`console.log("${message}");`);
  } else {
    const message =
      "✔ La tabella 'users' non esiste. Creazione della tabella 'users'.";
    logger.info(message);
    mainWindow.webContents.executeJavaScript(`console.log("${message}");`);
    await db.exec(`CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE
    )`);
    const successMessage = "✔ Tabella 'users' creata con successo.";
    logger.info(successMessage);
    mainWindow.webContents.executeJavaScript(
      `console.log("${successMessage}");`
    );
  }

  const successConnectionMessage =
    "\nConnessione al database stabilita e tabelle verificate/creati.\n";
  logger.info(successConnectionMessage);
  mainWindow.webContents.executeJavaScript(
    `console.log("${successConnectionMessage}");`
  );
};
