import React, { useState } from 'react';
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Button,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { ArrowForward, ArrowBack, AccountBalance, Receipt, Percent } from '@mui/icons-material';
import { FormData } from '../MultiStepForm';

interface Step6FiscalSocialProps {
  data: FormData;
  onUpdate: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step6FiscalSocial: React.FC<Step6FiscalSocialProps> = ({ 
  data, 
  onUpdate, 
  onNext, 
  onBack 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [fiscalRegime, setFiscalRegime] = useState(data.fiscalRegime || '');
  const [socialRegime, setSocialRegime] = useState(data.socialRegime || '');
  const [vatRegime, setVatRegime] = useState(data.vatRegime || '');

  const handleFiscalChange = (value: string) => {
    setFiscalRegime(value);
    onUpdate({ fiscalRegime: value });
  };

  const handleSocialChange = (value: string) => {
    setSocialRegime(value);
    onUpdate({ socialRegime: value });
  };

  const handleVatChange = (value: string) => {
    setVatRegime(value);
    onUpdate({ vatRegime: value });
  };

  const canProceed = fiscalRegime && socialRegime && vatRegime;

  return (
    <Box>
      <Typography 
        variant={isMobile ? "h5" : "h4"} 
        gutterBottom
        sx={{ mb: 3 }}
      >
        Régimes fiscal et social
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Choisissez les régimes qui correspondent le mieux à votre activité
      </Typography>

      <Grid container spacing={3}>
        {/* Régime fiscal */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccountBalance color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">
                  Régime fiscal
                </Typography>
              </Box>
              
              <FormControl component="fieldset" fullWidth>
                <RadioGroup
                  value={fiscalRegime}
                  onChange={(e) => handleFiscalChange(e.target.value)}
                >
                  <FormControlLabel 
                    value="IS" 
                    control={<Radio />} 
                    label={
                      <Box>
                        <Typography variant="body1" fontWeight="medium">
                          Impôt sur les Sociétés (IS)
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Taux fixe de 25% sur les bénéfices
                        </Typography>
                      </Box>
                    }
                  />
                  
                  <FormControlLabel 
                    value="IR" 
                    control={<Radio />} 
                    label={
                      <Box>
                        <Typography variant="body1" fontWeight="medium">
                          Impôt sur le Revenu (IR)
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Imposition selon le barème progressif
                        </Typography>
                      </Box>
                    }
                  />
                  
                  <FormControlLabel 
                    value="MICRO" 
                    control={<Radio />} 
                    label={
                      <Box>
                        <Typography variant="body1" fontWeight="medium">
                          Régime micro-entreprise
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Abattement forfaitaire selon l'activité
                        </Typography>
                      </Box>
                    }
                  />
                </RadioGroup>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        {/* Régime social */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Receipt color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">
                  Régime social
                </Typography>
              </Box>
              
              <FormControl component="fieldset" fullWidth>
                <RadioGroup
                  value={socialRegime}
                  onChange={(e) => handleSocialChange(e.target.value)}
                >
                  <FormControlLabel 
                    value="URSSAF" 
                    control={<Radio />} 
                    label={
                      <Box>
                        <Typography variant="body1" fontWeight="medium">
                          Régime général (URSSAF)
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Assimilé salarié - Protection sociale complète
                        </Typography>
                      </Box>
                    }
                  />
                  
                  <FormControlLabel 
                    value="RSI" 
                    control={<Radio />} 
                    label={
                      <Box>
                        <Typography variant="body1" fontWeight="medium">
                          Régime des indépendants
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Travailleur non salarié - Cotisations réduites
                        </Typography>
                      </Box>
                    }
                  />
                  
                  <FormControlLabel 
                    value="MICRO_SOCIAL" 
                    control={<Radio />} 
                    label={
                      <Box>
                        <Typography variant="body1" fontWeight="medium">
                          Micro-social simplifié
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Cotisations en pourcentage du CA
                        </Typography>
                      </Box>
                    }
                  />
                </RadioGroup>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        {/* Régime TVA */}
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Percent color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">
                  Régime de TVA
                </Typography>
              </Box>
              
              <FormControl component="fieldset" fullWidth>
                <RadioGroup
                  value={vatRegime}
                  onChange={(e) => handleVatChange(e.target.value)}
                  sx={{ 
                    display: 'flex', 
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: 2
                  }}
                >
                  <FormControlLabel 
                    value="FRANCHISE" 
                    control={<Radio />} 
                    label={
                      <Box>
                        <Typography variant="body1" fontWeight="medium">
                          Franchise en base
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Pas de TVA si CA &lt; seuils (recommandé au début)
                        </Typography>
                      </Box>
                    }
                    sx={{ flex: 1 }}
                  />
                  
                  <FormControlLabel 
                    value="REEL_SIMPLIFIE" 
                    control={<Radio />} 
                    label={
                      <Box>
                        <Typography variant="body1" fontWeight="medium">
                          Régime réel simplifié
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Déclaration annuelle de TVA
                        </Typography>
                      </Box>
                    }
                    sx={{ flex: 1 }}
                  />
                  
                  <FormControlLabel 
                    value="REEL_NORMAL" 
                    control={<Radio />} 
                    label={
                      <Box>
                        <Typography variant="body1" fontWeight="medium">
                          Régime réel normal
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Déclaration mensuelle de TVA
                        </Typography>
                      </Box>
                    }
                    sx={{ flex: 1 }}
                  />
                </RadioGroup>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        {/* Informations */}
        <Grid item xs={12}>
          <Card variant="outlined" sx={{ backgroundColor: 'warning.light', color: 'warning.contrastText' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                ⚠️ Important
              </Typography>
              
              <Typography variant="body2" sx={{ mb: 1 }}>
                • Ces choix peuvent être modifiés ultérieurement selon certaines conditions
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • Nous recommandons de consulter un expert-comptable pour optimiser votre fiscalité
              </Typography>
              <Typography variant="body2">
                • Les régimes micro sont soumis à des plafonds de chiffre d'affaires
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Navigation */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        mt: 4,
        pt: 3,
        borderTop: '1px solid',
        borderColor: 'divider'
      }}>
        <Button
          onClick={onBack}
          startIcon={<ArrowBack />}
          variant="outlined"
        >
          Précédent
        </Button>
        
        <Button
          onClick={onNext}
          endIcon={<ArrowForward />}
          variant="contained"
          disabled={!canProceed}
        >
          Suivant
        </Button>
      </Box>
    </Box>
  );
};

export default Step6FiscalSocial;