import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import path from "path";
import fs from "fs";

export const getData = () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const filePath = path.join(__dirname, "../../data/db.json");
  const rawData = fs.readFileSync(filePath).toString();
  return rawData;
};
