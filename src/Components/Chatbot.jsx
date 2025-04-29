"use client";

import React, { useState, useEffect } from "react";
import { Send, X } from "lucide-react";
import "../Pages/Chatbot.css";
import ChatbotCustomization from "./ChatbotCustomization";

export default function Chatbot() {
  // Initialize state with defaults or from localStorage
  const [customization, setCustomization] = useState(() => {
    const saved = localStorage.getItem("chatbotCustomization");
    return saved
      ? JSON.parse(saved)
      : {
          headerColor: "#3347B5",
          backgroundColor: "#EEEEEE",
          messages: ["How can I help you?", "Ask me anything!"],
          welcomeMessage:
            "👋 Want to chat about Hubly? I'm a chatbot here to help you find your way.",
          formFields: [
            { label: "Your Name", type: "text", placeholder: "Your name" },
            { label: "Your Phone", type: "tel", placeholder: "+1 (000) 000-0000" },
            { label: "Your Email", type: "email", placeholder: "example@gmail.com" },
          ],
          missedChatTimer: [
            { hours: "12", minutes: "09", seconds: "59" },
            { hours: "00", minutes: "10", seconds: "00" },
            { hours: "01", minutes: "11", seconds: "01" },
          ],
        };
  });

  const [message, setMessage] = useState("");

  // Save customization to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("chatbotCustomization", JSON.stringify(customization));
  }, [customization]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log("Message sent:", message);
    setMessage("");
  };

  return (
    <div className="chat-interface">
      <div className="chat-content">
        <div className="chat-left">
          <div className="chat-header" style={{ backgroundColor: customization.headerColor }}>
            <div className="avatar">
              <img src="/images/profile.png" alt="Hubly" />
            </div>
            <div className="chat-title">Hubly</div>
          </div>

          <div className="chat-messages" style={{ backgroundColor: customization.backgroundColor }}>
            {customization.messages.map((msg, index) => (
              <div className="message-group" key={index}>
                <div className="avatar small">
                  <img src="/images/profile.png" alt="Hubly" />
                </div>
                <div className="message-bubble">{msg}</div>
              </div>
            ))}

            <div className="intro-form">
              <div className="form-header">Introduce Yourself</div>
              {customization.formFields.map((field, index) => (
                <div className="form-group" key={index}>
                  <label>{field.label}</label>
                  <input type={field.type} placeholder={field.placeholder} />
                </div>
              ))}
              <button className="submit-button">Thank You!</button>
            </div>
          </div>

          <form className="chat-input" onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder="Write a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit">
              <Send size={18} />
            </button>
          </form>

          <div className="welcome-message">
            <div className="avatar">
              <img src="/placeholder.svg?height=40&width=40" alt="Hubly" />
            </div>
            <div className="welcome-content">
              <X size={16} className="close-icon" />
              <p>{customization.welcomeMessage}</p>
            </div>
          </div>
        </div>

        <div className="chat-right">
          <ChatbotCustomization customization={customization} setCustomization={setCustomization} />
        </div>
      </div>
    </div>
  );
}