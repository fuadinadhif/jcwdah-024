import "dotenv/config";

import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import eventRoutes from "./routes/event.route.js";
import orderRoutes from "./routes/order.route.js";

import { notFound } from "./middlewares/not-found.middleware.js";
import { error } from "./middlewares/error.middleware.js";

// import "./crons/order.cron.js";

// import "./workers/order.worker.js";
// import { registerOrderJob } from "./queues/order.scheduler.js";

import { logger } from "./utils/logger.js";

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 8000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/api/health", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: "API is running!", uptime: process.uptime() });
});

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.use(notFound);
app.use(error);

app.listen(PORT, async () => {
  logger.info(`Server is listening on port: ${PORT}`);

  // await registerOrderJob();
});

/* ---------------------------------- NOTES --------------------------------- */
// http://localhost:8000/api/orders?sort=date
// http -> protocol
// localhost:8000 -> domain
// /api/orders -> parameters/endpoint
// ?sort=date -> query
