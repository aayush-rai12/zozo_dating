import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./login.css";
import apiClient from "../../../utils/apiClient";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const PASSWORD_MIN_LENGTH = 6;

const isEmailValid = (email) => EMAIL_REGEX.test(email);

const isPasswordValid = (password) => password.length >= PASSWORD_MIN_LENGTH;
const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = [];

    if (!isEmailValid(email)) {
      errors.push("Please enter a valid email address.");
      setEmailError("Please enter a valid email address.");
    }

    if (!isPasswordValid(password)) {
      errors.push(
        `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`
      );
      setPasswordError(
        `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`
      );
    }

    if (errors.length === 0) {
      // Perform form submission logic here
      const user = {
        email: email,
        password: password,
      };
      try {
        const response = await apiClient.post("/user/login", user);
        if (response?.data?.message) {
          setMessage(response?.data?.message);
          setMessageType("success");
          localStorage.setItem("token", response?.data?.token);
          localStorage.setItem("user", JSON.stringify(response?.data?.user));
        }
        setTimeout(() => {
         
          setMessage("");
          setMessageType("");
          navigate("/userProfile");
        }, 1500);
      } catch (error) {
        setMessage(error?.response?.data?.message || "Login failed please try again");
        setMessageType("error");
      }
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
        <form onSubmit={handleSubmit}>
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
          {message && (
            <p className={`login-message ${messageType}`}>{message}</p>
          )}
          <button className="login-button" type="submit">
            Login
          </button>
          <p className="login-text">
            Don’t have an account?
            <Link to="/register" className="login-link">
              Register Now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
