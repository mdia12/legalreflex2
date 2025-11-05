import React from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardActionArea,
  Box,
  Chip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Person, 
  ShoppingCart, 
  Construction, 
  Business, 
  Store, 
  Restaurant, 
  DirectionsCar,
  Home,
  MoreHoriz
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface ActivityCategory {
  slug: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  popular?: boolean;
  color: string;
}

const activityCategories: ActivityCategory[] = [
  {
    slug: 'freelance',
    title: 'Freelance',
    description: 'Services indépendants, consulting, expertise',
    icon: Person,
    popular: true,
    color: '#2196F3'
  },
  {
    slug: 'ecommerce',
    title: 'E-commerce',
    description: 'Vente en ligne, marketplace, dropshipping',
    icon: ShoppingCart,
    popular: true,
    color: '#4CAF50'
  },
  {
    slug: 'btp',
    title: 'BTP',
    description: 'Construction, rénovation, artisanat',
    icon: Construction,
    color: '#FF9800'
  },
  {
    slug: 'services-b2b',
    title: 'Services B2B',
    description: 'Services aux entreprises, SSII, conseil',
    icon: Business,
    popular: true,
    color: '#9C27B0'
  },
  {
    slug: 'commerce',
    title: 'Commerce',
    description: 'Boutique physique, retail, distribution',
    icon: Store,
    color: '#F44336'
  },
  {
    slug: 'restauration',
    title: 'Restauration',
    description: 'Restaurant, bar, food truck, traiteur',
    icon: Restaurant,
    color: '#795548'
  },
  {
    slug: 'transport',
    title: 'Auto & Transport',
    description: 'VTC, livraison, garage, concessionnaire',
    icon: DirectionsCar,
    color: '#607D8B'
  },
  {
    slug: 'sci',
    title: 'SCI',
    description: 'Société civile immobilière, gestion patrimoine',
    icon: Home,
    color: '#3F51B5'
  },
  {
    slug: 'autres',
    title: 'Autres',
    description: 'Activités spécialisées, secteurs spécifiques',
    icon: MoreHoriz,
    color: '#9E9E9E'
  }
];

const EntreprisePage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleCategoryClick = (slug: string) => {
    navigate(`/entreprise/${slug}`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
      {/* Header */}
      <Box sx={{ 
        textAlign: 'center', 
        mb: { xs: 4, md: 6 },
        px: { xs: 2, sm: 0 }
      }}>
        <Typography 
          variant={isMobile ? "h4" : "h3"} 
          component="h1" 
          gutterBottom
          sx={{ 
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
          }}
        >
          Créer votre entreprise
        </Typography>
        <Typography 
          variant={isMobile ? "subtitle1" : "h6"} 
          color="text.secondary" 
          sx={{ 
            mb: 2,
            fontSize: { xs: '1.1rem', sm: '1.25rem' }
          }}
        >
          Choisissez votre domaine d'activité pour commencer
        </Typography>
        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{ 
            fontSize: { xs: '0.9rem', sm: '1rem' }
          }}
        >
          Un parcours personnalisé selon votre secteur pour créer votre société en quelques étapes
        </Typography>
      </Box>

      {/* Categories Grid */}
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {activityCategories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Grid item xs={12} sm={6} md={4} key={category.slug}>
              <Card 
                sx={{ 
                  height: '100%',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 3
                  }
                }}
              >
                <CardActionArea 
                  onClick={() => handleCategoryClick(category.slug)}
                  sx={{ height: '100%', p: { xs: 2, md: 3 } }}
                >
                  <CardContent sx={{ textAlign: 'center', p: 0 }}>
                    {/* Popular badge */}
                    {category.popular && (
                      <Box sx={{ position: 'absolute', top: 12, right: 12 }}>
                        <Chip 
                          label="Populaire" 
                          size="small" 
                          color="primary"
                          variant="filled"
                        />
                      </Box>
                    )}
                    
                    {/* Icon */}
                    <Box
                      sx={{
                        width: { xs: 60, md: 80 },
                        height: { xs: 60, md: 80 },
                        borderRadius: '50%',
                        backgroundColor: category.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2
                      }}
                    >
                      <IconComponent 
                        sx={{ 
                          fontSize: { xs: 30, md: 40 }, 
                          color: 'white' 
                        }} 
                      />
                    </Box>

                    {/* Content */}
                    <Typography 
                      variant={isMobile ? "subtitle1" : "h6"} 
                      component="h3" 
                      gutterBottom
                      sx={{ 
                        fontSize: { xs: '1.1rem', md: '1.25rem' }
                      }}
                    >
                      {category.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        fontSize: { xs: '0.8rem', md: '0.875rem' },
                        lineHeight: 1.4
                      }}
                    >
                      {category.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Help section */}
      <Box sx={{ 
        mt: { xs: 4, md: 6 }, 
        textAlign: 'center', 
        p: { xs: 2, md: 3 }, 
        backgroundColor: 'grey.50', 
        borderRadius: 2,
        mx: { xs: 2, sm: 0 }
      }}>
        <Typography 
          variant={isMobile ? "subtitle1" : "h6"} 
          gutterBottom
          sx={{ 
            fontSize: { xs: '1.1rem', md: '1.25rem' }
          }}
        >
          Pas sûr de votre choix ?
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 2,
            fontSize: { xs: '0.8rem', md: '0.875rem' }
          }}
        >
          Notre équipe peut vous aider à identifier la forme juridique la plus adaptée à votre projet
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          justifyContent: 'center', 
          flexWrap: 'wrap',
          flexDirection: { xs: 'column', sm: 'row' }
        }}>
          <Card 
            sx={{ 
              cursor: 'pointer', 
              '&:hover': { backgroundColor: 'primary.light', color: 'white' },
              transition: 'all 0.3s ease',
              minWidth: { xs: '100%', sm: 'auto' }
            }}
          >
            <CardContent sx={{ p: { xs: 1.5, md: 2 } }}>
              <Typography 
                variant="body2"
                sx={{ 
                  fontSize: { xs: '0.8rem', md: '0.875rem' }
                }}
              >
                📞 Consultation gratuite
              </Typography>
            </CardContent>
          </Card>
          <Card 
            sx={{ 
              cursor: 'pointer', 
              '&:hover': { backgroundColor: 'primary.light', color: 'white' },
              transition: 'all 0.3s ease',
              minWidth: { xs: '100%', sm: 'auto' }
            }}
          >
            <CardContent sx={{ p: { xs: 1.5, md: 2 } }}>
              <Typography 
                variant="body2"
                sx={{ 
                  fontSize: { xs: '0.8rem', md: '0.875rem' }
                }}
              >
                💬 Chat en direct
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );
};

export default EntreprisePage;