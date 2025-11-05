import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Paper, 
  Stepper, 
  Step, 
  StepLabel, 
  Box, 
  Button, 
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

// Import des composants d'étapes
import Step1Launch from './steps/Step1Launch';
import Step2LegalForm from './steps/Step2LegalForm';
import Step3Domiciliation from './steps/Step3Domiciliation';
import Step4CompanyIdentity from './steps/Step4CompanyIdentity';
import Step5Governance from './steps/Step5Governance';
import Step6FiscalSocial from './steps/Step6FiscalSocial';
import Step7Documents from './steps/Step7Documents';
import Step8Validation from './steps/Step8Validation';

// Types pour les données du formulaire
export interface FormData {
  // Step 1 - Launch
  launchType: 'solo' | 'team' | '';
  teamSize: number;
  hasCoFounder: boolean;
  
  // Step 2 - Legal Form
  legalForm: string;
  capital: number;
  shares: Array<{ name: string; percentage: number; }>;
  
  // Step 3 - Domiciliation
  domiciliationType: 'home' | 'office' | 'business_center' | 'virtual' | '';
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  
  // Step 4 - Company Identity
  companyName: string;
  activityDescription: string;
  nafCode: string;
  
  // Step 5 - Governance
  president: string;
  directors: Array<{ name: string; role: string; }>;
  
  // Step 6 - Fiscal & Social
  fiscalRegime: string;
  socialRegime: string;
  vatRegime: string;
  
  // Step 7 - Documents
  documents: Array<{ type: string; file: File; }>;
  
  // Step 8 - Validation
  agreedToTerms: boolean;
  signature: string;
}

const steps = [
  'Lancement',
  'Forme juridique',
  'Domiciliation',
  'Identité',
  'Gouvernance',
  'Fiscal & Social',
  'Documents',
  'Validation'
];

interface MultiStepFormProps {
  categorySlug: string;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({ categorySlug }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    launchType: '',
    teamSize: 1,
    hasCoFounder: false,
    legalForm: '',
    capital: 1,
    shares: [],
    domiciliationType: '',
    address: {
      street: '',
      city: '',
      postalCode: '',
      country: 'France'
    },
    companyName: '',
    activityDescription: '',
    nafCode: '',
    president: '',
    directors: [],
    fiscalRegime: '',
    socialRegime: '',
    vatRegime: '',
    documents: [],
    agreedToTerms: false,
    signature: ''
  });
  
  // Sauvegarde locale des données
  useEffect(() => {
    const savedData = localStorage.getItem(`legalreflex-form-${categorySlug}`);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(parsed);
      } catch (e) {
        console.error('Erreur lors du chargement des données sauvegardées:', e);
      }
    }
  }, [categorySlug]);
  
  useEffect(() => {
    localStorage.setItem(`legalreflex-form-${categorySlug}`, JSON.stringify(formData));
  }, [formData, categorySlug]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const updateFormData = (stepData: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...stepData }));
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Step1Launch 
            data={formData} 
            onUpdate={updateFormData}
            onNext={handleNext}
          />
        );
      case 1:
        return (
          <Step2LegalForm 
            data={formData} 
            onUpdate={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <Step3Domiciliation 
            data={formData} 
            onUpdate={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <Step4CompanyIdentity 
            data={formData} 
            onUpdate={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <Step5Governance 
            data={formData} 
            onUpdate={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 5:
        return (
          <Step6FiscalSocial 
            data={formData} 
            onUpdate={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 6:
        return (
          <Step7Documents 
            data={formData} 
            onUpdate={updateFormData}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 7:
        return (
          <Step8Validation 
            data={formData} 
            onUpdate={updateFormData}
            categorySlug={categorySlug}
          />
        );
      default:
        return <Typography>Étape inconnue</Typography>;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
      <Paper 
        elevation={1} 
        sx={{ 
          p: { xs: 2, md: 4 },
          borderRadius: 2
        }}
      >
        {/* Stepper */}
        <Stepper 
          activeStep={activeStep} 
          orientation={isMobile ? 'vertical' : 'horizontal'}
          sx={{ mb: 4 }}
        >
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>
                {isMobile && index === activeStep ? label : (isMobile ? '' : label)}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {/* Contenu de l'étape */}
        <Box sx={{ minHeight: '400px' }}>
          {renderStepContent(activeStep)}
        </Box>

        {/* Navigation (affichée seulement si l'étape ne gère pas sa propre navigation) */}
        {activeStep < 7 && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            mt: 3,
            pt: 2,
            borderTop: '1px solid',
            borderColor: 'divider'
          }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              startIcon={<ArrowBack />}
              variant="outlined"
            >
              Précédent
            </Button>
            
            <Button
              onClick={handleNext}
              endIcon={<ArrowForward />}
              variant="contained"
            >
              {activeStep === steps.length - 1 ? 'Terminer' : 'Suivant'}
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default MultiStepForm;
