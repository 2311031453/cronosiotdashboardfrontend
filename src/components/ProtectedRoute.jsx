//ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, getUserFromToken } from '../services/auth';

const ProtectedRoute = ({ children }) => {
  const isAuth = isAuthenticated();
  const user = isAuth ? getUserFromToken() : null;

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;