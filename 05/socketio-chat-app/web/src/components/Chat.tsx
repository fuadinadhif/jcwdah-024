import { useEffect, useState } from "react";
import { io, type Socket } from "socket.io-client";

interface Message {
  user: string;
  text: string;
  time: string;
}

const socket: Socket = io("http://localhost:8000");

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [user, setUser] = useState("");
  const [text, setText] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));
    socket.on("receiveMessage", (message: Message) =>
      setMessages((prev) => {
        return [...prev, message];
      }),
    );

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("receiveMessage");
    };
  }, []);

  function handleSubmit(event: React.SubmitEvent) {
    event.preventDefault();

    if (!user.trim() || !text.trim()) return;

    const newMessage: Message = {
      user,
      text,
      time: new Date().toLocaleTimeString(),
    };

    socket.emit("sendMessage", newMessage);
    setText("");
  }

  return (
    <div>
      <h2>Chat App</h2>

      <div>Status: {isConnected ? "Online" : "Offline"}</div>

      <input
        type="text"
        placeholder="Your name"
        value={user}
        onChange={(event) => setUser(event.target.value)}
      />

      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <p>
              <strong>{message.user}</strong>: {message.text}
              <small>{message.time}</small>
            </p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your message..."
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
