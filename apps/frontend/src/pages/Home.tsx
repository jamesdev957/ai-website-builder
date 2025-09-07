import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import {
  AutoAwesome,
  Speed,
  Palette,
  Devices,
  ArrowForward,
  Dashboard,
} from '@mui/icons-material';

const features = [
  {
    icon: <AutoAwesome />,
    title: 'AI-Powered Generation',
    description: 'Leverage advanced AI to generate compelling content for every section of your website automatically.',
  },
  {
    icon: <Speed />,
    title: 'Lightning Fast',
    description: 'Create professional websites in minutes, not hours. Our streamlined process gets you online quickly.',
  },
  {
    icon: <Palette />,
    title: 'Beautiful Design',
    description: 'Modern, responsive designs that look great on every device. Fully customizable with our WYSIWYG editor.',
  },
  {
    icon: <Devices />,
    title: 'Mobile Optimized',
    description: 'All websites are automatically optimized for mobile devices with responsive design principles.',
  },
];

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: 4,
          color: 'white',
          mb: 6,
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Build Stunning Websites with AI
        </Typography>
        <Typography variant="h5" sx={{ mb: 4, opacity: 0.9, maxWidth: 600, mx: 'auto' }}>
          Create professional, AI-generated websites in minutes. No coding required, 
          just answer a few questions and watch your vision come to life.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/create')}
            endIcon={<ArrowForward />}
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              px: 4,
              py: 1.5,
              '&:hover': {
                bgcolor: 'grey.100',
                transform: 'translateY(-2px)',
              },
            }}
          >
            Create Your Website
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/dashboard')}
            endIcon={<Dashboard />}
            sx={{
              borderColor: 'white',
              color: 'white',
              px: 4,
              py: 1.5,
              '&:hover': {
                borderColor: 'white',
                bgcolor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            View Dashboard
          </Button>
        </Box>
      </Box>

      <Box sx={{ mb: 8 }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom sx={{ mb: 6 }}>
          Why Choose Our AI Website Builder?
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <CardContent sx={{ flex: 1, p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <IconButton
                      sx={{
                        bgcolor: 'primary.main',
                        color: 'white',
                        mr: 2,
                        '&:hover': { bgcolor: 'primary.dark' },
                      }}
                    >
                      {feature.icon}
                    </IconButton>
                    <Typography variant="h5" component="h3" sx={{ fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box
        sx={{
          textAlign: 'center',
          py: 6,
          bgcolor: 'grey.50',
          borderRadius: 3,
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
          Ready to Get Started?
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
          Join thousands of users who have created beautiful websites with our AI-powered platform.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/create')}
          endIcon={<ArrowForward />}
          sx={{ px: 4, py: 1.5 }}
        >
          Start Building Now
        </Button>
      </Box>
    </Container>
  );
};

export default Home;