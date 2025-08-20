import { useState } from "react";

export default function useMessage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { user: string; response: string }[]
  >([]);

  const addSuccessMessage = (data: any) => {
    setMessages((prev) => [
      ...prev.slice(0, -1),
      { user: input, response: JSON.stringify(data, null, 2) },
    ]);
  };

  const addErrorMessage = (error: Error) => {
    setMessages((prev) => [
      ...prev.slice(0, -1),
      { user: input, response: `Error: ${error.message}` },
    ]);
  };

  const sendMessage = () => {
    setMessages((prev) => [
      ...prev,
      { user: input, response: "Processing..." },
    ]);
    setInput("");
  };

  return {
    input,
    setInput,
    messages,
    sendMessage,
    addSuccessMessage,
    addErrorMessage,
  };
}
