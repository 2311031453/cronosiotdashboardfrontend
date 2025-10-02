import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Typography, Box, Grid, Alert, CircularProgress } from '@mui/material';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler
);

const parameterConfigs = [
  {
    name: 'Suhu Ruang',
    field: 'suhu_ruang',
    color: '#9c27b0',
    unit: '°C',
    min: 20,
    max: 35
  },
  {
    name: 'Suhu Air Permukaan',
    field: 'suhu_air_permukaan',
    color: '#1976d2',
    unit: '°C',
    min: 20,
    max: 35
  },
  {
    name: 'Suhu Air Dasar',
    field: 'suhu_air_dasar',
    color: '#0288d1',
    unit: '°C',
    min: 20,
    max: 35
  },
  {
    name: 'Salinitas',
    field: 'salinitas',
    color: '#009688',
    unit: 'ppt',
    min: 0,
    max: 40
  },
  {
    name: 'Oksigen Terlarut',
    field: 'oxygen',
    color: '#4caf50',
    unit: 'mg/L',
    min: 0,
    max: 10
  },
  {
    name: 'pH',
    field: 'ph',
    color: '#ff9800',
    unit: '',
    min: 6,
    max: 9
  },
  {
    name: 'Amonia',
    field: 'amonia',
    color: '#f44336',
    unit: 'mg/L',
    min: 0,
    max: 1
  }
];

const createChartData = (data, config) => {
  if (!data || !Array.isArray(data)) {
    return { labels: [], datasets: [] };
  }

  const sortedData = [...data].sort((a, b) => new Date(a.time) - new Date(b.time));
  
  const labels = sortedData.map(item => new Date(item.time));
  
  const dataset = {
    label: `${config.name} (${config.unit})`,
    data: sortedData.map(item => item[config.field] || 0),
    borderColor: config.color,
    backgroundColor: `${config.color}20`,
    tension: 0.3,
    fill: true,
    pointRadius: 2,
    pointHoverRadius: 5,
    pointBackgroundColor: config.color,
    borderWidth: 2
  };

  return { labels, datasets: [dataset] };
};

const chartOptions = (config) => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    x: {
      type: 'time',
      time: {
        unit: 'hour',
        displayFormats: {
          hour: 'HH:mm',
          day: 'MMM dd'
        }
      },
      title: {
        display: true,
        text: 'Waktu'
      },
      grid: {
        color: 'rgba(0,0,0,0.1)'
      }
    },
    y: {
      min: config.min,
      max: config.max,
      title: {
        display: true,
        text: config.unit
      },
      grid: {
        color: 'rgba(0,0,0,0.1)'
      }
    }
  },
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          let label = context.dataset.label || '';
          if (label) {
            label += ': ';
          }
          if (context.parsed.y !== null) {
            label += context.parsed.y.toFixed(2);
          }
          return label;
        },
        title: function(tooltipItems) {
          const date = new Date(tooltipItems[0].parsed.x);
          return date.toLocaleString('id-ID');
        }
      }
    }
  }
});

const SingleParameterChart = ({ data, config }) => {
  const chartData = createChartData(data, config);
  const isEmpty = !data || !Array.isArray(data) || data.length === 0;

  return (
    <Box sx={{ 
      backgroundColor: 'white',
      borderRadius: '12px',
      p: 3,
      boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
      height: '400px',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#2E7D32' }}>
        {config.name}
      </Typography>
      {isEmpty ? (
        <Box sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255,255,255,0.8)',
        }}>
          <Typography color="textSecondary">
            Tidak ada data
          </Typography>
        </Box>
      ) : (
        <Box sx={{ flexGrow: 1, minHeight: '300px' }}>
          <Line 
            data={chartData} 
            options={chartOptions(config)}
          />
        </Box>
      )}
    </Box>
  );
};

const DataChart = ({ data = [], loading = false, error = null }) => {
  if (loading && (!data || data.length === 0)) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
        <CircularProgress />
        <Typography variant="body2" sx={{ ml: 2 }}>
          Memuat data chart...
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="chart-container">
      <Typography variant="h6" gutterBottom className="section-title">
        Data Charts - 100 Data Terbaru
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {(!data || data.length === 0) && !loading ? (
        <Alert severity="info" sx={{ mb: 2 }}>
          Tidak ada data yang tersedia untuk ditampilkan
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {parameterConfigs.map((config, index) => (
            <Grid item xs={12} key={index}>
              <SingleParameterChart data={data} config={config} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default DataChart;