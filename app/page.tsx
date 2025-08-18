"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";

// styling:
const bigDiv = {
  maxWidth: "600px",
  margin: "20px auto",
  height: "80vh",
  display: "flex",
  flexDirection: "column",
} as const;

const messageBox = {
  flex: 1,
  overflowY: "auto",
  border: "1px solid #ccc",
  padding: "10px",
  borderRadius: "8px",
  background: "#f9f9f9",
  marginBottom: "10px",
} as const;

const messagesTextUser = {
  background: "#e1f5fe",
  padding: "8px 12px",
  borderRadius: "8px",
  marginBottom: "5px",
  maxWidth: "70%",
  alignSelf: "flex-start",
  color: "black",
} as const;

const messagesTextReponse = {
  background: "#fff",
  padding: "8px 12px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  maxWidth: "70%",
  marginLeft: "auto",
  color: "green",
} as const;

const inputBox = {
  flex: "1",
  padding: "10px",
  borderRadius: "50px",
  border: "1px solid #ccc",
  background: "#fff",
  color: "black",
} as const;

const submitButton = {
  padding: "10px 20px",
  borderRadius: "5px",
  background: "#0070f3",
  color: "#fff",
  border: "none",
} as const;

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { user: string; response: string }[]
  >([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) {
      return;
    }

    setMessages((prev) => [
      ...prev,
      { user: input, response: "Processing..." },
    ]);

    setInput("");

    try {
      const res = await fetch("/api/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { user: input, response: JSON.stringify(data, null, 2) },
      ]);
    } catch (error: any) {
      console.log(`Error handling API : ${error}`);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { user: input, response: `Error ${error.message}` },
      ]);
    }
  };
  return (
    <div style={bigDiv}>
      <h1 style={{ textAlign: "center" }}>AI Scheduler Chat</h1>

      {/* Messages Map */}
      <div style={messageBox}>
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: "15px" }}>
            <div style={messagesTextUser}>
              <strong>You: </strong> {msg.user}
            </div>

            <div style={messagesTextReponse}>
              <strong>Response:</strong>
              <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
                {msg.response}
              </pre>
            </div>
          </div>
        ))}
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px" }}>
        <button type="submit" style={submitButton}>
          Send
        </button>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g., Hey, can you put an 'seeing docotor' appointment on Sunday 3rd, 2025 at 3:00pm? "
          style={inputBox}
        />
      </form>
    </div>
  );
}
