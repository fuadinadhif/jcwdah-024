import type { Request, Response } from "express";
import { createEventService } from "../services/event.service.js";

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
