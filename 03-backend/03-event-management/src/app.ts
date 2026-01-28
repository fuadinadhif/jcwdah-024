import express, {
  type Request,
  type Response,
  type Application,
} from "express";

import pool from "./lib/db.lib.js";

const app: Application = express();
const PORT: number = 8000;

app.get("/api/status", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: "API is running!", uptime: process.uptime() });
});

app.get("/api/events", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM events`);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error to get events data" });
  }
});

app.listen(PORT, () => console.info(`Server is listening on port: ${PORT}`));
