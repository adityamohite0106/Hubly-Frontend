import React, { useState, useEffect } from "react";
import TeamPopup from "./TeamPopup";
import "../Pages/Team.css";

const Team = () => {
  const [members, setMembers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedMembers = localStorage.getItem("teamMembers");
    if (storedMembers) {
      setMembers(JSON.parse(storedMembers));
    }
  }, []);

  // Save to localStorage whenever members change
  useEffect(() => {
    localStorage.setItem("teamMembers", JSON.stringify(members));
  }, [members]);

  const handleAddMember = (member) => {
    setMembers((prevMembers) => [...prevMembers, member]);
    setShowPopup(false);
  };

  return (
    <div className="container-team">
      <h2>Team</h2>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Designation</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m, index) => (
            <tr key={index}>
              <td>{m.username}</td>
              <td>{m.email}</td>
              <td>{m.designation}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="add-button" onClick={() => setShowPopup(true)}>
        Add Team Members
      </button>

      {showPopup && (
        <TeamPopup onSave={handleAddMember} onCancel={() => setShowPopup(false)} />
      )}
    </div>
  );
};

export default Team;
