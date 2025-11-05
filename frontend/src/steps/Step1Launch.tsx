import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Person, Groups, ArrowForward } from '@mui/icons-material';
import { FormData } from '../MultiStepForm';

interface Step1LaunchProps {
  data: FormData;
  onUpdate: (data: Partial<FormData>) => void;
  onNext: () => void;
}

const Step1Launch: React.FC<Step1LaunchProps> = ({ data, onUpdate, onNext }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [launchType, setLaunchType] = useState(data.launchType || '');

  const handleLaunchTypeSelect = (type: 'solo' | 'team') => {
    setLaunchType(type);
    onUpdate({ 
      launchType: type,
      hasCoFounder: type === 'team',
      teamSize: type === 'team' ? 2 : 1
    });
  };

  const canProceed = launchType !== '';

  return (
    <Box>
      <Typography 
        variant={isMobile ? "h5" : "h4"} 
        gutterBottom
        sx={{ mb: 3 }}
      >
        Comment lancez-vous votre entreprise ?
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Cette information nous aidera à personnaliser votre processus de création
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Option Solo */}
        <Grid item xs={12} md={6}>
          <Card 
            variant="outlined"
            sx={{ 
              height: '100%',
              border: launchType === 'solo' ? '2px solid' : '1px solid',
              borderColor: launchType === 'solo' ? 'primary.main' : 'divider',
              backgroundColor: launchType === 'solo' ? 'primary.light' : 'background.paper'
            }}
          >
            <CardActionArea 
              onClick={() => handleLaunchTypeSelect('solo')}
              sx={{ height: '100%', p: 3 }}
            >
              <CardContent sx={{ textAlign: 'center', p: 0 }}>
                <Person 
                  sx={{ 
                    fontSize: 60, 
                    color: launchType === 'solo' ? 'primary.main' : 'text.secondary',
                    mb: 2 
                  }} 
                />
                
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{ 
                    color: launchType === 'solo' ? 'primary.main' : 'text.primary',
                    fontWeight: launchType === 'solo' ? 'bold' : 'normal'
                  }}
                >
                  Je lance seul(e)
                </Typography>
                
                <Typography variant="body2" color="text.secondary">
                  Entreprise individuelle ou société unipersonnelle
                </Typography>
                
                <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
                  Plus simple à gérer, décisions rapides
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        {/* Option Équipe */}
        <Grid item xs={12} md={6}>
          <Card 
            variant="outlined"
            sx={{ 
              height: '100%',
              border: launchType === 'team' ? '2px solid' : '1px solid',
              borderColor: launchType === 'team' ? 'primary.main' : 'divider',
              backgroundColor: launchType === 'team' ? 'primary.light' : 'background.paper'
            }}
          >
            <CardActionArea 
              onClick={() => handleLaunchTypeSelect('team')}
              sx={{ height: '100%', p: 3 }}
            >
              <CardContent sx={{ textAlign: 'center', p: 0 }}>
                <Groups 
                  sx={{ 
                    fontSize: 60, 
                    color: launchType === 'team' ? 'primary.main' : 'text.secondary',
                    mb: 2 
                  }} 
                />
                
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{ 
                    color: launchType === 'team' ? 'primary.main' : 'text.primary',
                    fontWeight: launchType === 'team' ? 'bold' : 'normal'
                  }}
                >
                  Avec des associés
                </Typography>
                
                <Typography variant="body2" color="text.secondary">
                  Société avec plusieurs fondateurs
                </Typography>
                
                <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
                  Compétences partagées, risques répartis
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>

      {/* Informations selon le choix */}
      {launchType && (
        <Card variant="outlined" sx={{ mb: 4, backgroundColor: 'info.light' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {launchType === 'solo' ? '👤 Lancement en solo' : '👥 Lancement en équipe'}
            </Typography>
            
            {launchType === 'solo' ? (
              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  ✓ Formes juridiques recommandées : SASU, EURL, Micro-entreprise
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  ✓ Prise de décision simplifiée
                </Typography>
                <Typography variant="body2">
                  ✓ Formalités administratives réduites
                </Typography>
              </Box>
            ) : (
              <Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  ✓ Formes juridiques recommandées : SAS, SARL
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  ✓ Répartition des parts et des responsabilités
                </Typography>
                <Typography variant="body2">
                  ✓ Pacte d'associés à prévoir
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'flex-end',
        mt: 4,
        pt: 3,
        borderTop: '1px solid',
        borderColor: 'divider'
      }}>
        <Button
          onClick={onNext}
          endIcon={<ArrowForward />}
          variant="contained"
          disabled={!canProceed}
          size="large"
        >
          Continuer
        </Button>
      </Box>
    </Box>
  );
};

export default Step1Launch;