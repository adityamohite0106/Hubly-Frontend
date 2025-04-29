import React, { useState } from "react";
import "../Pages/SettingsPage.css";

const Settings = ({ email: initialEmail, profileTitle: initialProfileTitle, setEmail, handleProfileUpdate }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: initialEmail || "",
    profileTitle: initialProfileTitle || "",
    password: "",
    confirmPassword: "",
  });

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password && formData.password !== formData.confirmPassword) {
      setAlertMessage("Passwords do not match!");
      setAlertType("error");
      setTimeout(() => setAlertMessage(""), 3000);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setAlertMessage("You need to log in first.");
        setAlertType("error");
        window.location.href = "/signin";
        return;
      }

      const updateData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        profileTitle: formData.profileTitle,
      };
      if (formData.password) {
        updateData.password = formData.password;
      }

      const response = await fetch(`${API_BASE_URL}/api/users/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();

        if (response.status === 401) {
          setAlertMessage("Session expired. Please log in again.");
          setAlertType("error");
          localStorage.removeItem("token");
          window.location.href = "/signin";
          return;
        }
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const updatedUser = await response.json();

      setEmail(updatedUser.user.email);
      handleProfileUpdate({ profileTitle: updatedUser.user.profileTitle });
      setAlertMessage(updatedUser.message || "Profile updated successfully!");
      setAlertType("success");
      setTimeout(() => setAlertMessage(""), 3000);
    } catch (error) {
      setAlertMessage("Cannot update now, please try later.");
      setAlertType("error");
      setTimeout(() => setAlertMessage(""), 3000);
    }
  };

  return (
    <div className="edit-profile-container1">
      <div className="profile-header">
        <h2>Profile</h2>
        <p>Manage settings for your profile</p>
      </div>
      <div className="edit-profile-container">
        {alertMessage && (
          <div className={`alert ${alertType === "success" ? "alert-success" : "alert-error"}`}>
            {alertMessage}
          </div>
        )}

        <h3 className="edit-profile-title">Edit Profile</h3>
        <hr className="title-underline" />

        <form onSubmit={handleSubmit} className="edit-form">
          <div className="input-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              required
            />
          </div>

          <div className="input-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label>Profile Title</label>
            <input
              type="text"
              name="profileTitle"
              value={formData.profileTitle}
              onChange={handleChange}
              placeholder="Enter your profile title (e.g., @username)"
              required
            />
          </div>

          <div className="input-group">
            <label>New Password (optional)</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password"
            />
          </div>

          <div className="input-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your new password"
            />
          </div>

          <button type="submit" className="save-button">Save</button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
