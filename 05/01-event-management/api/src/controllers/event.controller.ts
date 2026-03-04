import type { NextFunction, Request, Response } from "express";

import { createEventService } from "../services/event.service.js";
import { prisma } from "../lib/prisma.js";
import { redis } from "../lib/redis.js";

/* ------------------------------ UPLOAD SINGLE ----------------------------- */
export async function createEventController(req: Request, res: Response) {
  const userInput = req.body;
  const file = req.file as Express.Multer.File;

  const event = await createEventService(req?.user?.id, userInput, file);

  res.status(201).json({ message: "Event created", data: event });
}

/* ------------------------------ UPLOAD ARRAY ------------------------------ */
// export async function createEventController(req: Request, res: Response) {
//   const userInput = req.body;
//   const files = req.files as Express.Multer.File[];
//   const organizerId = req?.user?.id;

//   const result = await createEventService(organizerId, userInput, files);

//   res.status(200).json({ message: "Event created", data: result });
// }

export async function getEventController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const oldEvents = await redis.get("events");

    if (oldEvents) {
      return res
        .status(200)
        .json({ data: JSON.parse(oldEvents), source: "cache" });
    }

    const events = await prisma.event.findMany();
    await redis.set("events", JSON.stringify(events));

    res.status(200).json({ data: events, source: "database" });
  } catch (error) {
    next(error);
  }
}

/* ---------------------------------- NOTES --------------------------------- */
// 1. await redis.get([key]): mengambil cache lama
// 2. await redis.set([key], [value], [expired]): set cache baru
// 3. await redis.del([key]): menghapus cache yang ada
