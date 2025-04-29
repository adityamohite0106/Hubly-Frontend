import React, { useState } from "react";
import "../Pages/Signin.css";
// import "/src/Mobile/MobileSignin.css";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signin = () => {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [loading, setLoading] = useState(false); // Added to prevent multiple submits
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: "",
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.identifier.trim()) {
      newErrors.identifier = "Email or Username is required!";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Please enter your password*";
    } else if (formData.password.length < 8) {
      newErrors.password = "The password must be at least 8 characters long*";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm() || loading) return; // Prevent if invalid or already submitting
    setLoading(true);

    try {

      const controller = new AbortController(); // Define controller for timeout
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

      const response = await fetch('/api/auth/signin', { // Changed from VITE_API_BASE_URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: formData.identifier.trim(),
          password: formData.password,
        }),
        credentials: 'include',
        signal: controller.signal,
      });
      

      clearTimeout(timeoutId); // Clear timeout if response is fast

      const data = await response.json();
     

      if (response.ok) {
       
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.user.firstName);
        localStorage.setItem("email", data.user.email);
        setAlertMessage(`✅ Welcome, ${data.user.firstName}! Login Successful.`);
        setAlertType("success");
        setTimeout(() => {
          setAlertMessage("");
          navigate("/app");
        }, 2000);
      } else {
       
        setAlertMessage(`❌ ${data.error || "Invalid credentials. Please try again."}`);
        setAlertType("error");
        setTimeout(() => setAlertMessage(""), 3000);
      }
    } catch (error) {
     
      setAlertMessage(
        error.name === "AbortError"
          ? "⚠️ Server took too long to respond. Please try again."
          : "⚠️ Server error! Please try again later."
      );
      setAlertType("error");
      setTimeout(() => setAlertMessage(""), 30000);
    } finally {
      setLoading(false); // Re-enable button
    }
  };

  return (
    <div className="signin-container">
      {alertMessage && (
        <div className={`alert-box ${alertType === "success" ? "success" : "error"}`}>
          {alertMessage}
        </div>
      )}
      <div className="logo2">
        <img src="/images/logo1.png" alt="Logo" />
       
      </div>
      <div className="signin-left">
        <div className="signin-box">
          <h1 className="signin-title">Sign in</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                id="identifier"
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                placeholder="Enter email or username"
              />
              {errors.identifier && (
                <small className="error-text">{errors.identifier}</small>
              )}
            </div>
            <div className="input-group">
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
                <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && (
                <small className="error-text">{errors.password}</small>
              )}
            </div>
            <button type="submit" className="signin-btn2" disabled={loading}>
              {loading ? "Signing in..." : "Log in"}
            </button>
          </form>
          <p className="signup-text">
            Don't have an account? <Link to="/signup" className="signup-link">Sign Up</Link>
          </p>
        </div>
        <p className="recaptcha-text">
          This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply
        </p>
      </div>
      <div className="signin-right">
        <img src="/images/signupimg.png" alt="Signin" />
      </div>
    </div>
  );
};

export default Signin;