import React from 'react';
import PropTypes from 'prop-types';
import { 
  DataGrid
} from '@mui/x-data-grid';
import { 
  Typography, 
  Box, 
  Chip,
  Alert,
  CircularProgress
} from '@mui/material';

const DataTable = ({ data = [], loading = false, error = null }) => {
  const getStatusChip = (value, threshold) => {
    if (value === null || value === undefined || value === 'N/A') return null;
    
    let label = 'Normal';
    let color = 'success';

    if (threshold.min !== undefined && value < threshold.min) {
      label = 'Rendah';
      color = 'error';
    } else if (threshold.max !== undefined && value > threshold.max) {
      label = 'Tinggi';
      color = 'warning';
    }

    return <Chip label={label} color={color} size="small" />;
  };

  // Konfigurasi threshold untuk setiap parameter
  const thresholdConfig = {
    suhu_air_permukaan: { min: 28, max: 32 },
    suhu_air_dasar: { min: 28, max: 32 },
    suhu_ruang: { min: 25, max: 30 },
    salinitas: { min: 15, max: 25 },
    oxygen: { min: 4, max: 8 },
    ph: { min: 7.5, max: 8.5 },
    amonia: { max: 0.5 }
  };

  const formatDateTime = (timestamp) => {
    if (!timestamp) return 'N/A';
    
    try {
      const date = new Date(timestamp);
      
      if (isNaN(date.getTime())) {
        return 'Invalid Date';
      }
      
      // Format: DD/MM/YYYY HH:MM:SS
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      
      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    } catch (error) {
      console.error('Error formatting date:', error, timestamp);
      return 'Invalid Date';
    }
  };

  const columns = [
    { 
      field: 'time', 
      headerName: 'Timestamp', 
      width: 180,
      flex: 1,
      valueFormatter: (params) => formatDateTime(params.value),
      renderCell: (params) => (
        <Typography variant="body2">
          {formatDateTime(params.value)}
        </Typography>
      )
    },
    { 
      field: 'suhu_ruang', 
      headerName: 'Suhu Ruang (°C)', 
      width: 150,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
          <Typography variant="body2" sx={{ minWidth: '50px' }}>
            {params.value !== null && params.value !== undefined ? params.value.toFixed(2) : 'N/A'}
          </Typography>
          {getStatusChip(params.value, thresholdConfig.suhu_ruang)}
        </Box>
      )
    },
    { 
      field: 'suhu_air_permukaan', 
      headerName: 'Suhu Permukaan (°C)', 
      width: 180,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
          <Typography variant="body2" sx={{ minWidth: '50px' }}>
            {params.value !== null && params.value !== undefined ? params.value.toFixed(2) : 'N/A'}
          </Typography>
          {getStatusChip(params.value, thresholdConfig.suhu_air_permukaan)}
        </Box>
      )
    },
    { 
      field: 'suhu_air_dasar', 
      headerName: 'Suhu Dasar (°C)', 
      width: 150,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
          <Typography variant="body2" sx={{ minWidth: '50px' }}>
            {params.value !== null && params.value !== undefined ? params.value.toFixed(2) : 'N/A'}
          </Typography>
          {getStatusChip(params.value, thresholdConfig.suhu_air_dasar)}
        </Box>
      )
    },
    { 
      field: 'salinitas', 
      headerName: 'Salinitas (ppt)', 
      width: 130,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
          <Typography variant="body2" sx={{ minWidth: '50px' }}>
            {params.value !== null && params.value !== undefined ? params.value.toFixed(2) : 'N/A'}
          </Typography>
          {getStatusChip(params.value, thresholdConfig.salinitas)}
        </Box>
      )
    },
    { 
      field: 'oxygen', 
      headerName: 'Oksigen (mg/L)', 
      width: 140,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
          <Typography variant="body2" sx={{ minWidth: '50px' }}>
            {params.value !== null && params.value !== undefined ? params.value.toFixed(2) : 'N/A'}
          </Typography>
          {getStatusChip(params.value, thresholdConfig.oxygen)}
        </Box>
      )
    },
    { 
      field: 'ph', 
      headerName: 'pH', 
      width: 100,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
          <Typography variant="body2" sx={{ minWidth: '50px' }}>
            {params.value !== null && params.value !== undefined ? params.value.toFixed(2) : 'N/A'}
          </Typography>
          {getStatusChip(params.value, thresholdConfig.ph)}
        </Box>
      )
    },
    { 
      field: 'amonia', 
      headerName: 'Amonia (mg/L)', 
      width: 140,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
          <Typography variant="body2" sx={{ minWidth: '50px' }}>
            {params.value !== null && params.value !== undefined ? params.value.toFixed(3) : 'N/A'}
          </Typography>
          {getStatusChip(params.value, thresholdConfig.amonia)}
        </Box>
      )
    },
  ];

  if (loading && data.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <CircularProgress />
        <Typography variant="body2" sx={{ ml: 2 }}>
          Memuat data tabel...
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="table-container">
      <Typography variant="h6" gutterBottom className="section-title">
        Data Table - 100 Data Terbaru
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {data.length === 0 && !loading ? (
        <Alert severity="info" sx={{ mb: 2 }}>
          Tidak ada data yang tersedia
        </Alert>
      ) : (
        <Box sx={{ 
          height: 500, 
          width: '100%',
          '& .MuiDataGrid-root': {
            border: 'none',
            borderRadius: '12px',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #f0f0f0',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f5f9f5',
            borderBottom: '2px solid #2E7D32',
            fontWeight: 'bold',
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: '1px solid #f0f0f0',
          },
        }}>
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            disableSelectionOnClick
            getRowId={(row) => row.id || `row-${row.time}-${Math.random()}`}
            loading={loading}
            sx={{
              '& .MuiDataGrid-row:hover': {
                backgroundColor: '#f5f9f5',
              },
              '& .MuiDataGrid-cell:focus': {
                outline: 'none',
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};

DataTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    time: PropTypes.string.isRequired,
    suhu_air_permukaan: PropTypes.number,
    suhu_air_dasar: PropTypes.number,
    suhu_ruang: PropTypes.number,
    salinitas: PropTypes.number,
    oxygen: PropTypes.number,
    ph: PropTypes.number,
    amonia: PropTypes.number,
  })),
  loading: PropTypes.bool,
  error: PropTypes.string
};

DataTable.defaultProps = {
  data: [],
  loading: false,
  error: null
};

export default DataTable;