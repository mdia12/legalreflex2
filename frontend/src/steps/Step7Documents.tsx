import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  LinearProgress,
  useTheme,
  useMediaQuery,
  Alert
} from '@mui/material';
import { 
  CloudUpload, 
  Delete, 
  ArrowForward, 
  ArrowBack, 
  Description,
  CheckCircle,
  Error
} from '@mui/icons-material';
import { FormData } from '../MultiStepForm';

interface Step7DocumentsProps {
  data: FormData;
  onUpdate: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const requiredDocuments = [
  {
    type: 'IDENTITY',
    label: 'Pièce d\'identité du dirigeant',
    description: 'Carte d\'identité, passeport ou permis de conduire',
    required: true
  },
  {
    type: 'DOMICILIATION',
    label: 'Justificatif de domiciliation',
    description: 'Bail commercial, contrat de domiciliation ou attestation',
    required: true
  },
  {
    type: 'BANK_DEPOSIT',
    label: 'Attestation de dépôt de capital',
    description: 'Délivrée par la banque lors du dépôt des fonds',
    required: true
  },
  {
    type: 'STATUTES',
    label: 'Projet de statuts',
    description: 'Statuts rédigés (nous pouvons vous aider)',
    required: false
  },
  {
    type: 'DECLARATION',
    label: 'Déclaration de non-condamnation',
    description: 'Attestation sur l\'honneur du dirigeant',
    required: true
  }
];

const Step7Documents: React.FC<Step7DocumentsProps> = ({ 
  data, 
  onUpdate, 
  onNext, 
  onBack 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [documents, setDocuments] = useState(data.documents || []);
  const [uploading, setUploading] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState<string>('');

  const handleFileSelect = (documentType: string) => {
    setSelectedDocType(documentType);
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0 || !selectedDocType) return;

    const file = files[0];
    
    // Validation
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert('Le fichier est trop volumineux (max 5MB)');
      return;
    }

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      alert('Format non supporté. Utilisez PDF, JPG ou PNG');
      return;
    }

    setUploading(true);

    try {
      // Simulation d'upload - dans un vrai projet, envoyer vers un serveur
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newDocument = {
        type: selectedDocType,
        file: file
      };

      // Remplacer si le document existe déjà ou ajouter
      const updatedDocuments = documents.filter(doc => doc.type !== selectedDocType);
      updatedDocuments.push(newDocument);
      
      setDocuments(updatedDocuments);
      onUpdate({ documents: updatedDocuments });
      
    } catch (error) {
      console.error('Erreur lors de l\'upload:', error);
      alert('Erreur lors de l\'upload du fichier');
    } finally {
      setUploading(false);
      setSelectedDocType('');
    }
  };

  const removeDocument = (documentType: string) => {
    const updatedDocuments = documents.filter(doc => doc.type !== documentType);
    setDocuments(updatedDocuments);
    onUpdate({ documents: updatedDocuments });
  };

  const getDocumentStatus = (docType: string) => {
    return documents.find(doc => doc.type === docType);
  };

  const requiredDocsUploaded = requiredDocuments
    .filter(doc => doc.required)
    .every(doc => getDocumentStatus(doc.type));

  const canProceed = requiredDocsUploaded;

  return (
    <Box>
      <Typography 
        variant={isMobile ? "h5" : "h4"} 
        gutterBottom
        sx={{ mb: 3 }}
      >
        Documents requis
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Téléchargez les documents nécessaires pour finaliser votre dossier
      </Typography>

      {/* Input file caché */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        style={{ display: 'none' }}
        accept=".pdf,.jpg,.jpeg,.png"
      />

      {/* Barre de progression globale */}
      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="h6">
              Progression du dossier
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {documents.length} / {requiredDocuments.length} documents
            </Typography>
          </Box>
          
          <LinearProgress 
            variant="determinate" 
            value={(documents.length / requiredDocuments.length) * 100}
            sx={{ height: 8, borderRadius: 4 }}
          />
        </CardContent>
      </Card>

      {/* Liste des documents */}
      <Grid container spacing={3}>
        {requiredDocuments.map((docInfo) => {
          const uploadedDoc = getDocumentStatus(docInfo.type);
          const isUploaded = !!uploadedDoc;
          
          return (
            <Grid item xs={12} key={docInfo.type}>
              <Card 
                variant="outlined" 
                sx={{ 
                  borderColor: isUploaded ? 'success.main' : (docInfo.required ? 'warning.main' : 'divider'),
                  backgroundColor: isUploaded ? 'success.light' : 'background.paper'
                }}
              >
                <CardContent>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    gap: 2,
                    flexDirection: isMobile ? 'column' : 'row'
                  }}>
                    {/* Icône et statut */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {isUploaded ? (
                        <CheckCircle color="success" />
                      ) : (
                        <Description color={docInfo.required ? 'warning' : 'disabled'} />
                      )}
                      
                      {docInfo.required && (
                        <Chip 
                          label="Obligatoire" 
                          size="small" 
                          color="warning"
                          variant="outlined"
                        />
                      )}
                    </Box>

                    {/* Informations du document */}
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" gutterBottom>
                        {docInfo.label}
                      </Typography>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {docInfo.description}
                      </Typography>

                      {isUploaded && uploadedDoc && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Typography variant="body2" color="success.main">
                            ✓ {uploadedDoc.file.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            ({Math.round(uploadedDoc.file.size / 1024)} KB)
                          </Typography>
                        </Box>
                      )}
                    </Box>

                    {/* Actions */}
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        onClick={() => handleFileSelect(docInfo.type)}
                        startIcon={<CloudUpload />}
                        variant={isUploaded ? "outlined" : "contained"}
                        size="small"
                        disabled={uploading}
                      >
                        {isUploaded ? 'Remplacer' : 'Télécharger'}
                      </Button>
                      
                      {isUploaded && (
                        <IconButton 
                          onClick={() => removeDocument(docInfo.type)}
                          color="error"
                          size="small"
                        >
                          <Delete />
                        </IconButton>
                      )}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Indicateur d'upload en cours */}
      {uploading && (
        <Box sx={{ mt: 2 }}>
          <Alert severity="info">
            Téléchargement en cours...
          </Alert>
        </Box>
      )}

      {/* Informations importantes */}
      <Card variant="outlined" sx={{ mt: 3, backgroundColor: 'info.light' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            ℹ️ Informations importantes
          </Typography>
          
          <Typography variant="body2" sx={{ mb: 1 }}>
            • Formats acceptés : PDF, JPG, PNG (max 5MB par fichier)
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • Les documents doivent être lisibles et récents
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            • Vos données sont sécurisées et ne seront utilisées que pour votre dossier
          </Typography>
          <Typography variant="body2">
            • Besoin d'aide ? Contactez notre équipe
          </Typography>
        </CardContent>
      </Card>

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
          Valider et continuer
        </Button>
      </Box>

      {!canProceed && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          Veuillez télécharger tous les documents obligatoires pour continuer
        </Alert>
      )}
    </Box>
  );
};

export default Step7Documents;