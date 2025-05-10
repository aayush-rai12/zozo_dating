import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Registration.css";

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

  const handleInputChange = (e, setter, setError) => {
    setter(e.target.value);
    console.log('handle changes',e.target.value);
    setError("");
  };

  const validateDetails = (e) => {
    e.preventDefault();

    const errors = [];

    if (firstName === "") {
      errors.push("Enter your first name please.");
      setFirstNameError("Enter your first name please.");
    } else {
      setFirstNameError("");
    }

    if (lastName === "") {
      errors.push("Enter your last name please.");
      setLastNameError("Enter your last name please.");
    } else {
      setLastNameError("");
    }

    if (!isEmailValid(email)) {
      errors.push("Please enter a valid email address.");
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }

    if (!isPasswordValid(password)) {
      errors.push(
        `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`
      );
      setPasswordError(
        `Password at least ${PASSWORD_MIN_LENGTH} characters.`
      );
    } else {
      setPasswordError("");
    }

    if (password !== confirmPassword) {
      errors.push("Passwords do not match.");
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }

    if (errors.length === 0) {
      var formData = { firstName, lastName, email, password, confirmPassword };
      console.log(formData);
      // Perform the form submission logic here
    } else {
      console.log(errors.join("\n"));
    }
  };

  return (
    <div className="reg-center-container">
      <div className="register-container">
        <h1 className="register-welcome-text">Welcome to Zozo</h1>
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
        <button className="register-button" onClick={validateDetails}>
          Create Account
        </button>
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
