import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./forgotPass.css";

  // background-image: url('../../../../assets/images/loveBgm1.jpg')!important; 
  // import image from  '../../../../src/assets/images/loveBgm1.jpg';
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const PASSWORD_MIN_LENGTH = 6;

const isEmailValid = (email) => EMAIL_REGEX.test(email);
const isPasswordValid = (password) => password.length >= PASSWORD_MIN_LENGTH;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState("");

  const validateDetails = (e) => {
    e.preventDefault();

    const errors = [];

    if (!isEmailValid(email)) {
      errors.push("Please enter a valid email address.");
      setEmailError("Please enter a valid email address.");
    }

    if (!isPasswordValid(newPassword)) {
      errors.push(`Password must be at least ${PASSWORD_MIN_LENGTH} characters.`);
      setNewPasswordError(`Password must be at least ${PASSWORD_MIN_LENGTH} characters.`);
    }

    if (newPassword !== confirmNewPassword) {
      errors.push("Passwords do not match.");
      setConfirmNewPasswordError("Passwords do not match.");
    }

    if (errors.length === 0) {
      // Perform form submission logic here
      console.log("Password reset successfully!");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    setNewPasswordError("");
  };

  const handleConfirmNewPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
    setConfirmNewPasswordError("");
  };

  return (
    <div className="center-container">
      <div className="password-forgot-container">
        <h1 className="password-welcome-text">Forgot Password</h1>
        <div className="password-input-container">
          <label className="password-input-label">Email</label>
          <input
            type="email"
            className="password-forgot-input"
            placeholder="zozo@gmail.com"
            value={email}
            onChange={handleEmailChange}
          />
          <span className="password-validation-error">{emailError}</span>
        </div>

        <div className="password-input-container">
          <label className="password-input-label">New Password</label>
          <input
            type="password"
            className="password-forgot-input"
            placeholder="New Password"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
          <span className="password-validation-error">{newPasswordError}</span>
        </div>

        <div className="password-input-container">
          <label className="password-input-label">Confirm New Password</label>
          <input
            type="password"
            className="password-forgot-input"
            placeholder="Confirm New Password"
            value={confirmNewPassword}
            onChange={handleConfirmNewPasswordChange}
          />
          <span className="password-validation-error">{confirmNewPasswordError}</span>
        </div>

        <button className="password-forgot-button" onClick={validateDetails}>
          Reset Password
        </button>
        <p className="password-login-text">
          Remember your password?{" "}  
          <Link to="/login" className="password-login-link">
            Login Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;