import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  CircularProgress,
  Alert,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Edit, Publish, Visibility, AutoAwesome } from '@mui/icons-material';
import { Website, AVAILABLE_SECTIONS } from '@ai-website-builder/shared-types';
import { websiteApi } from '../services/api';
import WysiwygEditor from '../components/WysiwygEditor';

const EditWebsite: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [website, setWebsite] = useState<Website | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState<string | null>(null);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      loadWebsite();
    }
  }, [id]);

  const loadWebsite = async () => {
    try {
      const websiteData = await websiteApi.getWebsite(id!);
      setWebsite(websiteData);
    } catch (error) {
      setError('Failed to load website');
    } finally {
      setLoading(false);
    }
  };

  const generateSection = async (sectionName: string) => {
    if (!website) return;

    setGenerating(sectionName);
    try {
      const response = await websiteApi.generateContentSection({
        websiteId: website._id!,
        section: sectionName,
      });
      
      // Update the website with the new section
      const updatedWebsite = { ...website };
      const existingIndex = updatedWebsite.sections.findIndex(s => s.sectionName === sectionName);
      
      if (existingIndex >= 0) {
        updatedWebsite.sections[existingIndex].content = response.content;
      } else {
        updatedWebsite.sections.push({
          sectionName,
          content: response.content,
          order: updatedWebsite.sections.length,
        });
      }
      
      setWebsite(updatedWebsite);
    } catch (error) {
      setError(`Failed to generate ${sectionName}`);
    } finally {
      setGenerating(null);
    }
  };

  const handleEditSection = (sectionName: string, content: string) => {
    setEditingSection(sectionName);
    setEditContent(content);
  };

  const saveEditedContent = async () => {
    if (!website || !editingSection) return;

    try {
      await websiteApi.updateSectionContent({
        websiteId: website._id!,
        sectionName: editingSection,
        newContent: editContent,
      });

      // Update local state
      const updatedWebsite = { ...website };
      const sectionIndex = updatedWebsite.sections.findIndex(s => s.sectionName === editingSection);
      if (sectionIndex >= 0) {
        updatedWebsite.sections[sectionIndex].content = editContent;
      }
      setWebsite(updatedWebsite);
      setEditingSection(null);
      setEditContent('');
    } catch (error) {
      setError('Failed to save content');
    }
  };

  const publishWebsite = async () => {
    if (!website) return;

    try {
      await websiteApi.publishWebsite({ websiteId: website._id! });
      setWebsite({ ...website, status: 'published' });
    } catch (error) {
      setError('Failed to publish website');
    }
  };

  const getSectionContent = (sectionName: string) => {
    return website?.sections.find(s => s.sectionName === sectionName)?.content || '';
  };

  const isSectionGenerated = (sectionName: string) => {
    return website?.sections.some(s => s.sectionName === sectionName) || false;
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (!website) {
    return (
      <Alert severity="error">
        Website not found. <Button onClick={() => navigate('/')}>Go Home</Button>
      </Alert>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
            {website.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {website.description}
          </Typography>
          <Chip
            label={website.status === 'published' ? 'Published' : 'Draft'}
            color={website.status === 'published' ? 'success' : 'default'}
            variant="outlined"
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<Visibility />}
            onClick={() => navigate(`/view/${website._id}`)}
          >
            Preview
          </Button>
          <Button
            variant="contained"
            startIcon={<Publish />}
            onClick={publishWebsite}
            disabled={website.status === 'published'}
          >
            {website.status === 'published' ? 'Published' : 'Publish'}
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
        Website Sections
      </Typography>

      <Grid container spacing={3}>
        {AVAILABLE_SECTIONS.map((section) => (
          <Grid item xs={12} md={6} key={section}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease-in-out',
                border: isSectionGenerated(section) ? '2px solid' : '1px solid',
                borderColor: isSectionGenerated(section) ? 'success.main' : 'divider',
                '&:hover': {
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <CardContent sx={{ flex: 1, p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  {section}
                </Typography>
                
                {isSectionGenerated(section) ? (
                  <Box>
                    <Typography variant="body2" color="success.main" sx={{ mb: 2, fontWeight: 500 }}>
                      ✓ Generated
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Button
                        size="small"
                        startIcon={<Edit />}
                        onClick={() => handleEditSection(section, getSectionContent(section))}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        startIcon={<AutoAwesome />}
                        onClick={() => generateSection(section)}
                        disabled={generating === section}
                        variant="outlined"
                      >
                        Regenerate
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Not generated yet
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={generating === section ? <CircularProgress size={16} /> : <AutoAwesome />}
                      onClick={() => generateSection(section)}
                      disabled={generating === section}
                      fullWidth
                    >
                      {generating === section ? 'Generating...' : 'Generate Section'}
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Edit Dialog */}
      <Dialog
        open={!!editingSection}
        onClose={() => setEditingSection(null)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { height: '80vh' } }}
      >
        <DialogTitle>
          Edit {editingSection}
        </DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', p: 0 }}>
          <WysiwygEditor
            value={editContent}
            onChange={setEditContent}
            height={400}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setEditingSection(null)}>Cancel</Button>
          <Button variant="contained" onClick={saveEditedContent}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EditWebsite;