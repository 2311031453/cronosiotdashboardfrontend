//LandingPage.jsx
import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Monitor, 
  TrendingUp, 
  Security,
  ArrowForward 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Import images
import Logo from '../assets/Logo.png';
import Gambar1 from '../assets/gambar1.jpg';
import Gambar2 from '../assets/gambar2.jpg';
import Gambar3 from '../assets/gambar3.jpg';

const LandingPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  const features = [
    {
      icon: <Monitor sx={{ fontSize: 40, color: '#2E7D32' }} />,
      title: 'Monitoring Real-time',
      description: 'Pantau kondisi tambak secara real-time dengan data yang selalu terupdate setiap saat.'
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40, color: '#2E7D32' }} />,
      title: 'Analisis Data',
      description: 'Dapatkan insight mendalam melalui grafik dan analisis data parameter kualitas air.'
    },
    {
      icon: <Security sx={{ fontSize: 40, color: '#2E7D32' }} />,
      title: 'Notifikasi Cepat',
      description: 'Dapatkan peringatan instan ketika parameter tambak berada di luar batas normal.'
    }
  ];

  return (
    <Box sx={{ flex: 1 }}>
      {/* Navigation */}
      <AppBar position="static" sx={{ 
        background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)',
        boxShadow: 'none'
      }}>
        <Toolbar>
          <Box
            component="img"
            src={Logo}
            alt="CRONOS Logo"
            sx={{
              height: 40,
              mr: 2
            }}
          />
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            CRONOS
          </Typography>
          <Button 
            color="inherit" 
            onClick={() => navigate('/login')}
            sx={{ mr: 2 }}
          >
            Masuk
          </Button>
          <Button 
            variant="outlined" 
            sx={{ 
              color: 'white', 
              borderColor: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)'
              }
            }}
            onClick={() => navigate('/register')}
          >
            Daftar
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box sx={{
        background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)',
        color: 'white',
        py: { xs: 8, md: 12 },
        px: 2,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center" justifyContent="center">
            <Grid item xs={12} lg={6}>
              <Box sx={{ textAlign: { xs: 'center', lg: 'left' } }}>
                <Typography 
                  variant="h2" 
                  component="h1" 
                  sx={{ 
                    fontWeight: 'bold',
                    mb: 3,
                    fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.5rem' },
                    lineHeight: 1.2
                  }}
                >
                  Crustacean Origin Network Oversight System
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 4, 
                    opacity: 0.9,
                    fontSize: { xs: '1rem', md: '1.25rem' },
                    maxWidth: '500px',
                    mx: { xs: 'auto', lg: 0 }
                  }}
                >
                  Pantau dan kelola kondisi tambak udang Anda secara real-time dengan teknologi IoT terdepan. Optimalkan produktivitas dengan data yang akurat.
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  flexWrap: 'wrap',
                  justifyContent: { xs: 'center', lg: 'flex-start' }
                }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/register')}
                    sx={{
                      backgroundColor: 'white',
                      color: '#2E7D32',
                      fontWeight: 'bold',
                      px: 4,
                      py: 1.5,
                      borderRadius: '12px',
                      '&:hover': {
                        backgroundColor: '#f5f5f5',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Mulai Sekarang
                    <ArrowForward sx={{ ml: 1 }} />
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Box
                component="img"
                src={Gambar1}
                alt="Monitoring Tambak"
                sx={{
                  width: '100%',
                  height: 'auto',
                  maxWidth: '600px',
                  borderRadius: '16px',
                  boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
                  display: 'block',
                  mx: 'auto',
                  transform: { lg: 'translateY(20px)' },
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: { lg: 'translateY(15px) scale(1.02)' }
                  }
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h3" 
            component="h2" 
            sx={{ 
              fontWeight: 'bold',
              mb: 2,
              color: '#2E7D32',
              fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' }
            }}
          >
            Fitur Unggulan
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'text.secondary',
              maxWidth: '600px',
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.1rem' }
            }}
          >
            Kelola tambak udang Anda dengan lebih efisien menggunakan teknologi monitoring terkini
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card sx={{ 
                height: '100%',
                border: 'none',
                borderRadius: '16px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 16px 48px rgba(46, 125, 50, 0.15)'
                }
              }}>
                <CardContent sx={{ 
                  textAlign: 'center', 
                  p: { xs: 3, md: 4 },
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                  <Box sx={{ 
                    mb: 3,
                    p: 2,
                    borderRadius: '12px',
                    backgroundColor: 'rgba(46, 125, 50, 0.1)',
                    display: 'inline-flex'
                  }}>
                    {feature.icon}
                  </Box>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 'bold',
                      color: '#2E7D32',
                      fontSize: { xs: '1.25rem', md: '1.5rem' }
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{
                      lineHeight: 1.6,
                      fontSize: { xs: '0.9rem', md: '1rem' }
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Image Gallery Section */}
      <Box sx={{ backgroundColor: '#f8f9fa', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography 
              variant="h3" 
              component="h2" 
              sx={{ 
                fontWeight: 'bold',
                mb: 2,
                color: '#2E7D32',
                fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' }
              }}
            >
              Galeri Tambak
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'text.secondary',
                maxWidth: '600px',
                mx: 'auto',
                fontSize: { xs: '1rem', md: '1.1rem' }
              }}
            >
              Lihat implementasi sistem monitoring di lokasi tambak
            </Typography>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            {[
              {
                image: Gambar2,
                title: 'Tambak Udang Modern',
                description: 'Implementasi teknologi IoT dalam monitoring kualitas air tambak'
              },
              {
                image: Gambar3,
                title: 'Sistem Sensor Cerdas',
                description: 'Sensor-sensor yang terpasang untuk memantau parameter kualitas air'
              },
              {
                image: Gambar1,
                title: 'Dashboard Real-time',
                description: 'Antarmuka monitoring yang user-friendly untuk pengguna'
              }
            ].map((item, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Card sx={{ 
                  border: 'none',
                  borderRadius: '16px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 16px 48px rgba(0,0,0,0.15)'
                  }
                }}>
                  <CardMedia
                    component="img"
                    height="280"
                    image={item.image}
                    alt={item.title}
                    sx={{ 
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)'
                      }
                    }}
                  />
                  <CardContent sx={{ p: 3 }}>
                    <Typography 
                      variant="h6" 
                      gutterBottom 
                      sx={{ 
                        fontWeight: 'bold',
                        color: '#2E7D32',
                        fontSize: '1.1rem'
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ lineHeight: 1.6 }}
                    >
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{
        background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
        color: 'white',
        py: { xs: 8, md: 12 },
        textAlign: 'center',
        position: 'relative'
      }}>
        <Container maxWidth="md">
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
              mb: 3
            }}
          >
            Siap Mengoptimalkan Tambak Anda?
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 5, 
              opacity: 0.9,
              fontSize: { xs: '1rem', md: '1.25rem' },
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6
            }}
          >
            Bergabunglah dengan pengguna lainnya yang telah menggunakan CRONOS untuk meningkatkan produktivitas dan efisiensi tambak udang
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/register')}
            sx={{
              backgroundColor: 'white',
              color: '#2E7D32',
              fontWeight: 'bold',
              px: 6,
              py: 1.5,
              fontSize: '1.1rem',
              borderRadius: '12px',
              '&:hover': {
                backgroundColor: '#f5f5f5',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Daftar Sekarang
            <ArrowForward sx={{ ml: 1 }} />
          </Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ backgroundColor: '#1B5E20', color: 'white', py: 4 }}>
        <Container maxWidth="lg">
          <Typography align="center" variant="body2" sx={{ opacity: 0.8 }}>
            © 2025 DRONILA - Crustacean Network Origin Oversight System. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;