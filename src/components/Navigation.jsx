import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Badge
} from '@mui/material';
import { 
  Logout, 
  Notifications,
  Menu as MenuIcon
} from '@mui/icons-material';
import { logout, getUserFromToken, isAuthenticated, syncUserData } from '../services/auth';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { fetchNotifications } from '../services/api';

const Navigation = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Sync user data setiap kali komponen mount atau location berubah
  useEffect(() => {
    const initializeUser = async () => {
      if (isAuthenticated()) {
        try {
          // Sync dengan backend untuk mendapatkan data user terbaru
          const syncedUser = await syncUserData();
          if (syncedUser) {
            setUser(syncedUser);
          } else {
            // Fallback ke data dari token jika sync gagal
            setUser(getUserFromToken());
          }
        } catch (error) {
          console.error('Error initializing user:', error);
          setUser(getUserFromToken());
        }
      } else {
        setUser(null);
      }
    };

    initializeUser();
  }, [location]);

  useEffect(() => {
    if (isAuthenticated() && user) {
      loadNotifications();
      const interval = setInterval(loadNotifications, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const loadNotifications = async () => {
    try {
      const response = await fetchNotifications();
      if (response.success) {
        setNotifications(response.data);
      }
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  };

  const handleProfileMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationsMenu = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setNotificationsAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      // Redirect langsung ke landing page setelah logout
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      // Tetap redirect ke landing page meskipun ada error
      navigate('/');
    }
    handleClose();
  };

  const getNotificationType = (data) => {
    const issues = [];
    
    if (data.suhu_air_permukaan > 32 || data.suhu_air_permukaan < 28) {
      issues.push('Suhu Permukaan');
    }
    if (data.suhu_air_dasar > 32 || data.suhu_air_dasar < 28) {
      issues.push('Suhu Dasar');
    }
    if (data.suhu_ruang > 30 || data.suhu_ruang < 25) {
      issues.push('Suhu Ruang');
    }
    if (data.salinitas > 25 || data.salinitas < 15) {
      issues.push('Salinitas');
    }
    if (data.oxygen < 4 || data.oxygen > 8) {
      issues.push('Oksigen');
    }
    if (data.ph < 7.5 || data.ph > 8.5) {
      issues.push('pH');
    }
    if (data.amonia > 0.5) {
      issues.push('Amonia');
    }

    return issues.length > 0 ? 'warning' : 'info';
  };

  const getNotificationMessage = (data) => {
    const issues = [];
    
    if (data.suhu_air_permukaan > 32) issues.push('Suhu permukaan terlalu tinggi');
    else if (data.suhu_air_permukaan < 28) issues.push('Suhu permukaan terlalu rendah');
    
    if (data.suhu_air_dasar > 32) issues.push('Suhu dasar terlalu tinggi');
    else if (data.suhu_air_dasar < 28) issues.push('Suhu dasar terlalu rendah');
    
    if (data.suhu_ruang > 30) issues.push('Suhu ruang terlalu tinggi');
    else if (data.suhu_ruang < 25) issues.push('Suhu ruang terlalu rendah');
    
    if (data.salinitas > 25) issues.push('Salinitas terlalu tinggi');
    else if (data.salinitas < 15) issues.push('Salinitas terlalu rendah');
    
    if (data.oxygen < 4) issues.push('Oksigen terlalu rendah');
    else if (data.oxygen > 8) issues.push('Oksigen terlalu tinggi');
    
    if (data.ph < 7.5) issues.push('pH terlalu rendah');
    else if (data.ph > 8.5) issues.push('pH terlalu tinggi');
    
    if (data.amonia > 0.5) issues.push('Amonia terlalu tinggi');

    return issues.length > 0 ? issues.join(', ') : 'Semua parameter normal';
  };

  const unreadNotifications = notifications.filter(notif => 
    getNotificationType(notif) === 'warning'
  ).length;

  // Jangan render Navigation di halaman login dan register
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <AppBar position="static" sx={{ 
      background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)',
      boxShadow: '0 2px 10px rgba(46, 125, 50, 0.1)'
    }}>
      <Toolbar>
        {/* Logo/Brand */}
        <Typography 
          variant="h6" 
          component={Link}
          to={isAuthenticated() ? "/dashboard" : "/"}
          sx={{ 
            flexGrow: 1,
            fontWeight: 'bold',
            textDecoration: 'none',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          
        </Typography>

        {isAuthenticated() && user ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Notifications Button */}
            <IconButton
              color="inherit"
              onClick={handleNotificationsMenu}
              sx={{ position: 'relative' }}
            >
              <Badge badgeContent={unreadNotifications} color="error">
                <Notifications />
              </Badge>
            </IconButton>

            {/* Notifications Menu */}
            <Menu
              anchorEl={notificationsAnchorEl}
              open={Boolean(notificationsAnchorEl)}
              onClose={handleClose}
              PaperProps={{
                sx: {
                  width: 350,
                  maxHeight: 400,
                  background: 'white'
                }
              }}
            >
              <MenuItem disabled>
                <Typography variant="subtitle2" fontWeight="bold">
                  Notifikasi Sistem
                </Typography>
              </MenuItem>
              {notifications.length === 0 ? (
                <MenuItem disabled>
                  <Typography variant="body2" color="textSecondary">
                    Tidak ada notifikasi
                  </Typography>
                </MenuItem>
              ) : (
                notifications.slice(0, 5).map((notification, index) => (
                  <MenuItem key={index} onClick={handleClose}>
                    <Box sx={{ 
                      width: '100%',
                      p: 1,
                      borderRadius: 1,
                      backgroundColor: getNotificationType(notification) === 'warning' ? '#fff3e0' : '#e8f5e8'
                    }}>
                      <Typography variant="body2" color="text.primary">
                        {getNotificationMessage(notification)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(notification.time).toLocaleString('id-ID')}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))
              )}
            </Menu>

            {/* User Profile */}
            <IconButton
              size="large"
              onClick={handleProfileMenu}
              color="inherit"
            >
              <Avatar 
                sx={{ 
                  width: 32, 
                  height: 32,
                  bgcolor: '#4CAF50',
                  fontSize: '14px'
                }}
              >
                {user.email?.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem disabled>
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {user.email}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Pengguna
                  </Typography>
                </Box>
              </MenuItem>
              
              <MenuItem onClick={handleLogout}>
                <Logout sx={{ mr: 1, fontSize: 20 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box>
            <Button 
              color="inherit" 
              onClick={() => navigate('/login')}
              sx={{ mr: 1 }}
            >
              Masuk
            </Button>
            <Button 
              color="inherit" 
              variant="outlined" 
              onClick={() => navigate('/register')}
              sx={{ 
                borderRadius: 2,
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                }
              }}
            >
              Buat Akun
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;