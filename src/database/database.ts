// src/database/database.ts
import sqlite3 from "sqlite3";
import { open } from "sqlite";

export const openDb = async () => {
  return open({
    filename: "./src/database/database.db",
    driver: sqlite3.Database,
  });
};
