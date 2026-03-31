import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { type Server, type Socket } from "socket.io";
import cors from "cors";

const app: Application = express();

/* ------------------------------- Chat Socket ------------------------------ */
interface Message {
  user: string;
  text: string;
  time: string;
}

export function registerChatSocket(io: Server, socket: Socket) {
  socket.on("sendMessage", (message: Message) => {
    console.info(`New message: ${message}`);
    io.emit("receiveMessage", message);
  });
}

/* ------------------------------- Middlewares ------------------------------ */
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

/* ------------------------------ Chat Endpoint ----------------------------- */
app.get("/api/chat", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: "Welcome to Realtime Chat API with Socket.io" });
});

export default app;
