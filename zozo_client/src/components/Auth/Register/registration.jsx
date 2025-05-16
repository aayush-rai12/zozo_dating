import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Registration.css";
import apiClient from "../../../utils/apiClient";
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const PASSWORD_MIN_LENGTH = 6;

const isEmailValid = (email) => EMAIL_REGEX.test(email);
const isPasswordValid = (password) => password.length >= PASSWORD_MIN_LENGTH;

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e, setter, setError) => {
    setter(e.target.value);
    setError("");
  };

  const validateDetails = () => {
    let isValid = true;

    if (firstName.trim() === "") {
      setFirstNameError("Enter your first name.");
      isValid = false;
    } else {
      setFirstNameError("");
    }

    if (lastName.trim() === "") {
      setLastNameError("Enter your last name.");
      isValid = false;
    } else {
      setLastNameError("");
    }

    if (!isEmailValid(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!isPasswordValid(password)) {
      setPasswordError(
        `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`
      );
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateDetails();
    if (!isValid) return;

    try {
      const userRegistrationData = {
        firstName,
        lastName,
        email,
        password,
      };

      const response = await apiClient.post(
        "user/register",
        userRegistrationData
      );
      // Set success message
      setMessage(response?.data?.message || "User registered successfully!");
      setMessageType("success");

      // Optional: Clear form fields after success
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Optional: Hide message after 3 seconds AND  Redirect to login
      setTimeout(() => {
        setMessage("");
        setMessageType("");
        navigate("/login");
      }, 2500);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
      setMessageType("error");

      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
    }
  };

  return (
    <div className="reg-center-container">
      <div className="register-container">
        <h1 className="register-welcome-text">Welcome to Zozo</h1>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="flex-container">
            <div className="half-input-container half-width">
              <label className="input-label">First Name</label>
              <input
                type="text"
                className="register-input"
                placeholder="First Name"
                value={firstName}
                onChange={(e) =>
                  handleInputChange(e, setFirstName, setFirstNameError)
                }
              />
              <span className="validation-error">{firstNameError}</span>
            </div>
            <div className="half-input-container half-width">
              <label className="input-label">Last Name</label>
              <input
                type="text"
                className="register-input"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) =>
                  handleInputChange(e, setLastName, setLastNameError)
                }
              />
              <span className="validation-error">{lastNameError}</span>
            </div>
          </div>
          <div className="reg-input-container">
            <label className="input-label">User Email</label>
            <input
              type="email"
              className="register-input"
              placeholder="zozo@gmail.com"
              value={email}
              onChange={(e) => handleInputChange(e, setEmail, setEmailError)}
            />
            <span className="validation-error">{emailError}</span>
          </div>
          <div className="reg-input-main_container">
            <div className="reg-input-container">
              <label className="input-label">Password</label>
              <input
                type="password"
                className="register-input"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  handleInputChange(e, setPassword, setPasswordError)
                }
              />
              <span className="validation-error">{passwordError}</span>
            </div>
            <div className="reg-input-container">
              <label className="input-label">Confirm Password</label>
              <input
                type="password"
                className="register-input"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) =>
                  handleInputChange(
                    e,
                    setConfirmPassword,
                    setConfirmPasswordError
                  )
                }
              />
            </div>
          </div>
          <span className="validation-error">{confirmPasswordError}</span>
          <button className="register-button" type="submit">
            Create Account
          </button>
          {message && (
            <div className={`register-message ${messageType}`}>{message}</div>
          )}
        </form>
        <p className="login-text">
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            Login Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
