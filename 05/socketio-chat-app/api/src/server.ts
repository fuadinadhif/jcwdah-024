import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import { registerChatSocket } from "./app.js";

const PORT: number = 8000;
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:5173" } });

io.on("connection", (socket) => {
  console.info(`User connected: ${socket.id}`);
  registerChatSocket(io, socket);

  socket.on("disconnect", () => {
    console.info(`User disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => console.info(`Server is listening on port: ${PORT}`));
