import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('authToken'));

  useEffect(() => {
    if (token) localStorage.setItem('authToken', token);
    else localStorage.removeItem('authToken');
  }, [token]);

  const login = (newToken) => setToken(newToken);
  const logout = () => setToken(null);

  const value = { token, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}