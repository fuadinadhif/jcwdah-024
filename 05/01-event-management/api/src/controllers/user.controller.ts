import type { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prisma.js";
import { redis } from "../lib/redis.js";

export async function getCustomerById(req: Request, res: Response) {
  res.status(200).json({ message: "Organizer profile" });
}

export async function getOrganizerById(req: Request, res: Response) {
  res.status(200).json({ message: "Customer profile" });
}

export async function getCurrentUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = req?.user?.id;

    const userCache = await redis.get(`user:${id}`);

    if (userCache) {
      return res.status(200).json({ data: userCache });
    }

    const user = await prisma.user.findUnique({ where: { id } });

    await redis.set(`user:${id}`, JSON.stringify(user), "EX", 60);

    res.status(200).json({ data: user });
  } catch (error) {
    next(error);
  }
}
