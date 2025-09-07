import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Container,
  Card,
  CardContent,
  CircularProgress,
  Alert,
} from '@mui/material';
import { websiteApi } from '../services/api';

const steps = ['Basic Information', 'Website Description', 'Additional Details'];

const CreateWebsite: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    otherDetails: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      await handleSubmit();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      
      // Generate suggestion when moving to step 3 (Additional Details)
      if (activeStep === 1 && formData.name && formData.description) {
        setLoading(true);
        try {
          const response = await websiteApi.generateSuggestedDetails({
            name: formData.name,
            description: formData.description,
          });
          setSuggestion(response.suggestion);
        } catch (error) {
          console.error('Failed to generate suggestions:', error);
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const website = await websiteApi.createWebsite(formData);
      navigate(`/edit/${website._id}`);
    } catch (error) {
      console.error('Failed to create website:', error);
      setErrors({ submit: 'Failed to create website. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (activeStep === 0 && !formData.name.trim()) {
      newErrors.name = 'Website name is required';
    }
    if (activeStep >= 1 && !formData.description.trim()) {
      newErrors.description = 'Website description is required';
    }
    if (activeStep >= 2 && !formData.otherDetails.trim()) {
      newErrors.otherDetails = 'Additional details are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              What's your website name?
            </Typography>
            <TextField
              fullWidth
              label="Website Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={!!errors.name}
              helperText={errors.name || 'Choose a memorable name for your website'}
              variant="outlined"
              sx={{ mb: 2 }}
            />
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Describe your website
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Website Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              error={!!errors.description}
              helperText={errors.description || 'Tell us what your website is about and its main purpose'}
              variant="outlined"
              sx={{ mb: 2 }}
            />
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Additional Details
            </Typography>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                <CircularProgress />
                <Typography sx={{ ml: 2 }}>Generating AI suggestions...</Typography>
              </Box>
            ) : suggestion && (
              <Card sx={{ mb: 3, bgcolor: 'info.50', border: '1px solid', borderColor: 'info.200' }}>
                <CardContent>
                  <Typography variant="h6" color="info.main" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    💡 AI Suggestions
                  </Typography>
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                    {suggestion}
                  </Typography>
                </CardContent>
              </Card>
            )}
            <TextField
              fullWidth
              multiline
              rows={6}
              label="Additional Details"
              value={formData.otherDetails}
              onChange={(e) => setFormData({ ...formData, otherDetails: e.target.value })}
              error={!!errors.otherDetails}
              helperText={errors.otherDetails || 'Add any additional information, features, or requirements for your website'}
              variant="outlined"
            />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h3" component="h1" textAlign="center" gutterBottom sx={{ mb: 4, fontWeight: 700 }}>
          Create Your AI Website
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {errors.submit && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errors.submit}
          </Alert>
        )}

        <Box sx={{ minHeight: 300, mb: 4 }}>
          {renderStepContent(activeStep)}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
            sx={{ px: 4 }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={loading}
            sx={{ px: 4 }}
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : activeStep === steps.length - 1 ? (
              'Create Website'
            ) : (
              'Next'
            )}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateWebsite;