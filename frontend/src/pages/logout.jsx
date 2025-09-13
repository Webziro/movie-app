import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function Logout() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    // Clear the session first
    logout();
    
    // Navigate immediately after logout
    navigate('/login', { replace: true });
  }, [logout, navigate]);

  return (
    <div className="logout-container">
      <h2>Logging out...</h2>
      <p>You are being redirected to the login page.</p>
    </div>
  );
}

export default Logout;