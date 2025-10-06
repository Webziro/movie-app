import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from "../config/api.js";
import "../css/Register.css";
import registerImage from "../images/register-img.jpg";

export default function App() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setValues((values) => ({...values,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setApiError("");
    setSuccess(false);

    if (values.username && values.email && values.password) {
      setValid(true);
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: values.username,
            email: values.email,
            password: values.password,
          }),
        });
        const data = await res.json();
        if (res.ok) {
          setSuccess(true);
          setValues({ username: "", email: "", password: "" });
          setSubmitted(false);
          setTimeout(() => navigate("/home"), 1000);
        } else {
          setApiError(data.message || "Registration failed");
        }
      } catch (error) {
        setApiError("Registration failed. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      setValid(false);
    }
  }; 

  return (
    <div className="register-container">
      {/* Left side - Form */}
      <div className="register-left">
        <div className="register-form-container">
          <h1 className="register-title">Create Account</h1>
          <form onSubmit={handleSubmit} className="register-form">
            {success && (
              <div className="success-message">
                <h3>Welcome {values.username}!</h3>
                <div>Your registration was successful!</div>
              </div>
            )}
            {apiError && <div className="error-message">{apiError}</div>}

            <div className="form-group">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                id="username"
                className="form-input"
                type="text"
                placeholder="Enter your username"
                name="username"
                value={values.username}
                onChange={handleInputChange}
                required
              />
              {submitted && !values.username && (
                <span style={{ color: '#e74c3c', fontSize: '0.8rem' }}>Please enter a username</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                id="email"
                className="form-input"
                type="email"
                placeholder="Enter your email"
                name="email"
                value={values.email}
                onChange={handleInputChange}
                required
              />
              {submitted && !values.email && (
                <span style={{ color: '#e74c3c', fontSize: '0.8rem' }}>Please enter an email</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                id="password"
                className="form-input"
                type="password"
                placeholder="Enter your password"
                name="password"
                value={values.password}
                onChange={handleInputChange}
                required
              />
              {submitted && !values.password && (
                <span style={{ color: '#e74c3c', fontSize: '0.8rem' }}>Please enter a password</span>
              )}
            </div>

            <button className="register-button" type="submit" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
          
          <div className="register-link">
            <p>Already have an account? <Link to="/login">Sign In</Link></p>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="register-right">
        <img 
          src={registerImage} 
          alt="Movie App" 
          className="register-image"
        />
      </div>
    </div>
  );
}