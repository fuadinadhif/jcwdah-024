import type { Request, Response } from "express";

export async function getCustomerById(req: Request, res: Response) {
  res.status(200).json({ message: "Organizer profile" });
}

export async function getOrganizerById(req: Request, res: Response) {
  res.status(200).json({ message: "Customer profile" });
}
