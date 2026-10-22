import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ customer: null, token: null });

  // On mount, try to load auth from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('auth');
    if (stored) {
      setAuth(JSON.parse(stored));
    }
  }, []);

  const login = async (email, password) => {
    const response = await axios.post('/api/v1/auth/login', { email, password });
    const { token, customer } = response.data;
    const newAuth = { token, customer };
    setAuth(newAuth);
    localStorage.setItem('auth', JSON.stringify(newAuth));
    return newAuth;
  };

  const logout = () => {
    setAuth({ token: null, customer: null });
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
