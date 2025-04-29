import React from "react";
import { Pencil } from "lucide-react";
import "../Pages/ChatbotCustomization.css";

export default function ChatbotCustomization({
  customization,
  setCustomization,
}) {
  // Handle color changes
  const handleColorChange = (type, color) => {
    setCustomization((prev) => ({
      ...prev,
      [type]: color,
    }));
  };

  // Handle message changes
  const handleMessageChange = (index, newMessage) => {
    setCustomization((prev) => {
      const newMessages = [...prev.messages];
      newMessages[index] = newMessage;
      return { ...prev, messages: newMessages };
    });
  };

  // Handle welcome message change
  const handleWelcomeMessageChange = (newMessage) => {
    setCustomization((prev) => ({
      ...prev,
      welcomeMessage: newMessage,
    }));
  };

  // Handle timer changes
  const handleTimerChange = (index, field, value) => {
    setCustomization((prev) => {
      const newTimers = [...prev.missedChatTimer];
      newTimers[index] = {
        ...newTimers[index],
        [field]: String(value).padStart(2, "0"), // Corrected: ensure value is string
      };
      return { ...prev, missedChatTimer: newTimers };
    });
  };

  // (Optional) Handle save button click for timers
  const handleSave = () => {
    console.log("Timer saved!", customization.missedChatTimer);
    // Here you can also update backend or show success message
  };

  return (
    <div className="customization-panel">
      {/* Header Color */}
      <div className="panel-card">
        <section className="panel-section">
          <h3>Header Color</h3>
          <div className="color-options">
            {["#FFFFFF", "#000000", "#3347B5"].map((color) => (
              <button
                key={color}
                className={`color-swatch ${
                  color === customization.headerColor ? "active" : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorChange("headerColor", color)}
              ></button>
            ))}
          </div>
          <div className="color-input">
            <div
              className="color-preview"
              style={{ backgroundColor: customization.headerColor }}
            ></div>
            <input
              type="text"
              value={customization.headerColor}
              // Removed readOnly to allow manual color code entry
              onChange={(e) => handleColorChange("headerColor", e.target.value)}
            />
          </div>
        </section>
      </div>

      {/* Background Color */}
      <div className="panel-card">
        <section className="panel-section">
          <h3>Custom Background Color</h3>
          <div className="color-options">
            {["#FFFFFF", "#000000", "#EEEEEE"].map((color) => (
              <button
                key={color}
                className={`color-swatch ${
                  color === customization.backgroundColor ? "active" : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorChange("backgroundColor", color)}
              ></button>
            ))}
          </div>
          <div className="color-input">
            <div
              className="color-preview"
              style={{ backgroundColor: customization.backgroundColor }}
            ></div>
            <input
              type="text"
              value={customization.backgroundColor}
              onChange={(e) =>
                handleColorChange("backgroundColor", e.target.value)
              }
            />
          </div>
        </section>
      </div>

      {/* Customize Message */}
      <div className="panel-card">
        <section className="panel-section">
          <h3>Customize Message</h3>
          {customization.messages.map((msg, index) => (
            <div className="editable-message" key={index}>
              <input
                type="text"
                value={msg}
                onChange={(e) => handleMessageChange(index, e.target.value)}
              />
              <button className="edit-button">
                <Pencil size={16} />
              </button>
            </div>
          ))}
        </section>
      </div>

      {/* Introduction Form */}
     

      {/* Welcome Message */}
      <div className="panel-card">
        <section className="panel-section">
          <h3>Welcome Message</h3>
          <div className="welcome-preview">
            <input
              type="text"
              value={customization.welcomeMessage}
              onChange={(e) => handleWelcomeMessageChange(e.target.value)}
            />
            <button className="edit-button">
              <Pencil size={16} />
            </button>
          </div>
        </section>
      </div>

      {/* Missed Chat Timer */}
      <div className="panel-card">
        <section className="panel-section">
          <h3>Missed Chat Timer</h3>
          <div className="timer-inputs">
            {customization.missedChatTimer.map((timer, index) => (
              <div className="timer-group" key={index}>
                <input
                  type="number"
                  value={parseInt(timer.hours) || 0}
                  min="0"
                  max="23"
                  onChange={(e) =>
                    handleTimerChange(index, "hours", e.target.value)
                  }
                />
                <span>:</span>
                <input
                  type="number"
                  value={parseInt(timer.minutes) || 0}
                  min="0"
                  max="59"
                  onChange={(e) =>
                    handleTimerChange(index, "minutes", e.target.value)
                  }
                />
                <span>:</span>
                <input
                  type="number"
                  value={parseInt(timer.seconds) || 0}
                  min="0"
                  max="59"
                  onChange={(e) =>
                    handleTimerChange(index, "seconds", e.target.value)
                  }
                />
              </div>
            ))}
          </div>
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
        </section>
      </div>
    </div>
  );
}
