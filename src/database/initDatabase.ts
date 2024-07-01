import { openDb } from "./database";
import chalk from "chalk";
import figlet from "figlet";
import winston from "winston";
import path from "path";
import { app, BrowserWindow } from "electron";

// winston per scrivere i log su un file e sulla console
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
  mainWindow.webContents
    .executeJavaScript(`console.log(${JSON.stringify(headerText)});`)
    .catch((error) => {
      console.error("Error logging headerText to renderer", error);
    });
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
      "La tabella 'users' esiste già. Utilizziamo la tabella già esistente.";
    logger.warn(message);
    mainWindow.webContents
      .executeJavaScript(`console.log("${message}");`)
      .catch((error) => {
        console.error("Error logging tableCheck message to renderer", error);
      });
  } else {
    const message =
      "La tabella 'users' non esiste. Creazione della tabella 'users'.";
    logger.info(message);
    mainWindow.webContents
      .executeJavaScript(`console.log("${message}");`)
      .catch((error) => {
        console.error("Error logging create table message to renderer", error);
      });
    await db.exec(`CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE
    )`);
    const successMessage = "Tabella 'users' creata con successo.";
    logger.info(successMessage);
    mainWindow.webContents
      .executeJavaScript(`console.log("${successMessage}");`)
      .catch((error) => {
        console.error("Error logging success message to renderer", error);
      });
  }

  const users = await db.all("SELECT * FROM users");
  users.forEach((user) => {
    const userMessage = `User: ${user.name}, Email: ${user.email}`;
    logger.info(userMessage);
    mainWindow.webContents
      .executeJavaScript(`console.log("${userMessage}");`)
      .catch((error) => {
        console.error("Error logging user message to renderer", error);
      });
  });

  const successConnectionMessage =
    "Connessione al database stabilita e tabelle verificate/creati.";
  logger.info(successConnectionMessage);
  mainWindow.webContents
    .executeJavaScript(`console.log("${successConnectionMessage}");`)
    .catch((error) => {
      console.error("Error logging connection message to renderer", error);
    });
};
