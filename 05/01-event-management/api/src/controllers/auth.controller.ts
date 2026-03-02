import type { NextFunction, Request, Response } from "express";

import { loginService, registerService } from "../services/auth.service.js";

export async function registerController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userInput = req.body;

    const userData = await registerService(userInput);

    res.status(201).json({ message: "User created", data: userData });
  } catch (error) {
    next(error);
  }
}

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userInput = req.body;

    const { accessToken, user } = await loginService(userInput);

    res.status(200).json({ message: "User logged in", accessToken, user });
  } catch (error) {
    next(error);
  }
}
