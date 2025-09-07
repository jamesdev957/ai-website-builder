import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container, Box, AppBar, Toolbar, Typography } from '@mui/material';
import { Build } from '@mui/icons-material';
import Home from './pages/Home';
import CreateWebsite from './pages/CreateWebsite';
import EditWebsite from './pages/EditWebsite';
import ViewWebsite from './pages/ViewWebsite';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0} sx={{ mb: 4 }}>
        <Toolbar>
          <Build sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AI Website Builder
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateWebsite />} />
          <Route path="/edit/:id" element={<EditWebsite />} />
          <Route path="/view/:id" element={<ViewWebsite />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;