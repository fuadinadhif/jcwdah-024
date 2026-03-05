import path from "node:path";
import fs from "node:fs/promises";

export async function writeLog({
  level,
  message,
  meta,
}: {
  level: "info" | "warn" | "error";
  message: string;
  meta?: { timestamp: string };
}) {
  const log = { level, message, meta: { timestamp: new Date().toISOString() } };
  const combinedLogPath = path.join(process.cwd(), "logger", "combined.log");
  const infoLogPath = path.join(process.cwd(), "logger", "info.log");
  const warnLogPath = path.join(process.cwd(), "logger", "warn.log");
  const errorLogPath = path.join(process.cwd(), "logger", "error.log");

  // All logs
  await fs.appendFile(combinedLogPath, JSON.stringify(log, null, 2));

  // Info logs
  if (level === "info") {
    await fs.appendFile(infoLogPath, JSON.stringify(log, null, 2));
  }

  // Info logs
  if (level === "warn") {
    await fs.appendFile(warnLogPath, JSON.stringify(log, null, 2));
  }

  // Error logs
  if (level === "error") {
    await fs.appendFile(errorLogPath, JSON.stringify(log, null, 2));
  }
}

export const logger = {
  info: (message: string) => writeLog({ level: "info", message }),
  warn: (message: string) => writeLog({ level: "warn", message }),
  error: (message: string) => writeLog({ level: "error", message }),
};
