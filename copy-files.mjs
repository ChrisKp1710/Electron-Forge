import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";

// Ottieni il percorso del file corrente
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const srcPath = join(__dirname, "src", "index.html");
const destPath = join(__dirname, "dist", "index.html");

fs.copyFileSync(srcPath, destPath);
console.log(`Copied ${srcPath} to ${destPath}`);
