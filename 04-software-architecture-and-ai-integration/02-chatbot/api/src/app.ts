import "dotenv/config";

import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";

import { openai } from "./lib/openai.js";
import { upload } from "./middlewares/upload.middleware.js";

const app: Application = express();
const PORT: number = 8000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json()); // Memproses JSON file

app.get("/api/status", (req: Request, res: Response) =>
  res
    .status(200)
    .json({ message: "API is running!", uptime: process.uptime() }),
);

app.post("/api/chat", async (req: Request, res: Response) => {
  const { message } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "openrouter/pony-alpha",
      messages: [
        { role: "user", content: message },
        { role: "system", content: "You are lazy chatbot" },
      ],
    });

    res.status(200).json({ message: completion.choices[0]!.message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed" });
  }
});

app.post(
  "/api/upload",
  upload.single("singleDocument"),
  (req: Request, res: Response) => {
    res.status(200).json({ message: "File uploaded" });
  },
);

app.listen(PORT, () => console.info(`Server is listening on port: ${PORT}`));
