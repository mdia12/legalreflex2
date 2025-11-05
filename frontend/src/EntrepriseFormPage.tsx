import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Container, useTheme, useMediaQuery } from '@mui/material';
import MultiStepForm from './MultiStepForm';

// Configuration des catégories
const categoryConfig = {
  freelance: {
    title: 'Freelance',
    description: 'Services indépendants, consulting, expertise',
    recommendedForms: ['SASU', 'EURL', 'MICRO'],
    specificSteps: ['activity_naf', 'professional_insurance']
  },
  ecommerce: {
    title: 'E-commerce',
    description: 'Vente en ligne, marketplace, dropshipping',
    recommendedForms: ['SASU', 'SAS', 'EURL'],
    specificSteps: ['vat_configuration', 'payment_setup']
  },
  btp: {
    title: 'BTP',
    description: 'Construction, rénovation, artisanat',
    recommendedForms: ['SARL', 'SASU', 'EURL'],
    specificSteps: ['decennale_insurance', 'qualification_pro']
  },
  'services-b2b': {
    title: 'Services B2B',
    description: 'Services aux entreprises, SSII, conseil',
    recommendedForms: ['SAS', 'SASU', 'SARL'],
    specificSteps: ['client_contracts', 'professional_insurance']
  },
  commerce: {
    title: 'Commerce',
    description: 'Boutique physique, retail, distribution',
    recommendedForms: ['SARL', 'SAS', 'EURL'],
    specificSteps: ['commercial_lease', 'inventory_management']
  },
  restauration: {
    title: 'Restauration',
    description: 'Restaurant, bar, food truck, traiteur',
    recommendedForms: ['SARL', 'SAS', 'EURL'],
    specificSteps: ['hygiene_training', 'alcohol_license']
  },
  transport: {
    title: 'Auto & Transport',
    description: 'VTC, livraison, garage, concessionnaire',
    recommendedForms: ['SASU', 'SARL', 'EURL'],
    specificSteps: ['transport_license', 'vehicle_registration']
  },
  sci: {
    title: 'SCI',
    description: 'Société civile immobilière, gestion patrimoine',
    recommendedForms: ['SCI'],
    specificSteps: ['real_estate_management', 'tax_optimization']
  },
  autres: {
    title: 'Autres',
    description: 'Activités spécialisées, secteurs spécifiques',
    recommendedForms: ['SAS', 'SASU', 'SARL', 'EURL'],
    specificSteps: ['activity_analysis', 'custom_requirements']
  }
};

const EntrepriseFormPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  if (!slug || !categoryConfig[slug as keyof typeof categoryConfig]) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Catégorie non trouvée
          </Typography>
          <Typography variant="body1" color="text.secondary">
            La catégorie demandée n'existe pas ou n'est plus disponible.
          </Typography>
        </Box>
      </Container>
    );
  }

  const config = categoryConfig[slug as keyof typeof categoryConfig];

  return (
    <Box>
      {/* En-tête spécifique à la catégorie */}
      <Box sx={{ 
        backgroundColor: 'primary.main', 
        color: 'white', 
        py: { xs: 1.5, md: 2 }
      }}>
        <Container maxWidth="md">
          <Typography 
            variant={isMobile ? "h6" : "h5"} 
            gutterBottom
            sx={{ 
              fontSize: { xs: '1.25rem', md: '1.5rem' }
            }}
          >
            {config.title}
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              opacity: 0.9,
              fontSize: { xs: '0.9rem', md: '1rem' }
            }}
          >
            {config.description}
          </Typography>
        </Container>
      </Box>

      {/* Formulaire multi-étapes */}
      <MultiStepForm categorySlug={slug} />
    </Box>
  );
};

export default EntrepriseFormPage;