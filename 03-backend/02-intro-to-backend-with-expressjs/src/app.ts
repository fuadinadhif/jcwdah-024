import type { NextFunction, Request, Response } from "express";
import express from "express";
import { PORT } from "./config/env.js";
import { articleRouter } from "./routes/article.router.js";
import type { ApiError } from "./utils/api-error.js";

const app = express();

app.get("/api/status", (request, response) => {
  response.set("Content-Type", "application/json");
  response.status(200).send({
    message: "API is running!",
    uptime: process.uptime(),
  });
});

app.use("/api/articles", articleRouter);

// handle error
app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
  const message = err.message || "Something went wrong!";
  const status = err.status || 500;
  res.status(status).send({ message });
});

// not found error
app.use((req: Request, res: Response) => {
  res.status(404).send({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.info(`Server is listening on port: ${PORT}`);
});
