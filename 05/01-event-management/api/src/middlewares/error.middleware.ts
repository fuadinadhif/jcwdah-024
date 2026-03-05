import type { Request, Response, NextFunction } from "express";
import { ZodError, z } from "zod";

import { AppError } from "../utils/app-error.js";
import { logger } from "../utils/logger.js";

export function error(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  logger.error(error.message);

  if (error instanceof AppError) {
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || "Unknown error" });
  }

  if (error instanceof ZodError) {
    return res.status(400).json({ error: z.flattenError(error) });
  }

  res.status(500).json({ message: "General error. Good luck!" });
}
