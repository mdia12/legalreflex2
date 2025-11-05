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
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  ArrowForward, 
  ArrowBack, 
  Home, 
  Business,
  LocationCity,
  Cloud
} from '@mui/icons-material';
import { FormData } from '../MultiStepForm';

interface Step3DomiciliationProps {
  data: FormData;
  onUpdate: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const domiciliationOptions = [
  {
    type: 'home',
    title: 'À domicile',
    description: 'Utiliser votre adresse personnelle',
    icon: Home,
    advantages: ['Gratuit', 'Simple', 'Pas de frais'],
    disadvantages: ['Adresse personnelle publique', 'Possible restrictions selon logement']
  },
  {
    type: 'office',
    title: 'Local commercial',
    description: 'Bureaux ou local dédié',
    icon: Business,
    advantages: ['Adresse professionnelle', 'Crédibilité', 'Réunions clients'],
    disadvantages: ['Coût du loyer', 'Engagement long terme']
  },
  {
    type: 'business_center',
    title: 'Centre d\'affaires',
    description: 'Espace de coworking ou business center',
    icon: LocationCity,
    advantages: ['Flexibilité', 'Services inclus', 'Networking'],
    disadvantages: ['Coût mensuel', 'Moins de confidentialité']
  },
  {
    type: 'virtual',
    title: 'Domiciliation virtuelle',
    description: 'Adresse professionnelle sans local',
    icon: Cloud,
    advantages: ['Économique', 'Adresse prestigieuse', 'Services courrier'],
    disadvantages: ['Pas de local physique', 'Frais de domiciliation']
  }
];

const Step3Domiciliation: React.FC<Step3DomiciliationProps> = ({ 
  data, 
  onUpdate, 
  onNext, 
  onBack 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [domiciliationType, setDomiciliationType] = useState(data.domiciliationType || '');
  const [address, setAddress] = useState(data.address || {
    street: '',
    city: '',
    postalCode: '',
    country: 'France'
  });

  const handleTypeSelect = (type: string) => {
    setDomiciliationType(type as 'home' | 'office' | 'business_center' | 'virtual' | '');
    onUpdate({ domiciliationType: type as 'home' | 'office' | 'business_center' | 'virtual' | '' });
  };

  const handleAddressChange = (field: string, value: string) => {
    const newAddress = { ...address, [field]: value };
    setAddress(newAddress);
    onUpdate({ address: newAddress });
  };

  const canProceed = domiciliationType !== '' && 
                     address.street.trim() !== '' && 
                     address.city.trim() !== '' && 
                     address.postalCode.trim() !== '';

  const selectedOption = domiciliationOptions.find(opt => opt.type === domiciliationType);

  return (
    <Box>
      <Typography 
        variant={isMobile ? "h5" : "h4"} 
        gutterBottom
        sx={{ mb: 3 }}
      >
        Domiciliation de votre entreprise
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Choisissez où sera située officiellement votre entreprise
      </Typography>

      {/* Options de domiciliation */}
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        Type de domiciliation
      </Typography>
      
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {domiciliationOptions.map((option) => {
          const IconComponent = option.icon;
          return (
            <Grid item xs={12} md={6} key={option.type}>
              <Card 
                variant="outlined"
                sx={{ 
                  height: '100%',
                  border: domiciliationType === option.type ? '2px solid' : '1px solid',
                  borderColor: domiciliationType === option.type ? 'primary.main' : 'divider',
                  backgroundColor: domiciliationType === option.type ? 'primary.light' : 'background.paper'
                }}
              >
                <CardActionArea 
                  onClick={() => handleTypeSelect(option.type)}
                  sx={{ height: '100%' }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <IconComponent 
                        sx={{ 
                          mr: 1, 
                          fontSize: 28,
                          color: domiciliationType === option.type ? 'primary.main' : 'text.secondary'
                        }} 
                      />
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {option.title}
                      </Typography>
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {option.description}
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="success.main" sx={{ fontWeight: 'medium', mb: 0.5 }}>
                        Avantages :
                      </Typography>
                      {option.advantages.slice(0, 2).map((advantage, index) => (
                        <Typography key={index} variant="body2" sx={{ fontSize: '0.85rem' }}>
                          ✓ {advantage}
                        </Typography>
                      ))}
                    </Box>
                    
                    <Box>
                      <Typography variant="body2" color="warning.main" sx={{ fontWeight: 'medium', mb: 0.5 }}>
                        À considérer :
                      </Typography>
                      {option.disadvantages.slice(0, 1).map((disadvantage, index) => (
                        <Typography key={index} variant="body2" sx={{ fontSize: '0.85rem' }}>
                          ⚠ {disadvantage}
                        </Typography>
                      ))}
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Formulaire d'adresse */}
      {domiciliationType && (
        <Card variant="outlined" sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              📍 Adresse de domiciliation
            </Typography>
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Cette adresse apparaîtra sur tous vos documents officiels
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Adresse (rue, numéro)"
                  value={address.street}
                  onChange={(e) => handleAddressChange('street', e.target.value)}
                  placeholder="Ex: 123 Rue de la Paix"
                  required
                />
              </Grid>
              
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  label="Ville"
                  value={address.city}
                  onChange={(e) => handleAddressChange('city', e.target.value)}
                  placeholder="Ex: Paris"
                  required
                />
              </Grid>
              
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Code postal"
                  value={address.postalCode}
                  onChange={(e) => handleAddressChange('postalCode', e.target.value)}
                  placeholder="Ex: 75001"
                  required
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Pays"
                  value={address.country}
                  onChange={(e) => handleAddressChange('country', e.target.value)}
                  disabled
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Informations sur l'option sélectionnée */}
      {selectedOption && (
        <Card variant="outlined" sx={{ mb: 4, backgroundColor: 'info.light' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              ℹ️ {selectedOption.title} - Informations complémentaires
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom color="success.main">
                  Avantages :
                </Typography>
                {selectedOption.advantages.map((advantage, index) => (
                  <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                    ✓ {advantage}
                  </Typography>
                ))}
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom color="warning.main">
                  Points d'attention :
                </Typography>
                {selectedOption.disadvantages.map((disadvantage, index) => (
                  <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                    ⚠ {disadvantage}
                  </Typography>
                ))}
              </Grid>
            </Grid>

            {domiciliationType === 'home' && (
              <Box sx={{ mt: 2, p: 2, backgroundColor: 'warning.light', borderRadius: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                  💡 Conseil : Vérifiez que votre bail ou règlement de copropriété autorise une activité professionnelle
                </Typography>
              </Box>
            )}

            {domiciliationType === 'virtual' && (
              <Box sx={{ mt: 2, p: 2, backgroundColor: 'info.main', borderRadius: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 'medium', color: 'white' }}>
                  💼 Nous pouvons vous recommander des partenaires de domiciliation fiables
                </Typography>
              </Box>
            )}
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

export default Step3Domiciliation;