import React, { useState } from "react";

export default function App() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [],
  );
  const [input, setInput] = useState("");

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    try {
      if (!input.trim()) return;

      const userMessage = { role: "user", content: input };

      setMessages((prev) => [
        ...prev,
        userMessage,
        { role: "assistant", content: "..." },
      ]);

      const response = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: data.message,
        };
        return updated;
      });
    } catch (error) {
      console.error(error);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "⚠ Something went wrong",
        };
        return updated;
      });
    }
  }

  return (
    <main>
      <h2>🤖 Chatbot</h2>

      {/* chat dialogues */}
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.role === "user" ? "You" : "Bot"}</strong>
            <p>{message.content}</p>
          </div>
        ))}
      </div>

      {/* chat input */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </main>
  );
}
