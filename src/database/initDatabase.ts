// src/database/initDatabase.ts
import { openDb } from "./database";

export const initDb = async () => {
  const db = await openDb();

  // Verifica se la tabella 'users' esiste già
  const tableCheck = await db.get(
    `SELECT name FROM sqlite_master WHERE type='table' AND name='users';`
  );
  if (tableCheck) {
    console.log("Table 'users' already exists. Using the existing table.");
  } else {
    console.log("Table 'users' does not exist. Creating table 'users'.");
    await db.exec(`CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE
    )`);
  }
};

initDb()
  .then(() => {
    console.log("Database connection established and tables verified/created.");
  })
  .catch((error) => {
    console.error("Error initializing database:", error);
  });
