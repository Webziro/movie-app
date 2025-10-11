import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { API_BASE_URL } from '../config/api.js';
import '../css/Login.css';
import loginImage from '../images/login-img.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const fromPath = location.state?.from?.pathname || '/home';

  //Handle login function
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.token) {
        login(data.token);
        navigate(fromPath, { replace: true });
      } else {
        setError(data.message || 'Login failed');
      }
      //If password or email is incorrect, set error message
      if (data.message === 'Invalid credentials') {
        setError('Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed');
      //If there is an error, set error message
      if (err.message === 'Invalid credentials') {
        setError('Invalid credentials');
      }
    } finally {
      setLoading(false);
    }
  };

  // Render the login page
  return (
    <div className="login-container">
      {/* Left side - Image */}
      <div className="login-left">
        <img 
          src={loginImage} 
          alt="Movie App" 
          className="login-image"
        />
      </div>

      {/* Right side - Form */}
      <div className="login-right">
        <div className="login-form-container">
          <h1 className="login-title">Welcome Back</h1>
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input 
                id="email"
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                className="form-input"
                placeholder="Enter your email" 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input 
                id="password"
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                className="form-input"
                placeholder="Enter your password" 
                required 
              />
            </div>

            {error && <div className="error-message">{error}</div>}
            
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          
          <div className="login-link">
            <p>Don't have an account? <Link to="/">Create Account</Link></p>
            <p><Link to="/forgot-password">Forgot Password?</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
