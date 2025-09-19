import React, { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import "../css/ResetPassword.css";
import registerImage from "../images/register-img.jpg";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [values, setValues] = useState({
    password: "",
    confirmPassword: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setValues((values) => ({
      ...values,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setApiError("");
    setSuccess(false);

    // Validate passwords match
    if (values.password !== values.confirmPassword) {
      setApiError("Passwords do not match");
      return;
    }

    if (values.password && values.confirmPassword) {
      setValid(true);
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3000/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: token,
            password: values.password,
          }),
        });
        const data = await res.json();
        if (res.ok) {
          setSuccess(true);
          setValues({ password: "", confirmPassword: "" });
          setSubmitted(false);
          setTimeout(() => navigate("/login"), 2000);
        } else {
          setApiError(data.message || "Password reset failed");
        }
      } catch (error) {
        setApiError("Password reset failed. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      setValid(false);
    }
  };

  // If no token provided, show error
  if (!token) {
    return (
      <div className="reset-password-container">
        <div className="reset-password-left">
          <div className="reset-password-form-container">
            <h1 className="reset-password-title">Invalid Reset Link</h1>
            <div className="error-message">
              This password reset link is invalid or has expired.
            </div>
            <div className="reset-password-link">
              <p><Link to="/forgot-password">Request a new reset link</Link></p>
              <p><Link to="/login">Back to Login</Link></p>
            </div>
          </div>
        </div>
        <div className="reset-password-right">
          <img 
            src={registerImage} 
            alt="Movie App" 
            className="reset-password-image"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="reset-password-container">
      {/* Left side - Form */}
      <div className="reset-password-left">
        <div className="reset-password-form-container">
          <h1 className="reset-password-title">Reset Password</h1>
          <p className="reset-password-subtitle">
            Enter your new password below to complete the reset process.
          </p>
          
          <form onSubmit={handleSubmit} className="reset-password-form">
            {success && (
              <div className="success-message">
                <h3>Password Reset Successful!</h3>
                <div>Your password has been updated. Redirecting to login...</div>
              </div>
            )}
            {apiError && <div className="error-message">{apiError}</div>}

            <div className="form-group">
              <label htmlFor="password" className="form-label">New Password</label>
              <input
                id="password"
                className="form-input"
                type="password"
                placeholder="Enter your new password"
                name="password"
                value={values.password}
                onChange={handleInputChange}
                required
                minLength={6}
              />
              {submitted && !values.password && (
                <span style={{ color: '#e74c3c', fontSize: '0.8rem' }}>
                  Please enter a password (minimum 6 characters)
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
              <input
                id="confirmPassword"
                className="form-input"
                type="password"
                placeholder="Confirm your new password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleInputChange}
                required
                minLength={6}
              />
              {submitted && !values.confirmPassword && (
                <span style={{ color: '#e74c3c', fontSize: '0.8rem' }}>
                  Please confirm your password
                </span>
              )}
              {values.password && values.confirmPassword && values.password !== values.confirmPassword && (
                <span style={{ color: '#e74c3c', fontSize: '0.8rem' }}>
                  Passwords do not match
                </span>
              )}
            </div>

            <button className="reset-password-button" type="submit" disabled={loading}>
              {loading ? "Updating Password..." : "Update Password"}
            </button>
          </form>
          
          <div className="reset-password-link">
            <p>Remember your password? <Link to="/login">Back to Login</Link></p>
            <p>Don't have an account? <Link to="/">Create Account</Link></p>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="reset-password-right">
        <img 
          src={registerImage} 
          alt="Movie App" 
          className="reset-password-image"
        />
      </div>
    </div>
  );
}
