import { openDb } from "./database";
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
};
