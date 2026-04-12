import express, {
  type Application,
  type Request,
  type Response,
} from "express";

const app: Application = express();

app.get("/api/status", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: "API is running!", uptime: process.uptime() });
});

const PORT: number = 8000;
app.listen(PORT, () => console.info(`Server is running on port: ${PORT}`));
