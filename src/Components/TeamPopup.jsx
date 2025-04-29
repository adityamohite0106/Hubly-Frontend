import React, { useState } from "react";

const TeamPopup = ({ onSave, onCancel }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("Member");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ username, email, designation });
    setUsername("");
    setEmail("");
    setDesignation("Member");
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Add Team Members</h3>
        <p>
          Talk with colleagues in a group chat. Messages in this group are only visible to its participants.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="User name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <select
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          >
            <option value="Member">Member</option>
            <option value="Admin">Admin</option>
          </select>
          <div className="modal-actions">
            <button type="button" className="cancel-button" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="save-button2">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeamPopup;
