import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// Wrapper component to protect routes. If not authenticated, redirects to login.
const ProtectedRoute = ({ children }) => {
  const { auth } = React.useContext(AuthContext);
  return auth && auth.token ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
