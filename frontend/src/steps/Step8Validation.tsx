import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Alert,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { CheckCircle, Description, Send } from '@mui/icons-material';
import { FormData } from '../MultiStepForm';
import { useNavigate } from 'react-router-dom';

interface Step8ValidationProps {
  data: FormData;
  onUpdate: (data: Partial<FormData>) => void;
  categorySlug: string;
}

const Step8Validation: React.FC<Step8ValidationProps> = ({ 
  data, 
  onUpdate, 
  categorySlug 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  
  const [agreedToTerms, setAgreedToTerms] = useState(data.agreedToTerms || false);
  const [submitting, setSubmitting] = useState(false);

  const handleTermsChange = (checked: boolean) => {
    setAgreedToTerms(checked);
    onUpdate({ agreedToTerms: checked });
  };

  const handleSubmit = async () => {
    if (!agreedToTerms) return;
    
    setSubmitting(true);
    
    try {
      // Simulation de soumission - dans un vrai projet, envoyer vers l'API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Sauvegarder les données complètes
      const finalData = { ...data, agreedToTerms, submittedAt: new Date().toISOString() };
      localStorage.setItem(`legalreflex-final-${categorySlug}`, JSON.stringify(finalData));
      
      // Rediriger vers la page de succès
      navigate(`/entreprise/${categorySlug}/success`);
      
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      alert('Erreur lors de la soumission. Veuillez réessayer.');
    } finally {
      setSubmitting(false);
    }
  };

  // Vérification que toutes les données requises sont présentes
  const isDataComplete = data.launchType && 
                         data.legalForm && 
                         data.domiciliationType && 
                         data.address.street && 
                         data.companyName && 
                         data.activityDescription && 
                         data.president;

  return (
    <Box>
      <Typography 
        variant={isMobile ? "h5" : "h4"} 
        gutterBottom
        sx={{ mb: 3 }}
      >
        Validation et soumission
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Vérifiez vos informations avant de soumettre votre dossier
      </Typography>

      {/* Récapitulatif complet */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Informations générales */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                📋 Informations générales
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">Type de lancement :</Typography>
                <Typography variant="body2" fontWeight="medium">
                  {data.launchType === 'solo' ? 'Entrepreneur seul' : 'Avec associés'}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">Forme juridique :</Typography>
                <Typography variant="body2" fontWeight="medium">{data.legalForm}</Typography>
              </Box>
              
              {data.capital > 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">Capital social :</Typography>
                  <Typography variant="body2" fontWeight="medium">{data.capital}€</Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Identité entreprise */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                🏢 Identité de l'entreprise
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">Dénomination :</Typography>
                <Typography variant="body1" fontWeight="medium">{data.companyName}</Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">Activité :</Typography>
                <Typography variant="body2">{data.activityDescription}</Typography>
              </Box>
              
              {data.nafCode && (
                <Box>
                  <Typography variant="body2" color="text.secondary">Code NAF :</Typography>
                  <Typography variant="body2" fontWeight="medium">{data.nafCode}</Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Domiciliation */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                📍 Domiciliation
              </Typography>
              
              <Box sx={{ mb: 1 }}>
                <Typography variant="body2" color="text.secondary">Type :</Typography>
                <Typography variant="body2" fontWeight="medium">
                  {data.domiciliationType === 'home' && 'À domicile'}
                  {data.domiciliationType === 'office' && 'Local commercial'}
                  {data.domiciliationType === 'business_center' && 'Centre d\'affaires'}
                  {data.domiciliationType === 'virtual' && 'Domiciliation virtuelle'}
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="body2" color="text.secondary">Adresse :</Typography>
                <Typography variant="body2">
                  {data.address.street}<br/>
                  {data.address.postalCode} {data.address.city}<br/>
                  {data.address.country}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Gouvernance */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                👥 Gouvernance
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">Dirigeant principal :</Typography>
                <Typography variant="body1" fontWeight="medium">{data.president}</Typography>
              </Box>
              
              {data.directors && data.directors.length > 0 && (
                <Box>
                  <Typography variant="body2" color="text.secondary">Autres dirigeants :</Typography>
                  {data.directors.map((director, index) => (
                    <Typography key={index} variant="body2">
                      {director.name} - {director.role}
                    </Typography>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Régimes */}
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                📊 Régimes fiscal et social
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" color="text.secondary">Régime fiscal :</Typography>
                  <Typography variant="body2" fontWeight="medium">
                    {data.fiscalRegime || 'Non renseigné'}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" color="text.secondary">Régime social :</Typography>
                  <Typography variant="body2" fontWeight="medium">
                    {data.socialRegime || 'Non renseigné'}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Typography variant="body2" color="text.secondary">Régime TVA :</Typography>
                  <Typography variant="body2" fontWeight="medium">
                    {data.vatRegime || 'Non renseigné'}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Documents */}
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                📄 Documents
              </Typography>
              
              {data.documents && data.documents.length > 0 ? (
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {data.documents.length} document(s) téléchargé(s) :
                  </Typography>
                  {data.documents.map((doc, index) => (
                    <Typography key={index} variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                      <CheckCircle color="success" sx={{ fontSize: 16, mr: 1 }} />
                      {doc.file.name}
                    </Typography>
                  ))}
                </Box>
              ) : (
                <Typography variant="body2" color="warning.main">
                  Aucun document téléchargé
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Vérification des données */}
      {!isDataComplete && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography variant="body2">
            Certaines informations essentielles sont manquantes. Veuillez compléter toutes les étapes précédentes.
          </Typography>
        </Alert>
      )}

      {/* Conditions générales */}
      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Conditions générales
          </Typography>
          
          <FormControlLabel
            control={
              <Checkbox
                checked={agreedToTerms}
                onChange={(e) => handleTermsChange(e.target.checked)}
                color="primary"
              />
            }
            label={
              <Typography variant="body2">
                J'accepte les{' '}
                <Button variant="text" size="small" sx={{ p: 0, textDecoration: 'underline' }}>
                  conditions générales d'utilisation
                </Button>
                {' '}et la{' '}
                <Button variant="text" size="small" sx={{ p: 0, textDecoration: 'underline' }}>
                  politique de confidentialité
                </Button>
                . Je confirme que toutes les informations fournies sont exactes.
              </Typography>
            }
            sx={{ alignItems: 'flex-start' }}
          />
        </CardContent>
      </Card>

      {/* Bouton de soumission */}
      <Box sx={{ textAlign: 'center' }}>
        <Button
          onClick={handleSubmit}
          disabled={!agreedToTerms || !isDataComplete || submitting}
          variant="contained"
          size="large"
          startIcon={submitting ? <Description /> : <Send />}
          sx={{ 
            px: 4, 
            py: 1.5,
            fontSize: '1.1rem'
          }}
        >
          {submitting ? 'Soumission en cours...' : 'Soumettre le dossier'}
        </Button>
        
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Votre dossier sera traité dans les plus brefs délais
        </Typography>
      </Box>
    </Box>
  );
};

export default Step8Validation;