// src/components/TicketCard.jsx
import "../Pages/Dashboard.css";

const TicketCard = ({ ticket, onOpen }) => {
  return (
    <div className="ticketCard">
      <div className="ticketHeader">
        <span className="statusDot"></span>
        <span className="ticketNumber">Ticket# {ticket.id}</span>
        <span className="postedTime">Posted at {ticket.postedAt}</span>
      </div>
      <p className="ticketMessage">{ticket.message}</p>
      <div className="ticketFooter">
        <div className="userInfo">
          <img
            src={ticket.user.avatar}
            alt={ticket.user.name}
            className="avatar"
          />
          <div>
            <div>{ticket.user.name}</div>
            <div className="email">
              {ticket.user.phone}
              <br />
              {ticket.user.email}
            </div>
          </div>
        </div>
        <div className="ticketTime">
          <strong>{ticket.time}</strong>
          <button onClick={onOpen} className="openTicket">
            Open Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;