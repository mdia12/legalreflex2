import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  TextField,
  Chip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { ArrowForward, ArrowBack, Business } from '@mui/icons-material';
import { FormData } from '../MultiStepForm';

interface Step2LegalFormProps {
  data: FormData;
  onUpdate: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const legalForms = [
  {
    type: 'SASU',
    name: 'SASU',
    fullName: 'Société par Actions Simplifiée Unipersonnelle',
    description: 'Idéale pour les entrepreneurs seuls',
    advantages: ['Responsabilité limitée', 'Statut d\'assimilé salarié', 'Souplesse de gestion'],
    minCapital: 1,
    recommended: ['solo'],
    complexity: 'Moyenne'
  },
  {
    type: 'EURL',
    name: 'EURL',
    fullName: 'Entreprise Unipersonnelle à Responsabilité Limitée',
    description: 'Alternative à la SASU pour les entrepreneurs seuls',
    advantages: ['Responsabilité limitée', 'Fiscalité avantageuse', 'Simple à gérer'],
    minCapital: 1,
    recommended: ['solo'],
    complexity: 'Faible'
  },
  {
    type: 'MICRO',
    name: 'Micro-entreprise',
    fullName: 'Régime micro-entrepreneur',
    description: 'Le plus simple pour commencer',
    advantages: ['Formalités simplifiées', 'Comptabilité allégée', 'Pas de TVA'],
    minCapital: 0,
    recommended: ['solo'],
    complexity: 'Très faible'
  },
  {
    type: 'SAS',
    name: 'SAS',
    fullName: 'Société par Actions Simplifiée',
    description: 'Parfaite pour les projets à plusieurs',
    advantages: ['Grande souplesse', 'Facilite les levées de fonds', 'Statut président'],
    minCapital: 1,
    recommended: ['team'],
    complexity: 'Élevée'
  },
  {
    type: 'SARL',
    name: 'SARL',
    fullName: 'Société à Responsabilité Limitée',
    description: 'Structure classique pour les associés',
    advantages: ['Encadrement juridique solide', 'Protection des associés', 'Fiscalité maîtrisée'],
    minCapital: 1,
    recommended: ['team'],
    complexity: 'Moyenne'
  },
  {
    type: 'SCI',
    name: 'SCI',
    fullName: 'Société Civile Immobilière',
    description: 'Spécialisée dans l\'immobilier',
    advantages: ['Gestion patrimoniale', 'Transmission facilitée', 'Fiscalité avantageuse'],
    minCapital: 1,
    recommended: ['solo', 'team'],
    complexity: 'Moyenne'
  }
];

const Step2LegalForm: React.FC<Step2LegalFormProps> = ({ 
  data, 
  onUpdate, 
  onNext, 
  onBack 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [selectedForm, setSelectedForm] = useState(data.legalForm || '');
  const [capital, setCapital] = useState(data.capital || 1);

  const handleFormSelect = (formType: string) => {
    setSelectedForm(formType);
    const form = legalForms.find(f => f.type === formType);
    if (form) {
      setCapital(Math.max(capital, form.minCapital));
      onUpdate({ 
        legalForm: formType,
        capital: Math.max(capital, form.minCapital)
      });
    }
  };

  const handleCapitalChange = (value: number) => {
    setCapital(value);
    onUpdate({ capital: value });
  };

  const getRecommendedForms = () => {
    return legalForms.filter(form => 
      form.recommended.includes(data.launchType || 'solo')
    );
  };

  const getOtherForms = () => {
    return legalForms.filter(form => 
      !form.recommended.includes(data.launchType || 'solo')
    );
  };

  const canProceed = selectedForm !== '';
  const selectedFormData = legalForms.find(f => f.type === selectedForm);

  return (
    <Box>
      <Typography 
        variant={isMobile ? "h5" : "h4"} 
        gutterBottom
        sx={{ mb: 3 }}
      >
        Choisissez votre forme juridique
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Sélectionnez la structure qui correspond le mieux à votre projet
      </Typography>

      {/* Formes recommandées */}
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        📌 Recommandées pour votre profil
      </Typography>
      
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {getRecommendedForms().map((form) => (
          <Grid item xs={12} md={6} lg={4} key={form.type}>
            <Card 
              variant="outlined"
              sx={{ 
                height: '100%',
                border: selectedForm === form.type ? '2px solid' : '1px solid',
                borderColor: selectedForm === form.type ? 'primary.main' : 'divider',
                backgroundColor: selectedForm === form.type ? 'primary.light' : 'background.paper'
              }}
            >
              <CardActionArea 
                onClick={() => handleFormSelect(form.type)}
                sx={{ height: '100%' }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Business sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {form.name}
                    </Typography>
                    <Chip 
                      label="Recommandée" 
                      size="small" 
                      color="success" 
                      sx={{ ml: 1 }}
                    />
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {form.description}
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    {form.advantages.slice(0, 2).map((advantage, index) => (
                      <Typography key={index} variant="body2" sx={{ fontSize: '0.85rem' }}>
                        ✓ {advantage}
                      </Typography>
                    ))}
                  </Box>
                  
                  <Typography variant="caption" color="text.secondary">
                    Capital minimum : {form.minCapital}€ • Complexité : {form.complexity}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Autres formes */}
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        💼 Autres options
      </Typography>
      
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {getOtherForms().map((form) => (
          <Grid item xs={12} md={6} lg={4} key={form.type}>
            <Card 
              variant="outlined"
              sx={{ 
                height: '100%',
                border: selectedForm === form.type ? '2px solid' : '1px solid',
                borderColor: selectedForm === form.type ? 'primary.main' : 'divider',
                backgroundColor: selectedForm === form.type ? 'primary.light' : 'background.paper',
                opacity: 0.8
              }}
            >
              <CardActionArea 
                onClick={() => handleFormSelect(form.type)}
                sx={{ height: '100%' }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Business sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="h6">
                      {form.name}
                    </Typography>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {form.description}
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    {form.advantages.slice(0, 2).map((advantage, index) => (
                      <Typography key={index} variant="body2" sx={{ fontSize: '0.85rem' }}>
                        ✓ {advantage}
                      </Typography>
                    ))}
                  </Box>
                  
                  <Typography variant="caption" color="text.secondary">
                    Capital minimum : {form.minCapital}€ • Complexité : {form.complexity}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Configuration du capital */}
      {selectedForm && selectedForm !== 'MICRO' && (
        <Card variant="outlined" sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              💰 Capital social
            </Typography>
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Le capital social représente les fonds apportés par les associés
            </Typography>
            
            <TextField
              label="Montant du capital (€)"
              type="number"
              value={capital}
              onChange={(e) => handleCapitalChange(Math.max(1, parseInt(e.target.value) || 1))}
              inputProps={{ 
                min: selectedFormData?.minCapital || 1 
              }}
              sx={{ maxWidth: 200 }}
            />
            
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              Minimum requis : {selectedFormData?.minCapital}€
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* Détails de la forme sélectionnée */}
      {selectedFormData && (
        <Card variant="outlined" sx={{ mb: 4, backgroundColor: 'success.light' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              ✅ {selectedFormData.fullName}
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>
                  Avantages :
                </Typography>
                {selectedFormData.advantages.map((advantage, index) => (
                  <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                    ✓ {advantage}
                  </Typography>
                ))}
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>
                  Caractéristiques :
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  📊 Complexité : {selectedFormData.complexity}
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  💰 Capital : {capital}€
                </Typography>
                <Typography variant="body2">
                  👥 Type : {data.launchType === 'solo' ? 'Entrepreneur seul' : 'Plusieurs associés'}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

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

export default Step2LegalForm;