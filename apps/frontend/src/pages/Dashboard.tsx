import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  IconButton,
  Container,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Add, Edit, Visibility, Launch } from '@mui/icons-material';
import { Website } from '@ai-website-builder/shared-types';
import { websiteApi } from '../services/api';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [websites, setWebsites] = useState<Website[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadWebsites();
  }, []);

  const loadWebsites = async () => {
    try {
      const websitesData = await websiteApi.getAllWebsites();
      setWebsites(websitesData);
    } catch (error) {
      setError('Failed to load websites');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700 }}>
          My Websites
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/create')}
          size="large"
          sx={{ px: 3 }}
        >
          Create New Website
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {websites.length === 0 ? (
        <Card sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
          <Typography variant="h5" gutterBottom color="text.secondary">
            No websites yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Create your first AI-powered website to get started.
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate('/create')}
            size="large"
          >
            Create Your First Website
          </Button>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {websites.map((website) => (
            <Grid item xs={12} md={6} lg={4} key={website._id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardContent sx={{ flex: 1, p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="h6" component="h2" sx={{ fontWeight: 600, flex: 1 }}>
                      {website.name}
                    </Typography>
                    <Chip
                      label={website.status === 'published' ? 'Published' : 'Draft'}
                      color={website.status === 'published' ? 'success' : 'default'}
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                  
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      lineHeight: 1.5,
                    }}
                  >
                    {website.description}
                  </Typography>

                  <Typography variant="caption" color="text.secondary" sx={{ mb: 3, display: 'block' }}>
                    {website.sections.length} sections • Created {new Date(website.createdAt!).toLocaleDateString()}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
                    <Button
                      size="small"
                      startIcon={<Edit />}
                      onClick={() => navigate(`/edit/${website._id}`)}
                      variant="outlined"
                      fullWidth
                    >
                      Edit
                    </Button>
                    <IconButton
                      color="primary"
                      onClick={() => navigate(`/view/${website._id}`)}
                      sx={{ border: '1px solid', borderColor: 'divider' }}
                    >
                      <Visibility />
                    </IconButton>
                    {website.status === 'published' && (
                      <IconButton
                        color="success"
                        onClick={() => window.open(`/view/${website._id}`, '_blank')}
                        sx={{ border: '1px solid', borderColor: 'success.main' }}
                      >
                        <Launch />
                      </IconButton>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Dashboard;