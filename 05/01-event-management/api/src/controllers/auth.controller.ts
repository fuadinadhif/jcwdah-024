import type { Request, Response } from "express";

import { loginService, registerService } from "../services/auth.service.js";
import { AppError } from "../utils/app-error.js";

export async function registerController(req: Request, res: Response) {
  try {
    const userInput = req.body;

    const userData = await registerService(userInput);

    res.status(201).json({ message: "User created", data: userData });
  } catch (error) {
    if (error instanceof AppError) {
      res
        .status(error.statusCode || 500)
        .json({ message: error.message || "Unknown error" });
    }
  }
}

export async function loginController(req: Request, res: Response) {
  try {
    const userInput = req.body;

    const { accessToken, user } = await loginService(userInput);

    res.status(200).json({ message: "User logged in", accessToken, user });
  } catch (error) {
    if (error instanceof AppError) {
      res
        .status(error.statusCode || 500)
        .json({ message: error.message || "Unknown error" });
    }
  }
}
