"use client";
import ChatInterface from "./components/chat-interface";
import { useState } from "react";

// styling:
const bigDiv = {
  maxWidth: "600px",
  margin: "20px auto",
  height: "80vh",
  display: "flex",
  flexDirection: "column",
} as const;

export default function Home() {
  return (
    <div style={bigDiv}>
      <h1 style={{ textAlign: "center" }}>AI Scheduler Chat</h1>
      <ChatInterface />
    </div>
  );
}
