// copy-db.mjs
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { copyFileSync, mkdirSync, existsSync } from "fs";

// Risolvi il percorso corrente del modulo
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const srcPath = resolve(__dirname, "src/database/database.db");
const destPath = resolve(__dirname, "dist/database.db");

if (!existsSync(dirname(destPath))) {
  mkdirSync(dirname(destPath), { recursive: true });
}

try {
  copyFileSync(srcPath, destPath);
  console.log(`Database copiato con successo da ${srcPath} a ${destPath}`);
} catch (err) {
  console.error("Errore durante la copia del database:", err);
}
