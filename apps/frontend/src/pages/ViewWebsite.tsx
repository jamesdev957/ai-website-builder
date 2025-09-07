import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress, Container, Paper } from '@mui/material';
import { Website } from '@ai-website-builder/shared-types';
import { websiteApi } from '../services/api';
import ChatbotWidget from '../components/ChatbotWidget';

const ViewWebsite: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [viewData, setViewData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadWebsite();
    }
  }, [id]);

  const loadWebsite = async () => {
    try {
      const data = await websiteApi.viewWebsite(id!);
      setViewData(data);
    } catch (error) {
      console.error('Failed to load website:', error);
      setViewData({ error: 'Failed to load website' });
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

  if (!viewData) {
    return (
      <Container maxWidth="md" sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h3" gutterBottom>
          Website Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary">
          The requested website could not be found.
        </Typography>
      </Container>
    );
  }

  if (viewData.status === 'coming_soon') {
    return (
      <Container maxWidth="md" sx={{ textAlign: 'center', py: 8 }}>
        <Paper elevation={3} sx={{ p: 6, borderRadius: 3 }}>
          <Typography variant="h3" gutterBottom color="primary">
            🚀 Coming Soon
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.2rem' }}>
            This website is currently under development and will be available soon.
          </Typography>
        </Paper>
      </Container>
    );
  }

  if (viewData.error) {
    return (
      <Container maxWidth="md" sx={{ textAlign: 'center', py: 8 }}>
        <Paper elevation={3} sx={{ p: 6, borderRadius: 3 }}>
          <Typography variant="h3" gutterBottom color="error">
            ⚠️ Website Not Found
          </Typography>
          <Typography variant="body1" color="text.secondary">
            The requested website could not be found or is no longer available.
          </Typography>
        </Paper>
      </Container>
    );
  }

  const website: Website = viewData.website;

  return (
    <Box>
      {/* Website Header */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 6,
          mb: 4,
          background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            {website.name}
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.9, maxWidth: 800 }}>
            {website.description}
          </Typography>
        </Container>
      </Box>

      {/* Website Sections */}
      <Container maxWidth="lg" sx={{ pb: 4 }}>
        {website.sections.map((section, index) => (
          <Paper
            key={section._id || index}
            elevation={2}
            sx={{
              mb: 4,
              p: 4,
              borderRadius: 3,
              '&:hover': {
                boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
              },
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontWeight: 600, color: 'primary.main', mb: 3 }}
            >
              {section.sectionName}
            </Typography>
            <Box
              sx={{
                '& h1, & h2, & h3, & h4, & h5, & h6': {
                  fontWeight: 600,
                  mb: 2,
                },
                '& p': {
                  mb: 2,
                  lineHeight: 1.7,
                },
                '& ul, & ol': {
                  pl: 3,
                  mb: 2,
                },
                '& li': {
                  mb: 1,
                },
                '& .ql-editor': {
                  padding: 0,
                },
              }}
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          </Paper>
        ))}

        {website.sections.length === 0 && (
          <Paper elevation={2} sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
            <Typography variant="h5" color="text.secondary">
              Content coming soon...
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
              This website is being built with AI-powered content generation.
            </Typography>
          </Paper>
        )}
      </Container>

      {/* Chatbot Widget */}
      {website._id && <ChatbotWidget websiteId={website._id} />}
    </Box>
  );
};

export default ViewWebsite;