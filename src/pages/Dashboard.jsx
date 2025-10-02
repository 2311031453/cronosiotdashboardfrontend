import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  CircularProgress,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import MenuIcon from '@mui/icons-material/Menu';
import ParameterCards from '../components/ParameterCards';
import DataChart from '../components/DataChart';
import DataTable from '../components/DataTable';
import Sidebar from '../components/Sidebar';
import { fetchLatestData, fetchAllData } from '../services/api';
import { getUserFromToken, isAuthenticated, syncUserData } from '../services/auth';

const Dashboard = () => {
  const [latestData, setLatestData] = useState(null);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [user, setUser] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Sync user data setiap kali komponen mount
  useEffect(() => {
    const initializeUser = async () => {
      if (isAuthenticated()) {
        try {
          const syncedUser = await syncUserData();
          if (syncedUser) {
            setUser(syncedUser);
          } else {
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
  }, []);

  // Default sidebar state berdasarkan ukuran layar
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [latest, allDataResponse] = await Promise.all([
        fetchLatestData(),
        fetchAllData()
      ]);
      
      if (latest && latest.data) {
        setLatestData(latest.data);
      }
      
      if (allDataResponse && allDataResponse.data) {
        setAllData(allDataResponse.data);
      }
      
      setLastUpdated(new Date());
    } catch (err) {
      setError('Gagal memuat data. Silakan coba lagi.');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    fetchData();
  };

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'parameters-cards':
        return <ParameterCards data={latestData} />;
      case 'data-charts':
        return <DataChart data={allData} loading={loading} error={error} />;
      case 'data-table':
        return <DataTable data={allData} loading={loading} error={error} />;
      case 'dashboard':
      default:
        return (
          <>
            <ParameterCards data={latestData} />
            <Box sx={{ mt: 4 }}>
              <DataChart data={allData} loading={loading} error={error} />
            </Box>
            <Box sx={{ mt: 4 }}>
              <DataTable data={allData} loading={loading} error={error} />
            </Box>
          </>
        );
    }
  };

  if (loading && !latestData) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        gap: 2
      }}>
        <CircularProgress size={80} />
        <Typography variant="h6" color="textSecondary">
          Memuat data dashboard...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f9f5' }}>
      {/* Sidebar */}
      <Sidebar 
        open={sidebarOpen} 
        onClose={handleSidebarClose}
        onToggle={handleMenuToggle}
        onMenuClick={handleMenuClick}
        activeMenu={activeMenu}
      />

      {/* Main Content */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          width: '100%',
          minHeight: '100vh',
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          marginLeft: sidebarOpen && !isMobile ? '280px' : 0,
          width: sidebarOpen && !isMobile ? 'calc(100% - 280px)' : '100%'
        }}
      >
        {/* Dashboard Header (Bukan Navigation utama) */}
        <Box sx={{ 
          p: 3, 
          backgroundColor: 'white',
          borderBottom: '1px solid #e0e0e0',
        }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {isMobile && (
                <IconButton
                  onClick={handleMenuToggle}
                  sx={{
                    color: '#2E7D32',
                  }}
                >
                  <MenuIcon />
                </IconButton>
              )}
              <Typography variant="h4" sx={{ 
                fontWeight: 'bold',
                color: '#2E7D32',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                Dashboard Monitoring
                {user && (
                  <Tooltip title="Anda login sebagai Pengguna">
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        backgroundColor: '#e8f5e8',
                        color: '#2E7D32',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: '0.75rem'
                      }}
                    >
                      Pengguna
                    </Typography>
                  </Tooltip>
                )}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {lastUpdated && (
                <Typography variant="caption" color="#388E3C">
                  Terakhir update: {lastUpdated.toLocaleTimeString('id-ID')}
                </Typography>
              )}
              <Tooltip title="Refresh data">
                <IconButton 
                  onClick={handleRefresh} 
                  sx={{ color: '#2E7D32' }}
                  disabled={loading}
                >
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {error && (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: 1,
              mt: 2,
              p: 2,
              backgroundColor: '#ffebee',
              borderRadius: 1
            }}>
              <ErrorOutlineIcon color="error" />
              <Typography color="error">{error}</Typography>
            </Box>
          )}
        </Box>

        {/* Content */}
        <Box sx={{ p: 3 }}>
          {renderContent()}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;