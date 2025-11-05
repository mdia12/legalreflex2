import React, { useState } from 'react';
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Add, Delete, ArrowForward, ArrowBack } from '@mui/icons-material';
import { FormData } from '../MultiStepForm';

interface Step5GovernanceProps {
  data: FormData;
  onUpdate: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step5Governance: React.FC<Step5GovernanceProps> = ({ 
  data, 
  onUpdate, 
  onNext, 
  onBack 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [president, setPresident] = useState(data.president || '');
  const [directors, setDirectors] = useState(data.directors || []);

  const handlePresidentChange = (value: string) => {
    setPresident(value);
    onUpdate({ president: value });
  };

  const addDirector = () => {
    const newDirectors = [...directors, { name: '', role: '' }];
    setDirectors(newDirectors);
    onUpdate({ directors: newDirectors });
  };

  const updateDirector = (index: number, field: 'name' | 'role', value: string) => {
    const newDirectors = directors.map((director, i) => 
      i === index ? { ...director, [field]: value } : director
    );
    setDirectors(newDirectors);
    onUpdate({ directors: newDirectors });
  };

  const removeDirector = (index: number) => {
    const newDirectors = directors.filter((_, i) => i !== index);
    setDirectors(newDirectors);
    onUpdate({ directors: newDirectors });
  };

  const canProceed = president.trim() !== '';

  return (
    <Box>
      <Typography 
        variant={isMobile ? "h5" : "h4"} 
        gutterBottom
        sx={{ mb: 3 }}
      >
        Gouvernance de l'entreprise
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Définissez la structure de direction de votre entreprise
      </Typography>

      <Grid container spacing={3}>
        {/* Président/Dirigeant */}
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Président / Dirigeant principal
              </Typography>
              
              <TextField
                fullWidth
                label="Nom et prénom du dirigeant"
                value={president}
                onChange={(e) => handlePresidentChange(e.target.value)}
                placeholder="Ex: Jean Dupont"
                required
                sx={{ mb: 2 }}
              />
              
              <Typography variant="body2" color="text.secondary">
                Cette personne sera le représentant légal de l'entreprise
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Autres dirigeants */}
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Autres dirigeants (optionnel)
                </Typography>
                <Button 
                  onClick={addDirector}
                  startIcon={<Add />}
                  variant="outlined"
                  size="small"
                >
                  Ajouter
                </Button>
              </Box>

              {directors.length === 0 ? (
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  Aucun autre dirigeant ajouté
                </Typography>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {directors.map((director, index) => (
                    <Box 
                      key={index}
                      sx={{ 
                        display: 'flex', 
                        gap: 2, 
                        alignItems: 'flex-start',
                        flexDirection: isMobile ? 'column' : 'row'
                      }}
                    >
                      <TextField
                        label="Nom et prénom"
                        value={director.name}
                        onChange={(e) => updateDirector(index, 'name', e.target.value)}
                        sx={{ flex: 1, minWidth: '200px' }}
                      />
                      
                      <TextField
                        label="Fonction"
                        value={director.role}
                        onChange={(e) => updateDirector(index, 'role', e.target.value)}
                        placeholder="Ex: Directeur commercial"
                        sx={{ flex: 1, minWidth: '200px' }}
                      />
                      
                      <IconButton 
                        onClick={() => removeDirector(index)}
                        color="error"
                        sx={{ mt: isMobile ? 0 : 1 }}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Informations légales */}
        <Grid item xs={12}>
          <Card variant="outlined" sx={{ backgroundColor: 'info.light', color: 'info.contrastText' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                ℹ️ Informations importantes
              </Typography>
              
              <Typography variant="body2" sx={{ mb: 1 }}>
                • Le dirigeant principal sera responsable légalement de l'entreprise
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                • Les autres dirigeants peuvent avoir des pouvoirs délégués
              </Typography>
              <Typography variant="body2">
                • Vous pourrez modifier cette structure après la création
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

export default Step5Governance;