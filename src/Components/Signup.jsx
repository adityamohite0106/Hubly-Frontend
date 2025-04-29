import React, { useState } from "react";
import "../Pages/Signup.css";
// import "/src/Mobile/MobileSignup.css"

import { Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // For redirecting after successful signup

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: "", // ✅ Clear error when user starts typing
    }));
  };

  const validateForm = () => {
    let newErrors = {};

    // Required fields check
    Object.keys(formData).forEach((key) => {
      if (!formData[key].trim()) {
        newErrors[key] = "This field is required.";
      }
    });

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    // Password validation
    if (formData.password) {
      if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters long.";
      } else if (!/(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(formData.password)) {
        newErrors.password =
          "Password must contain at least one uppercase letter, one number, and one special character.";
      }
    }

    // Confirm password validation
    if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('/api/auth/signup', { // Use relative URL
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
          credentials: "include",
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || `HTTP error! Status: ${response.status}`);
        }
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", formData.email);
        navigate("/app");
      } catch (err) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          backend: err.message,
        }));
      }
    }
  };
  
  
  
  

  return (
    <div className="signup-container">
      <div className="logo2">
        <img src="/images/logo1.png" alt="Logo" />
       
      </div>

      <div className="signup-left">
        <div className="signup-box">
    
          <b>Create an account</b>
          <span>
            <Link to="/signin" style={{ color: "rgb(24,119,242)", fontSize: "12px" }}>
              Sign in instead
            </Link>
          </span>

          <form onSubmit={handleSubmit}>
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <p className="error">{errors.firstName}</p>}

            <label htmlFor="lastName">Last name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <p className="error">{errors.lastName}</p>}

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

            <div className="terms">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                By creating an account, I agree to the <a href="#">Terms of use</a> and <a href="#">Privacy Policy</a>
              </label>
            </div>

            <button type="submit" className="signup-btn2">Create an account</button>
          </form>

          {errors.backend && <p className="error">{errors.backend}</p>}

        </div>

        <p style={{ color: "grey", paddingTop: "18px", marginLeft: "-115px", fontSize: "14px" }} className="recaptcha-text2">
          This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
        </p>
      </div>

      <div className="signup-right">
        <img src="/images/signupimg.png" alt="Signup" />
      </div>
    </div>
  );
};

export default Signup;
