import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { API_BASE_URL } from '../config/api.js';
import '../css/ChangePassword.css';
import registerImage from '../images/register-img.jpg';

function ChangePassword() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [values, setValues] = useState({
    currentPassword: "",
    newPassword: "",
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
    if (values.newPassword !== values.confirmPassword) {
      setApiError("New passwords do not match");
      return;
    }

    // Validate minimum password length
    if (values.newPassword.length < 6) {
      setApiError("New password must be at least 6 characters long");
      return;
    }

    if (values.currentPassword && values.newPassword && values.confirmPassword) {
      setValid(true);
      setLoading(true);
      try {
        console.log('Sending change password request with token:', token);
         const res = await fetch(`${API_BASE_URL}/change-password`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
          }),
        });
        
        console.log('Response status:', res.status);
        const data = await res.json();
        console.log('Response data:', data);
        
        if (res.ok) {
          setSuccess(true);
          setValues({ currentPassword: "", newPassword: "", confirmPassword: "" });
          setSubmitted(false);
          setTimeout(() => navigate("/home"), 2000);
        } else {
          setApiError(data.message || "Password change failed");
        }
      } catch (error) {
        console.error('Change password error:', error);
        setApiError("Password change failed. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      setValid(false);
    }
  };

  // Redirect if not logged in
  if (!token) {
    navigate('/login');
    return null;
  }

  return (
    <div className="change-password-container">
      {/* Left side - Form */}
      <div className="change-password-left">
        <div className="change-password-form-container">
          <h1 className="change-password-title">Change Password</h1>
          <p className="change-password-subtitle">
            Enter your current password and choose a new password for your account.
          </p>
          
          <form onSubmit={handleSubmit} className="change-password-form">
            {success && (
              <div className="success-message">
                <h3>Password Changed Successfully!</h3>
                <div>Your password has been updated. Redirecting to home...</div>
              </div>
            )}
            {apiError && <div className="error-message">{apiError}</div>}

            <div className="form-group">
              <label htmlFor="currentPassword" className="form-label">Current Password</label>
              <input
                id="currentPassword"
                className="form-input"
                type="password"
                placeholder="Enter your current password"
                name="currentPassword"
                value={values.currentPassword}
                onChange={handleInputChange}
                required
              />
              {submitted && !values.currentPassword && (
                <span style={{ color: '#e74c3c', fontSize: '0.8rem' }}>
                  Please enter your current password
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="newPassword" className="form-label">New Password</label>
              <input
                id="newPassword"
                className="form-input"
                type="password"
                placeholder="Enter your new password"
                name="newPassword"
                value={values.newPassword}
                onChange={handleInputChange}
                required
                minLength={6}
              />
              {submitted && !values.newPassword && (
                <span style={{ color: '#e74c3c', fontSize: '0.8rem' }}>
                  Please enter a new password (minimum 6 characters)
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
                  Please confirm your new password
                </span>
              )}
              {values.newPassword && values.confirmPassword && values.newPassword !== values.confirmPassword && (
                <span style={{ color: '#e74c3c', fontSize: '0.8rem' }}>
                  Passwords do not match
                </span>
              )}
            </div>

            <button className="change-password-button" type="submit" disabled={loading}>
              {loading ? "Changing Password..." : "Change Password"}
            </button>
          </form>
          
          <div className="change-password-link">
            <p><Link to="/home">Back to Home</Link></p>
            <p>Forgot your password? <Link to="/forgot-password">Reset Password</Link></p>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="change-password-right">
        <img 
          src={registerImage} 
          alt="Movie App" 
          className="change-password-image"
        />
      </div>
    </div>
  );
}

export default ChangePassword;
