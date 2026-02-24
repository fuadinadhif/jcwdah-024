import "dotenv/config";

import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { prisma } from "./lib/prisma.js";
import { verifyToken, roleGuard } from "./middlewares/auth.middleware.js";
import { registerService } from "./services/auth.service.js";
import { AppError } from "./utils/app-error.js";

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 8000;

app.use(express.json());

/* ---------------------------- CHECK API HEALTH ---------------------------- */
app.get("/api/health", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: "API is running!", uptime: process.uptime() });
});

/* ----------------------------- CREATE NEW USER ---------------------------- */
app.post("/api/auth/register", async (req: Request, res: Response) => {
  try {
    const userInput = req.body;
    console.log(req.body);

    const userData = await registerService(userInput);

    res.status(201).json({ message: "User created", data: userData });
  } catch (error) {
    if (error instanceof AppError) {
      res
        .status(error.statusCode || 500)
        .json({ message: error.message || "Unknown error" });
    }
  }
});

/* ---------------------------------- LOGIN --------------------------------- */
app.post("/api/auth/login", async (req: Request, res: Response) => {
  const userInput = req.body;

  const existingUser = await prisma.user.findUnique({
    where: { email: userInput.email },
  });

  if (!existingUser) {
    return res
      .status(404)
      .json({ message: "User not found. Please register first" });
  }

  const isValidPassword = await bcrypt.compare(
    userInput.password,
    existingUser.password,
  );

  if (!isValidPassword) {
    return res.status(400).json({ message: "Wrong password" });
  }

  const payload = {
    email: existingUser.email,
    name: existingUser.name,
    role: existingUser.role,
  };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

  res.status(200).json({ message: "User logged in", accessToken });
});

/* ------------------------------ PUBLIC ROUTE ------------------------------ */
app.get("/api/events", (req: Request, res: Response) => {
  res.status(200).json({ message: "Event list" });
});

/* ----------------------------- PROTECTED ROUTE ---------------------------- */
app.get(
  "/api/users/profile/organizer",
  verifyToken,
  roleGuard("ORGANIZER"),
  (req: Request, res: Response) => {
    res.status(200).json({ message: "Organizer profile" });
  },
);
app.get(
  "/api/users/profile/customer",
  verifyToken,
  roleGuard("CUSTOMER"),
  (req: Request, res: Response) => {
    res.status(200).json({ message: "Customer profile" });
  },
);

app.listen(PORT, () => console.info(`Server is listening on port: ${PORT}`));

/* ---------------------------------- NOTES --------------------------------- */
// http://localhost:8000/api/orders?sort=date
// http -> protocol
// localhost:8000 -> domain
// /api/orders -> parameters/endpoint
// ?sort=date -> query
