import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import type { CustomJwtPayload } from "../types/express.js";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthenticated" });
  }

  const accessToken = authHeader.split(" ")[1];

  if (!accessToken) {
    return res.status(401).json({ message: "Unauthenticated" });
  }

  const payload = jwt.verify(
    accessToken,
    process.env.JWT_SECRET!,
  ) as CustomJwtPayload;

  req.user = payload;

  next();
}

export function roleGuard(role: "ORGANIZER" | "CUSTOMER") {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthenticated" });
    }

    console.log(req.user);

    if (req.user.role === role) {
      return next();
    }

    return res.status(403).json({ message: "Forbidden" });
  };
}
