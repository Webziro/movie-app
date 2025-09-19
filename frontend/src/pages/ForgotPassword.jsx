import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/ForgotPassword.css';
import loginImage from '../images/login-img.png';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    
    try {
      const res = await fetch('http://localhost:3000/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setMessage('Password reset link has been sent to your email address.');
      } else {
        setError(data.message || 'Failed to send reset link');
      }
    } catch (err) {
      console.error('Forgot password error:', err);
      setError('Failed to send reset link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      {/* Left side - Image */}
      <div className="forgot-password-left">
        <img 
          src={loginImage} 
          alt="Movie App" 
          className="forgot-password-image"
        />
      </div>

      {/* Right side - Form */}
      <div className="forgot-password-right">
        <div className="forgot-password-form-container">
          <h1 className="forgot-password-title">Forgot Password?</h1>
          <p className="forgot-password-subtitle">
            Don't worry! Enter your email address and we'll send you a link to reset your password.
          </p>
          
          <form onSubmit={handleForgotPassword} className="forgot-password-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input 
                id="email"
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                className="form-input"
                placeholder="Enter your email address" 
                required 
              />
            </div>

            {error && <div className="error-message">{error}</div>}
            {message && <div className="success-message">{message}</div>}
            
            <button type="submit" className="forgot-password-button" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
          
          <div className="forgot-password-link">
            <p>Remember your password? <Link to="/login">Back to Login</Link></p>
            <p>Don't have an account? <Link to="/">Create Account</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;




