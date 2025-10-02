import React from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import {
  Thermostat as ThermostatIcon,
  Water as WaterIcon,
  Air as AirIcon,
  Opacity as OpacityIcon,
  LocalDrink as LocalDrinkIcon,
  AcUnit as AcUnitIcon,
  Warning as WarningIcon
} from '@mui/icons-material';

const ParameterCards = ({ data }) => {
  const parameters = [
    {
      name: 'Suhu Ruang',
      value: data?.suhu_ruang || 'N/A',
      unit: '°C',
      icon: <AirIcon fontSize="large" />,
      color: '#9c27b0',
      threshold: { min: 25, max: 30 }
    },
    {
      name: 'Suhu Air Permukaan',
      value: data?.suhu_air_permukaan || 'N/A',
      unit: '°C',
      icon: <ThermostatIcon fontSize="large" />,
      color: '#1976d2',
      threshold: { min: 28, max: 32 }
    },
    {
      name: 'Suhu Air Dasar',
      value: data?.suhu_air_dasar || 'N/A',
      unit: '°C',
      icon: <WaterIcon fontSize="large" />,
      color: '#0288d1',
      threshold: { min: 28, max: 32 }
    },
    {
      name: 'Salinitas',
      value: data?.salinitas || 'N/A',
      unit: 'ppt',
      icon: <OpacityIcon fontSize="large" />,
      color: '#009688',
      threshold: { min: 15, max: 25 }
    },
    {
      name: 'Oksigen Terlarut',
      value: data?.oxygen || 'N/A',
      unit: 'mg/L',
      icon: <LocalDrinkIcon fontSize="large" />,
      color: '#4caf50',
      threshold: { min: 4, max: 8 }
    },
    {
      name: 'pH',
      value: data?.ph || 'N/A',
      unit: '',
      icon: <AcUnitIcon fontSize="large" />,
      color: '#ff9800',
      threshold: { min: 7.5, max: 8.5 }
    },
    {
      name: 'Amonia',
      value: data?.amonia || 'N/A',
      unit: 'mg/L',
      icon: <WarningIcon fontSize="large" />,
      color: '#f44336',
      threshold: { max: 0.5 }
    }
  ];

  const getStatus = (value, threshold) => {
    if (value === 'N/A') return 'default';
    if (threshold.min !== undefined && value < threshold.min) return 'error';
    if (threshold.max !== undefined && value > threshold.max) return 'error';
    return 'success';
  };

  return (
    <Grid container spacing={2}>
      {parameters.map((param, index) => (
        <Grid item xs={12} key={index}>
          <Card sx={{ 
            borderLeft: `4px solid ${param.color}`,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
            }
          }}>
            <CardContent sx={{ flexGrow: 1, py: 2, px: 3 }}>
              <Box display="flex" alignItems="flex-start" gap={2}>
                {/* Icon */}
                <Box sx={{ 
                  color: param.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mt: 0.5
                }}>
                  {param.icon}
                </Box>
                
                {/* Content */}
                <Box sx={{ flexGrow: 1 }}>
                  {/* Label/Nama Parameter */}
                  <Typography 
                    variant="h6" 
                    component="div" 
                    sx={{ 
                      fontWeight: 600,
                      color: '#2E7D32',
                      mb: 1
                    }}
                  >
                    {param.name}
                  </Typography>
                  
                  {/* Nilai dan Satuan */}
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1 }}>
                    <Typography 
                      variant="h4" 
                      component="div" 
                      sx={{ 
                        fontWeight: 'bold',
                        color: getStatus(param.value, param.threshold) === 'error' ? '#d32f2f' : '#333'
                      }}
                    >
                      {param.value}
                    </Typography>
                    <Typography 
                      variant="h5" 
                      component="span" 
                      sx={{ 
                        color: getStatus(param.value, param.threshold) === 'error' ? '#d32f2f' : '#666',
                        fontWeight: 500
                      }}
                    >
                      {param.unit}
                    </Typography>
                  </Box>
                  
                  {/* Status Indicator */}
                  {getStatus(param.value, param.threshold) === 'error' && (
                    <Typography 
                      variant="caption" 
                      color="error" 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        fontWeight: 500
                      }}
                    >
                      <WarningIcon fontSize="small" sx={{ mr: 0.5 }} />
                      {param.value < param.threshold?.min ? 'Nilai Terlalu Rendah' : 'Nilai Terlalu Tinggi'}
                    </Typography>
                  )}
                  
                  {getStatus(param.value, param.threshold) === 'success' && param.value !== 'N/A' && (
                    <Typography 
                      variant="caption" 
                      color="success" 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        fontWeight: 500
                      }}
                    >
                      Nilai Normal
                    </Typography>
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ParameterCards;