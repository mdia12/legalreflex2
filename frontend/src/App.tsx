import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar, Toolbar, Typography, Container, Box, Button, Grid, Paper, Card, CardContent } from '@mui/material';
import { Gavel, Psychology, Description, People } from '@mui/icons-material';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function HomePage() {
  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom>
                          🚀 LegalReflex Platform
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom color="text.secondary">
          Démocratiser l'accès aux services juridiques avec l'IA
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}>
          Plateforme innovante combinant intelligence artificielle et expertise humaine 
          pour offrir des solutions juridiques efficaces, accessibles et abordables.
        </Typography>
        <Box sx={{ gap: 2, display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="contained" size="large" color="primary">
            Commencer Gratuitement
          </Button>
          <Button variant="outlined" size="large">
            Voir la Démo
          </Button>
        </Box>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" gutterBottom textAlign="center" sx={{ mb: 6 }}>
          Nos Services
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} lg={3}>
            <Card sx={{ height: '100%', textAlign: 'center' }}>
              <CardContent>
                <Psychology sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" component="h3" gutterBottom>
                  IA Juridique
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Assistant intelligent 24/7 pour répondre à vos questions juridiques
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Card sx={{ height: '100%', textAlign: 'center' }}>
              <CardContent>
                <Description sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" component="h3" gutterBottom>
                  Documents
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Génération automatique de contrats et documents juridiques
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Card sx={{ height: '100%', textAlign: 'center' }}>
              <CardContent>
                <People sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" component="h3" gutterBottom>
                  Avocats
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Consultations avec des avocats experts vérifiés
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Card sx={{ height: '100%', textAlign: 'center' }}>
              <CardContent>
                <Gavel sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" component="h3" gutterBottom>
                  Dossiers
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Suivi complet de vos procédures juridiques
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Stats Section */}
      <Paper sx={{ p: 4, my: 8, backgroundColor: 'primary.main', color: 'white' }}>
        <Grid container spacing={4} textAlign="center">
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h3" component="div" gutterBottom>
              12.8B€
            </Typography>
            <Typography variant="body1">
              Marché français des services juridiques
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h3" component="div" gutterBottom>
              25%
            </Typography>
            <Typography variant="body1">
              Croissance annuelle du segment digital
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h3" component="div" gutterBottom>
              78%
            </Typography>
            <Typography variant="body1">
              PME avec difficultés d'accès juridique
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h3" component="div" gutterBottom>
              24/7
            </Typography>
            <Typography variant="body1">
              Assistance juridique disponible
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* CTA Section */}
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Prêt à Révolutionner Votre Approche Juridique ?
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Rejoignez les milliers d'utilisateurs qui font confiance à notre plateforme
        </Typography>
        <Button variant="contained" size="large" color="secondary">
          Commencer Maintenant
        </Button>
      </Box>
    </Container>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Gavel sx={{ mr: 2 }} />
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                LegalReflex
              </Typography>
              <Button color="inherit">Connexion</Button>
              <Button color="inherit">S'inscrire</Button>
            </Toolbar>
          </AppBar>
          
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
          
          {/* Footer */}
          <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6, mt: 8 }}>
            <Container maxWidth="lg">
              <Typography variant="body2" color="text.secondary" align="center">
                © 2025 LegalReflex Platform. Tous droits réservés.
              </Typography>
            </Container>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;