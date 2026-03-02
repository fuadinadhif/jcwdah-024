import express, {
  type Request,
  type Response,
  type Application,
} from "express";

import pool from "./lib/db.lib.js";

const app: Application = express();
const PORT: number = 8000;

app.use(express.json()); // middleware untuk mengambil body request

app.get("/api/status", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: "API is running!", uptime: process.uptime() });
});

/* --------------------------------- CREATE --------------------------------- */
app.post("/api/events", async (req: Request, res: Response) => {
  try {
    const data = req.body;
    await pool.query(
      `
        INSERT INTO events (name, description, start_date, end_date, available_seats, price)
        VALUES ($1, $2, $3, $4, $5, $6);
      `,
      [
        data.name,
        data.description,
        data.start_date,
        data.end_date,
        data.available_seats,
        data.price,
      ],
    );
    res.status(201).json({ message: "Successfully create new event" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error to create new event" });
  }
});

/* ---------------------------------- READ ---------------------------------- */
// MANY
app.get("/api/events", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT * FROM events WHERE deleted_at IS NULL ORDER BY id;`,
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error to get events data" });
  }
});

// SINGLE
app.get("/api/events/:eventId", async (req: Request, res: Response) => {
  try {
    const eventId = req.params.eventId;
    const result = await pool.query(
      `SELECT * FROM events WHERE id = $1 AND deleted_at IS NULL;`,
      [eventId],
    );

    if (result.rows.length <= 0) {
      return res
        .status(404)
        .json({ message: `Event with id: ${eventId} is not found` });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error to get event data" });
  }
});

/* --------------------------------- UPDATE --------------------------------- */
app.put("/api/events/:eventId", async (req: Request, res: Response) => {
  try {
    const eventId = req.params.eventId;
    const data = req.body;
    const result = await pool.query(
      `
      UPDATE events
      SET
        name = COALESCE($1, name),
        description = COALESCE($2, description),
        start_date = COALESCE($3, start_date),
        end_date = COALESCE($4, end_date),
        available_seats = COALESCE($5, available_seats),
        price = COALESCE($6, price)
      WHERE id = $7
      RETURNING *;
    `,
      [
        data.name,
        data.description,
        data.start_date,
        data.end_date,
        data.available_seats,
        data.price,
        eventId,
      ],
    );

    res.status(200).json({
      message: `Successfully update event with id: ${eventId}`,
      data: result.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Error to update event with id: ${req.params.eventId}`,
    });
  }
});

/* --------------------------------- DELETE --------------------------------- */
/* ---------------------------------- SOFT ---------------------------------- */
app.put(
  "/api/events/:eventId/soft-delete",
  async (req: Request, res: Response) => {
    try {
      const eventId = req.params.eventId;
      await pool.query(
        `
          UPDATE events 
          SET  
            name = COALESCE($1, name),
            description = COALESCE($2, description),
            start_date = COALESCE($3, start_date),
            end_date = COALESCE($4, end_date),
            available_seats = COALESCE($5, available_seats),
            price = COALESCE($6, price),
            deleted_at = $7
          WHERE id = $8
        `,
        [null, null, null, null, null, null, new Date(), eventId],
      );
      res.status(200).json({
        message: `Successfully soft deleted event with id: ${eventId}`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: `Error to soft delete event with id: ${req.params.eventId}`,
      });
    }
  },
);

/* ---------------------------------- HARD ---------------------------------- */
app.delete("/api/events/:eventId", async (req: Request, res: Response) => {
  try {
    const eventId = req.params.eventId;
    await pool.query(`DELETE FROM events WHERE id = $1`, [eventId]);
    res
      .status(200)
      .json({ message: `Successfully delete event with id: ${eventId}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Error to hard delete event with id: ${req.params.eventId}`,
    });
  }
});

app.listen(PORT, () => console.info(`Server is listening on port: ${PORT}`));

/* -------------------------------------------------------------------------- */
/*                                    NOTES                                   */
/* -------------------------------------------------------------------------- */
// await fetch("http://localhost:8000/api/events", {
//   method: "POST",
//   headers: { "content-type": "application/json" },
//   body: JSON.stringify({}),
// });
