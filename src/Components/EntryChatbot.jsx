import React, { useState, useEffect } from "react";
import "../Pages/EntryChatbot.css";

const EntryChatbot = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hey! Please introduce yourself." },
  ]);
  const [userMessage, setUserMessage] = useState("");
  const [ticketId, setTicketId] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // Chatbot open/close state
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); // New state to track form submission

  const maleAvatarIds = [
    1, 2, 5, 7, 8, 10, 11, 12, 14, 15, 17, 18, 20, 21, 24, 26, 27, 30, 32, 34,
    36, 38, 39, 41, 42, 44, 46, 48, 49, 50, 53, 55, 57, 58, 60, 62, 64, 66, 68,
    70,
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTicketId = `2025-${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(5, "0")}`;
    const ticket = {
      id: newTicketId,
      title: `Chat from ${formData.name || "Anonymous"}`,
      message: "New user introduction",
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      user: {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        avatar: `https://i.pravatar.cc/40?img=${
          maleAvatarIds[Math.floor(Math.random() * maleAvatarIds.length)]
        }`,
      },
      conversation: [
        ...messages,
        {
          sender: "user",
          text: `Submitted: ${formData.name}, ${formData.phone}, ${formData.email}`,
        },
        {
          sender: "bot",
          text: "Thank you for contacting us! Your ticket has been created.",
        },
      ],
    };

    const existingTickets = JSON.parse(localStorage.getItem("tickets") || "[]");
    localStorage.setItem(
      "tickets",
      JSON.stringify([...existingTickets, ticket])
    );

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: `Submitted: ${formData.name}, ${formData.phone}, ${formData.email}`,
      },
      {
        sender: "bot",
        text: "Thank you for contacting us! Your ticket has been created.",
      },
    ]);

    setTicketId(newTicketId);
    alert("Thank you for contacting us!");

    setFormData({ name: "", phone: "", email: "" });
    setIsFormSubmitted(true); // Set the form as submitted
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!userMessage.trim()) return;

    const newUserMessage = { sender: "user", text: userMessage };
    setMessages((prev) => [...prev, newUserMessage]);

    setTimeout(() => {
      const botResponse = {
        sender: "bot",
        text: "Got your message! How can I assist you further?",
      };
      setMessages((prev) => [...prev, botResponse]);

      if (ticketId) {
        const existingTickets = JSON.parse(
          localStorage.getItem("tickets") || "[]"
        );
        const updatedTickets = existingTickets.map((ticket) =>
          ticket.id === ticketId
            ? {
                ...ticket,
                conversation: [
                  ...ticket.conversation,
                  newUserMessage,
                  botResponse,
                ],
              }
            : ticket
        );
        localStorage.setItem("tickets", JSON.stringify(updatedTickets));
      }
    }, 500);

    setUserMessage("");
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Floating toggle button */}
      <button className="chatbot-toggle" onClick={toggleChatbot}>
    <img src="/images/Action-button.png" alt="" />
      </button>

      {/* Show chatbot if open */}
      {isOpen && (
        <div className="EntryChatbot-container">
          <div className="EntryChatbot-header">
            <img
              src="/images/profile.png"
              alt="Hubly"
            />
            <h2>Hubly</h2>
          </div>

          <div className="EntryChatbot-body">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.sender === "bot" ? "bot-message" : "user-message"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {!isFormSubmitted ? ( // Show the form only if it's not submitted
              <form className="EntryChatbot-form" onSubmit={handleSubmit}>
                <h3>Introduce Yourself</h3>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="+1 (000) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <button type="submit">Submit</button>
              </form>
            ) : (
              <div className="chat-interface1">
                {/* Show chat input after form is submitted */}
                <div className="EntryChatbot-footer">
  <form onSubmit={handleSendMessage} className="message-form">
    <input
      type="text"
      placeholder="Write a message"
      value={userMessage}
      onChange={(e) => setUserMessage(e.target.value)}
    />
    <button type="submit" className="send-button">
        <i className="fa-solid fa-paper-plane"></i>
    </button>
  </form>
</div>

              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EntryChatbot;
