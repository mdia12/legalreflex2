import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
  Autocomplete,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { ArrowForward, ArrowBack, Business, Search } from '@mui/icons-material';
import { FormData } from '../MultiStepForm';

interface Step4CompanyIdentityProps {
  data: FormData;
  onUpdate: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

// Quelques codes NAF courants par secteur
const nafCodes = [
  { code: '6201Z', label: 'Programmation informatique' },
  { code: '6202A', label: 'Conseil en systèmes et logiciels informatiques' },
  { code: '7022Z', label: 'Conseil pour les affaires et autres conseils de gestion' },
  { code: '4791A', label: 'Vente à distance sur catalogue général' },
  { code: '4791B', label: 'Vente à distance sur catalogue spécialisé' },
  { code: '5610A', label: 'Restauration traditionnelle' },
  { code: '5610C', label: 'Restauration de type rapide' },
  { code: '4334Z', label: 'Travaux de peinture et vitrerie' },
  { code: '4312A', label: 'Travaux de terrassement courants et travaux préparatoires' },
  { code: '4120A', label: 'Construction de maisons individuelles' },
  { code: '4511Z', label: 'Commerce de voitures et de véhicules automobiles légers' },
  { code: '4520A', label: 'Entretien et réparation de véhicules automobiles légers' },
  { code: '6810Z', label: 'Activités des marchands de biens immobiliers' },
  { code: '6831Z', label: 'Agences immobilières' },
  { code: '4778C', label: 'Autres commerces de détail spécialisés divers' },
  { code: '9602A', label: 'Coiffure' },
  { code: '9602B', label: 'Soins de beauté' },
  { code: '8559A', label: 'Formation continue d\'adultes' },
  { code: '7111Z', label: 'Activités d\'architecture' },
  { code: '7490B', label: 'Activités spécialisées, scientifiques et techniques diverses' }
];

const Step4CompanyIdentity: React.FC<Step4CompanyIdentityProps> = ({ 
  data, 
  onUpdate, 
  onNext, 
  onBack 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [companyName, setCompanyName] = useState(data.companyName || '');
  const [activityDescription, setActivityDescription] = useState(data.activityDescription || '');
  const [nafCode, setNafCode] = useState(data.nafCode || '');

  const handleCompanyNameChange = (value: string) => {
    setCompanyName(value);
    onUpdate({ companyName: value });
  };

  const handleActivityChange = (value: string) => {
    setActivityDescription(value);
    onUpdate({ activityDescription: value });
  };

  const handleNafCodeChange = (value: string) => {
    setNafCode(value);
    onUpdate({ nafCode: value });
  };

  const canProceed = companyName.trim() !== '' && 
                     activityDescription.trim() !== '' && 
                     nafCode.trim() !== '';

  const selectedNafCode = nafCodes.find(code => code.code === nafCode);

  return (
    <Box>
      <Typography 
        variant={isMobile ? "h5" : "h4"} 
        gutterBottom
        sx={{ mb: 3 }}
      >
        Identité de votre entreprise
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Définissez le nom et l'activité principale de votre entreprise
      </Typography>

      <Grid container spacing={4}>
        {/* Nom de l'entreprise */}
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Business color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">
                  Nom de l'entreprise
                </Typography>
              </Box>
              
              <TextField
                fullWidth
                label="Dénomination sociale"
                value={companyName}
                onChange={(e) => handleCompanyNameChange(e.target.value)}
                placeholder="Ex: Innovation Tech Solutions"
                required
                sx={{ mb: 2 }}
              />
              
              <Typography variant="body2" color="text.secondary">
                💡 Conseils pour choisir un bon nom :
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                • Facile à prononcer et à retenir
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                • Disponible en nom de domaine
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                • Évoque votre activité ou vos valeurs
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Description de l'activité */}
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Description de votre activité
              </Typography>
              
              <TextField
                fullWidth
                label="Décrivez votre activité principale"
                value={activityDescription}
                onChange={(e) => handleActivityChange(e.target.value)}
                placeholder="Ex: Développement d'applications web et mobiles pour les PME"
                required
                multiline
                rows={3}
                sx={{ mb: 2 }}
              />
              
              <Typography variant="body2" color="text.secondary">
                Cette description aidera à déterminer votre code d'activité (NAF) et sera utilisée dans vos documents officiels.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Code NAF */}
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Search color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">
                  Code d'activité (NAF)
                </Typography>
              </Box>
              
              <Autocomplete
                options={nafCodes}
                getOptionLabel={(option) => `${option.code} - ${option.label}`}
                value={selectedNafCode || null}
                onChange={(event, newValue) => {
                  handleNafCodeChange(newValue?.code || '');
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Rechercher un code NAF"
                    placeholder="Tapez votre activité ou un code"
                    required
                  />
                )}
                sx={{ mb: 2 }}
              />
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Le code NAF (Nomenclature d'Activités Française) classifie votre activité principale.
              </Typography>
              
              <Typography variant="body2" color="info.main">
                💡 Ne trouvez pas votre activité ? Nous vous aiderons à identifier le bon code lors de la validation
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Récapitulatif */}
        {companyName && activityDescription && (
          <Grid item xs={12}>
            <Card variant="outlined" sx={{ backgroundColor: 'success.light' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  ✅ Récapitulatif de votre entreprise
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      Dénomination sociale :
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                      {companyName}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      Forme juridique :
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                      {data.legalForm}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" gutterBottom>
                      Activité principale :
                    </Typography>
                    <Typography variant="body1">
                      {activityDescription}
                    </Typography>
                  </Grid>
                  
                  {selectedNafCode && (
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" gutterBottom>
                        Code NAF :
                      </Typography>
                      <Typography variant="body1">
                        {selectedNafCode.code} - {selectedNafCode.label}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Informations légales */}
        <Grid item xs={12}>
          <Card variant="outlined" sx={{ backgroundColor: 'warning.light' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                ⚠️ Informations importantes
              </Typography>
              
              <Typography variant="body2" sx={{ mb: 1 }}>
                • Le nom choisi ne doit pas être déjà utilisé par une autre entreprise
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • Nous vérifierons la disponibilité avant l'enregistrement
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • Le code NAF détermine votre convention collective et certains régimes
              </Typography>
              <Typography variant="body2">
                • Ces informations peuvent être modifiées après la création (avec formalités)
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

export default Step4CompanyIdentity;