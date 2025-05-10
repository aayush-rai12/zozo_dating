import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const PASSWORD_MIN_LENGTH = 6;

const isEmailValid = (email) => EMAIL_REGEX.test(email);

const isPasswordValid = (password) => password.length >= PASSWORD_MIN_LENGTH;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateDetails = (e) => {
    e.preventDefault();

    const errors = [];

    if (!isEmailValid(email)) {
      errors.push("Please enter a valid email address.");
      setEmailError("Please enter a valid email address.");
    }

    if (!isPasswordValid(password)) {
      errors.push(`Password must be at least ${PASSWORD_MIN_LENGTH} characters.`);
      setPasswordError(`Password must be at least ${PASSWORD_MIN_LENGTH} characters.`);
    }

    if (errors.length === 0) {
      // Perform form submission logic here
      console.log("Form submitted successfully!");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  return (
    <div className="login-center-container">
      <div className="login-container">
        <h1 className="welcome-text">Welcome zozo</h1>
        <div className="input-container">
          <label className="input-label">Email</label>
          <input
            type="email"
            className="login-input"
            placeholder="zozo@gmail.com"
            value={email}
            onChange={handleEmailChange}
          />
          <span className="validation-error">{emailError}</span>
        </div>

        <div className="input-container">
          <label className="input-label">Password</label>
          <input
            type="password"
            className="login-input"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <span className="validation-error">{passwordError}</span>
        </div>
        <p className="forgot-password-text">
          <Link to="/forgotPassword" className="forgot-password-link">
            Forgot your password?
          </Link>
        </p>

        <button className="login-button" onClick={validateDetails}>
          Login
        </button>
        <p className="login-text">
          Don’t have an account?
          <Link to="/register" className="login-link">
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;