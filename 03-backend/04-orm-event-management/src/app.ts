import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import { prisma } from "./lib/prisma.js";

const app: Application = express();
const PORT: number = 8000;

app.use(express.json());

/* -------------------------------------------------------------------------- */
/*                               Status Endpoint                              */
/* -------------------------------------------------------------------------- */
app.get("/api/status", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: "API is running!", uptime: process.uptime() });
});

/* -------------------------------------------------------------------------- */
/*                               User Endpoints                               */
/* -------------------------------------------------------------------------- */
/* ---------------------------- 1. Create (POST) ---------------------------- */
app.post("/api/users", async (req: Request, res: Response) => {
  const { name, email, password, role, address } = req.body;
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
      role,
      address,
    },
  });
  res.status(201).json({ message: "User created", user });
});

/* --------------------------- 2.1 Read Many (GET) -------------------------- */
app.get("/api/users", async (req: Request, res: Response) => {
  const result = await prisma.user.findMany();
  res.status(200).json(result);
});

/* -------------------------- 2.2 Read Single (GET) ------------------------- */
app.get("/api/users/:userId", async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  const result = await prisma.user.findUnique({ where: { id: userId } });
  res.status(200).json(result);
});

/* ----------------------------- 3. Update (PUT) ---------------------------- */
app.put("/api/users/:userId", async (req: Request, res: Response) => {
  const { name, email, role, address } = req.body;
  const userId = Number(req.params.userId);

  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      name,
      email,
      role,
      address,
    },
  });

  res.status(200).json({ message: "User updated", user });
});

/* ---------------------- 4.1 Hard Delete Many (DELETE) --------------------- */
app.delete("/api/users", async (req: Request, res: Response) => {
  await prisma.user.deleteMany();
  res.status(200).json({ message: "All user deleted" });
});

/* --------------------- 4.2 Hard Delete Single (DELETE) -------------------- */
app.delete("/api/users/:userId", async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  await prisma.user.delete({ where: { id: userId } });
  res.status(200).json({ message: `User with id: ${userId} deleted` });
});

app.listen(PORT, () => console.info(`Server is listening on port: ${PORT}`));
