import React, { useState, useEffect, useRef } from "react";
import { askAssistant } from "../services/chatBotService";
import { useParams } from "react-router-dom";

const ChatBotPage = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      content: "Hi there! How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("quick");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, typing]);

  const { projectId } = useParams();

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setTyping(true);

    try {
      const response = await askAssistant(input, mode, projectId);
      const botMessage = {
        sender: "bot",
        content: response.reply,
      };

      // Small delay to simulate typing
      setTimeout(() => {
        setMessages((prev) => [...prev, botMessage]);
        setTyping(false);
      }, 600); // Adjust delay as needed
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          content: "Sorry, something went wrong.",
        },
      ]);
      setTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-[#f4f6fa] text-gray-900 font-sans flex h-[calc(100vh-64px)] overflow-hidden rounded-xl border">
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-6">
          <div>
            <h2 className="text-lg font-semibold">Sandy</h2>
            <p className="text-xs text-gray-500">AI Business Assistant</p>
          </div>
          <div className="flex items-center gap-3">
            <label htmlFor="modeSelect" className="text-sm text-gray-600">
              Mode:
            </label>
            <select
              id="modeSelect"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value="quick">Quick Response</option>
              <option value="deep">Deep Think</option>
            </select>
          </div>
        </header>

        {/* Chat Scrollable Area */}
        <main className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-[#f4f6fa]">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-xl px-4 py-2 rounded-lg whitespace-pre-wrap ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white self-end ml-auto"
                  : "bg-gray-200 text-gray-800 self-start mr-auto"
              }`}
            >
              {msg.content}
            </div>
          ))}

          {/* Typing Indicator */}
          {typing && (
            <div className="flex items-center space-x-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg w-fit animate-pulse">
              <span className="dot-flash">Sandy is Thinking</span>
              <span className="animate-bounce delay-100">.</span>
              <span className="animate-bounce delay-200">.</span>
              <span className="animate-bounce delay-300">.</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </main>

        {/* Input Footer */}
        <footer className="p-4 border-t bg-white flex items-center gap-2">
          <textarea
            rows={1}
            placeholder="Send your message to Sandy..."
            className="flex-1 resize-none px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
            onClick={handleSend}
          >
            Send
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ChatBotPage;
