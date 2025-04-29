// src/Components/Sidebar.jsx
import React, { useState } from "react";
import "../Pages/Sidebar.css";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faComments,
  faChartSimple,
  faRobot,
  faUsers,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const [showSignOut, setShowSignOut] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [profileTitle, setProfileTitle] = useState("User");
  const navigate = useNavigate();
  const location = useLocation();

  // Get active tab from URL
  const activeTab = location.pathname.split('/')[2] || 'dashboard';

  const tabs = [
    { id: "dashboard", name: "Dashboard", icon: faHouse, path: "dashboard" },
    { id: "contact", name: "Contact Center", icon: faComments, path: "contact" },
    { id: "analytics", name: "Analytics", icon: faChartSimple, path: "analytics" },
    { id: "chatbot", name: "Chatbot", icon: faRobot, path: "chatbot" },
    { id: "team", name: "Team", icon: faUsers, path: "team" },
    { id: "settings", name: "Settings", icon: faCog, path: "settings" },
  ];

  const handleProfileClick = () => {
    setShowSignOut((prev) => !prev);
  };

  const handleSignOut = () => {
    localStorage.clear();
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
      navigate("/signin");
    }, 2000);
  };

  const handleTabClick = (path) => {
    navigate(`/app/${path}`);
  };

  return (
    <div className="Sidebarcontainer">
      <div className="sidebar">
        <div className="logo">
          <img src="/images/logo.png" alt="Logo" onClick={() => navigate('/app')} />
        </div>

        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => handleTabClick(tab.path)}
            className={`sidebar-item ${activeTab === tab.id ? "active" : ""}`}
          >
            <FontAwesomeIcon icon={tab.icon} className="sidebar-icon" />
            {activeTab === tab.id && <div className="menu-name">{tab.name}</div>}
          </div>
        ))}

        <div className="user-profile" onClick={handleProfileClick}>
          <img
            src={profileImage || "/images/boyemoji.png"}
            alt="User"
            className="profile-pic"
          />
        </div>

        {showSignOut && (
          <button className="signout-button" onClick={handleSignOut}>
            <i className="fas fa-sign-out-alt"></i> Sign Out
          </button>
        )}
      </div>

      <div className="content1">
        <Outlet /> {/* This renders the nested routes */}
      </div>
    </div>
  );
};

export default Sidebar;