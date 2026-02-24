import type { Request, Response } from "express";

export async function getAllEvents(req: Request, res: Response) {
  res.status(200).json({ message: "Event list" });
}
