import React, { useState, useRef, useEffect } from "react";
import "./ZozoAIChat.css";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const ZozoAIChat = () => {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hi! I'm Zozo AI. How can I support you emotionally today? 😊" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent([input]);
      const response = await result.response;
      const text = await response.text();

      setMessages((prev) => [...prev, { sender: "ai", text }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Zozo AI is resting right now due to high load. Please try again in a few seconds 😊" },
      ]);
    }

    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="zozo-chat-container">
      <div className="zozo-chat-header">💬 Talk to Zozo AI</div>

      <div className="zozo-chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`zozo-chat-bubble ${msg.sender === "user" ? "user" : "ai"}`}
          >
            {msg.text}
          </div>
        ))}

        {isTyping && (
          <div className="zozo-chat-bubble ai typing-indicator">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="zozo-chat-input">
        <textarea
          rows="2"
          placeholder="Type your thoughts..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ZozoAIChat;
