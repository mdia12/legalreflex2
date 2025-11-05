import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Alert,
  LinearProgress,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  CheckCircle, 
  Download, 
  Email, 
  Home, 
  CalendarToday,
  Phone,
  Description,
  Business
} from '@mui/icons-material';

const EntrepriseSuccessPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Récupérer les données soumises
    const savedData = localStorage.getItem(`legalreflex-final-${slug}`);
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        setFormData(data);
      } catch (e) {
        console.error('Erreur lors de la récupération des données:', e);
      }
    }
    
    // Simulation de traitement
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [slug]);

  const nextSteps = [
    {
      title: 'Vérification de votre dossier',
      description: 'Nos experts vérifient la conformité de vos informations',
      status: 'completed',
      timeline: 'Immédiat'
    },
    {
      title: 'Dépôt légal',
      description: 'Enregistrement officiel auprès des organismes compétents',
      status: 'in-progress',
      timeline: '3-5 jours'
    },
    {
      title: 'Réception des documents',
      description: 'Kbis, statuts et autres documents officiels',
      status: 'pending',
      timeline: '7-10 jours'
    },
    {
      title: 'Activation des comptes',
      description: 'Comptes bancaires, URSSAF, impôts, etc.',
      status: 'pending',
      timeline: '10-15 jours'
    }
  ];

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 6 }}>
            <Box sx={{ mb: 3 }}>
              <LinearProgress />
            </Box>
            <Typography variant="h6" gutterBottom>
              Traitement de votre dossier en cours...
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Veuillez patienter pendant que nous finalisons votre demande
            </Typography>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* En-tête de succès */}
      <Card sx={{ mb: 4, backgroundColor: 'success.light', color: 'success.contrastText' }}>
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
          
          <Typography 
            variant={isMobile ? "h4" : "h3"} 
            gutterBottom
            sx={{ fontWeight: 'bold' }}
          >
            🎉 Félicitations !
          </Typography>
          
          <Typography variant="h6" gutterBottom>
            Votre dossier de création d'entreprise a été soumis avec succès
          </Typography>
          
          <Typography variant="body1" sx={{ maxWidth: 600, mx: 'auto' }}>
            Nous avons bien reçu votre demande de création pour{' '}
            <strong>{formData?.companyName || 'votre entreprise'}</strong>.
            Notre équipe d'experts va maintenant traiter votre dossier.
          </Typography>
        </CardContent>
      </Card>

      <Grid container spacing={4}>
        {/* Informations importantes */}
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                📋 Récapitulatif de votre demande
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Entreprise :
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {formData?.companyName}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Forme juridique :
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {formData?.legalForm}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Date de soumission :
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {new Date().toLocaleDateString('fr-FR')}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Numéro de dossier :
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    LR-{Date.now().toString().slice(-6)}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Prochaines étapes */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                🚀 Prochaines étapes
              </Typography>
              
              <Box sx={{ mt: 2 }}>
                {nextSteps.map((step, index) => (
                  <Box key={index} sx={{ display: 'flex', mb: 3, alignItems: 'flex-start' }}>
                    <Box sx={{ mr: 2 }}>
                      {step.status === 'completed' && (
                        <CheckCircle color="success" />
                      )}
                      {step.status === 'in-progress' && (
                        <Box sx={{ 
                          width: 24, 
                          height: 24, 
                          borderRadius: '50%', 
                          backgroundColor: 'warning.main',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Box sx={{ 
                            width: 8, 
                            height: 8, 
                            borderRadius: '50%', 
                            backgroundColor: 'white'
                          }} />
                        </Box>
                      )}
                      {step.status === 'pending' && (
                        <Box sx={{ 
                          width: 24, 
                          height: 24, 
                          borderRadius: '50%', 
                          border: '2px solid',
                          borderColor: 'grey.400'
                        }} />
                      )}
                    </Box>
                    
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" fontWeight="medium">
                        {step.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        {step.description}
                      </Typography>
                      <Typography variant="caption" color="primary.main">
                        📅 {step.timeline}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Actions rapides */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                📧 Restez informé
              </Typography>
              
              <Alert severity="info" sx={{ mb: 2 }}>
                Un email de confirmation a été envoyé à votre adresse
              </Alert>
              
              <Typography variant="body2" color="text.secondary">
                Vous recevrez des notifications à chaque étape du processus
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                🛠️ Actions rapides
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button
                  startIcon={<Download />}
                  variant="outlined"
                  fullWidth
                  size="small"
                >
                  Télécharger le récapitulatif
                </Button>
                
                <Button
                  startIcon={<Email />}
                  variant="outlined"
                  fullWidth
                  size="small"
                >
                  Envoyer par email
                </Button>
                
                <Button
                  startIcon={<CalendarToday />}
                  variant="outlined"
                  fullWidth
                  size="small"
                >
                  Programmer un suivi
                </Button>
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                📞 Besoin d'aide ?
              </Typography>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Notre équipe est là pour vous accompagner
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button
                  startIcon={<Phone />}
                  variant="contained"
                  fullWidth
                  size="small"
                  color="secondary"
                >
                  01 23 45 67 89
                </Button>
                
                <Button
                  startIcon={<Email />}
                  variant="outlined"
                  fullWidth
                  size="small"
                >
                  support@legalreflex.fr
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Actions finales */}
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Que souhaitez-vous faire maintenant ?
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            startIcon={<Home />}
            variant="outlined"
            onClick={() => navigate('/')}
          >
            Retour à l'accueil
          </Button>
          
          <Button
            startIcon={<Business />}
            variant="outlined"
            onClick={() => navigate('/entreprise')}
          >
            Créer une autre entreprise
          </Button>
          
          <Button
            startIcon={<Description />}
            variant="contained"
            color="secondary"
          >
            Découvrir nos autres services
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EntrepriseSuccessPage;