"use client";

import React, { useState, useEffect } from "react";
import "../Pages/Contact.css";

const Contact = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");

  // Load tickets from localStorage
  const loadTickets = () => {
    const storedTickets = JSON.parse(localStorage.getItem("tickets") || "[]");
    setTickets(storedTickets);
    if (storedTickets.length > 0 && !selectedTicket) {
      setSelectedTicket(storedTickets[0]); // Select first ticket if none selected
    }
  };

  useEffect(() => {
    loadTickets();
    // Listen for storage changes
    const handleStorageChange = () => loadTickets();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleSelectTicket = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyMessage.trim() || !selectedTicket) return;

    const newMessage = {
      sender: "agent",
      text: replyMessage,
    };

    // Update ticket in localStorage
    const updatedTickets = tickets.map((ticket) =>
      ticket.id === selectedTicket.id
        ? { ...ticket, conversation: [...(ticket.conversation || []), newMessage] }
        : ticket
    );
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
    setTickets(updatedTickets);
    setSelectedTicket((prev) => ({
      ...prev,
      conversation: [...(prev.conversation || []), newMessage],
    }));
    setReplyMessage("");
  };

  return (
    <div className="contact-center">
      <aside className="sidebar2">
        <h2>Contact Center</h2>
        <div className="chats">
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <div
                key={ticket.id}
                className={`chat ${selectedTicket?.id === ticket.id ? "active" : ""}`}
                onClick={() => handleSelectTicket(ticket)}
              >
                <span className="avatar" style={{ backgroundImage: `url(${ticket.user.avatar})` }}></span>
                <div>
                  <p className="chat-title">{ticket.title}</p>
                  <p className="chat-message">{ticket.message}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No chats available</p>
          )}
        </div>
      </aside>

      <main className="chat-main">
        <header className="chat-header">Ticket# {selectedTicket?.id || "N/A"}</header>
        <section className="chat-body">
          {selectedTicket && selectedTicket.conversation ? (
            selectedTicket.conversation.map((msg, index) => (
              <div
                key={index}
                className={`chat-msg ${msg.sender === "user" ? "user" : msg.sender === "agent" ? "agent" : "bot"}`}
              >
                <p className="user-name">
                  {msg.sender === "user" ? selectedTicket.user.name : msg.sender === "agent" ? "Agent" : "Hubly"}
                </p>
                <p className="user-msg">{msg.text}</p>
                <p className="chat-date">{selectedTicket.date}</p>
              </div>
            ))
          ) : (
            <p>No conversation available</p>
          )}
        </section>
        <footer className="chat-footer">
          <form onSubmit={handleSendReply}>
            <input
              type="text"
              placeholder="Type here"
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              disabled={!selectedTicket}
            />
            <button type="submit" disabled={!selectedTicket}>
              ➤
            </button>
          </form>
        </footer>
      </main>

      <aside className="chat-details">
        <div className="details-header">
          <span
            className="avatar-large"
            style={{ backgroundImage: `url(${selectedTicket?.user.avatar || "/placeholder.svg"})` }}
          ></span>
          <p>{selectedTicket?.user.name || "Unknown"}</p>
        </div>
        <div className="details-body">
          <h4>Details</h4>
          <input type="text" value={selectedTicket?.user.name || ""} readOnly />
          <input type="text" value={selectedTicket?.user.phone || ""} readOnly />
          <input type="email" value={selectedTicket?.user.email || ""} readOnly />
          <h4>Teammates</h4>
          <select>
            <option>{selectedTicket?.user.name || "Joe Doe"}</option>
          </select>
          <select>
            <option>Ticket status</option>
            <option>Open</option>
            <option>Closed</option>
          </select>
        </div>
      </aside>
    </div>
  );
};

export default Contact;