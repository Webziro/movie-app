import React from 'react';

function Logout({ onLogout }) {
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    onLogout();
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;

// 