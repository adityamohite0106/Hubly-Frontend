import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TicketCard from "../Components/TicketCard";
import "../Pages/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);

  // Load tickets from local storage on mount
  useEffect(() => {
    const storedTickets = JSON.parse(localStorage.getItem("tickets") || "[]");
    setTickets(storedTickets);
  }, []);

  const handleOpenTicket = (ticketId) => {
    navigate(`/app/ticket/${ticketId}`);
  };

  return (
    <div className="dashboard">
      <h2>Tickets</h2>
      <div className="ticket-list">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onOpen={() => handleOpenTicket(ticket.id)}
            />
          ))
        ) : (
          <p>No tickets available.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;