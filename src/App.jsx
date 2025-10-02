import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Global } from '@emotion/react';

import theme from './styles/theme';
import { globalStyles } from './styles/globalStyles';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import ProtectedRoute from './components/ProtectedRoute';
import { isAuthenticated } from './services/auth';

// Komponen wrapper untuk conditional navigation
const AppContent = () => {
  const location = useLocation();
  
  // Jangan tampilkan Navigation di halaman login, register, dan landing page
  const showNavigation = !['/login', '/register', '/'].includes(location.pathname);

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {showNavigation && <Navigation />}
      
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected routes */}
        <Route 
          path="/dashboard/*" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Redirect based on authentication */}
        <Route 
          path="*" 
          element={
            isAuthenticated() ? 
            <Navigate to="/dashboard" replace /> : 
            <Navigate to="/" replace />
          } 
        />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Global styles={globalStyles} />
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;