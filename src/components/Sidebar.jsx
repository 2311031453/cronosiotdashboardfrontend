import React, { useState, useEffect } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Typography,
  Collapse,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  ShowChart as ChartIcon,
  TableChart as TableIcon,
  Science as ParameterIcon,
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
  ExpandLess,
  ExpandMore
} from '@mui/icons-material';

const Sidebar = ({ open, onClose, onMenuClick, activeMenu, onToggle }) => {
  const [menuOpen, setMenuOpen] = useState({
    parameters: true,
    charts: true,
    tables: true
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Inisialisasi state berdasarkan props
  useEffect(() => {
    // Pastikan state selalu sinkron dengan props
    if (!open && isMobile) {
      setMenuOpen({
        parameters: true,
        charts: true,
        tables: true
      });
    }
  }, [open, isMobile]);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <DashboardIcon />,
      children: null
    },
    {
      id: 'parameters',
      label: 'Parameter Monitoring',
      icon: <ParameterIcon />,
      children: [
        { id: 'parameters-cards', label: 'Parameter Cards' }
      ]
    },
    {
      id: 'charts',
      label: 'Data Charts',
      icon: <ChartIcon />,
      children: [
        { id: 'data-charts', label: 'All Charts' }
      ]
    },
    {
      id: 'tables',
      label: 'Data Tables',
      icon: <TableIcon />,
      children: [
        { id: 'data-table', label: 'Data Table' }
      ]
    }
  ];

  const handleMenuToggle = (menuId) => {
    setMenuOpen(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  const handleSubMenuClick = (menuId) => {
    onMenuClick(menuId);
    if (isMobile && onClose) {
      onClose();
    }
  };

  const handleMainMenuClick = (menuId) => {
    onMenuClick(menuId);
    if (isMobile && onClose) {
      onClose();
    }
  };

  const getDrawerVariant = () => {
    return isMobile ? "temporary" : "persistent";
  };

  // Jangan render apa pun jika hooks tidak konsisten
  if (!menuItems) return null;

  return (
    <>
      <Drawer
        variant={getDrawerVariant()}
        open={open}
        onClose={onClose}
        sx={{
          width: open ? 280 : 0,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
            background: 'linear-gradient(180deg, #2E7D32 0%, #1B5E20 100%)',
            color: 'white',
            border: 'none',
            overflowX: 'hidden',
            position: 'fixed',
            height: '100vh',
            top: 0,
            left: 0,
            ...(!isMobile && {
              position: 'fixed',
              height: '100vh'
            })
          },
        }}
      >
        {/* Header Sidebar */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          p: 2,
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
            CRONOS Menu
          </Typography>
          <IconButton 
            onClick={onClose} 
            sx={{ 
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
        </Box>

        {/* Menu Items */}
        <List sx={{ px: 1, py: 1, flex: 1 }}>
          {menuItems.map((item) => (
            <Box key={item.id}>
              {item.children ? (
                <>
                  <ListItem 
                    button 
                    onClick={() => handleMenuToggle(item.id)}
                    sx={{
                      borderRadius: '8px',
                      mb: 0.5,
                      '&:hover': {
                        backgroundColor: 'rgba(255,255,255,0.1)'
                      }
                    }}
                  >
                    <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.label} 
                      primaryTypographyProps={{ 
                        fontSize: '14px', 
                        fontWeight: 500,
                        color: 'rgba(255,255,255,0.9)'
                      }}
                    />
                    {menuOpen[item.id] ? 
                      <ExpandLess sx={{ color: 'rgba(255,255,255,0.7)' }} /> : 
                      <ExpandMore sx={{ color: 'rgba(255,255,255,0.7)' }} />
                    }
                  </ListItem>
                  <Collapse in={menuOpen[item.id]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.children.map((child) => (
                        <ListItem
                          key={child.id}
                          button
                          onClick={() => handleSubMenuClick(child.id)}
                          selected={activeMenu === child.id}
                          sx={{
                            pl: 4,
                            borderRadius: '8px',
                            mb: 0.5,
                            backgroundColor: activeMenu === child.id ? 'rgba(255,255,255,0.2)' : 'transparent',
                            '&:hover': {
                              backgroundColor: activeMenu === child.id ? 
                                'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.15)'
                            }
                          }}
                        >
                          <ListItemText 
                            primary={child.label} 
                            primaryTypographyProps={{ 
                              fontSize: '13px',
                              fontWeight: activeMenu === child.id ? 600 : 400,
                              color: activeMenu === child.id ? 'white' : 'rgba(255,255,255,0.8)'
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </>
              ) : (
                <ListItem
                  button
                  onClick={() => handleMainMenuClick(item.id)}
                  selected={activeMenu === item.id}
                  sx={{
                    borderRadius: '8px',
                    mb: 0.5,
                    backgroundColor: activeMenu === item.id ? 'rgba(255,255,255,0.2)' : 'transparent',
                    '&:hover': {
                      backgroundColor: activeMenu === item.id ? 
                        'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.15)'
                    }
                  }}
                >
                  <ListItemIcon sx={{ 
                    color: activeMenu === item.id ? 'white' : 'rgba(255,255,255,0.8)', 
                    minWidth: 40 
                  }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.label} 
                    primaryTypographyProps={{ 
                      fontSize: '14px',
                      fontWeight: activeMenu === item.id ? 600 : 500,
                      color: activeMenu === item.id ? 'white' : 'rgba(255,255,255,0.9)'
                    }}
                  />
                </ListItem>
              )}
            </Box>
          ))}
        </List>
      </Drawer>

      {/* Toggle Button untuk Desktop/Tablet */}
      {!open && !isMobile && (
        <Box
          sx={{
            position: 'fixed',
            top: 16,
            left: 16,
            zIndex: theme.zIndex.drawer + 1,
          }}
        >
          <IconButton
            onClick={onToggle}
            sx={{
              backgroundColor: '#2E7D32',
              color: 'white',
              '&:hover': {
                backgroundColor: '#1B5E20',
              },
              boxShadow: '0 2px 10px rgba(46, 125, 50, 0.3)',
            }}
            size="large"
          >
            <MenuIcon />
          </IconButton>
        </Box>
      )}
    </>
  );
};

export default Sidebar;