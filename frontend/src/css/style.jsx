import { keyframes } from '@mui/system';

// Animation for the features section
const fillLeftToRight = keyframes`
  0% { background-size: 0% 100%; }
  100% { background-size: 100% 100%; }
`;

export const styles = {
  // Page Container
  pageContainer: {
    p: { xs: 2, sm: 4, md: 6 },
    backgroundColor: '#fafafa',
    height: '100%',
  },

  // Header
  headerTitle: {
    fontWeight: 'bold',
    color: '#3f51b5',
    mb: 5,
    mt: 6,
  },
  headerIcon: {
    ml: 1,
    verticalAlign: 'middle',
  },
  headerSubtitle: {
    mb: 6,
  },

  // Section Title
  sectionTitle: {
    fontWeight: 'bold',
    mb: 3,
    color: '#303f9f',
  },

  // Dividers
  divider: {
    my: 6,
  },
  dividerLarge: {
    my: 10,
  },

  // Stat Cards
  statsGridContainer: {
    my: 6,
    px: { xs: 2, sm: 6 },
  },
  statCardWrapper: {
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-8px) scale(1.02)',
      boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
    },
  },
  statCard: {
    textAlign: 'center',
    py: 3,
    width: '200px',
  },
  statCount: {
    fontWeight: 'bold',
    color: '#1976d2',
  },
  statLabel: {
    color: 'text.secondary',
  },

  // Room Cards
  roomCardGridItem: {
    p: 0.5,
  },
  roomCard: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-8px) scale(1.02)',
      boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
    },
  },
  roomTitle: {
    fontWeight: 'bold',
    color: '#1a237e',
  },
  roomDescription: {
    mt: 1,
  },
  roomChipStack: {
    mt: 2,
    flexWrap: 'wrap',
  },
  roomChip: {
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#060707ff',
      color: 'white',
    },
  },

  // Parking Cards
  parkingGridContainer: {
    p: 3,
  },
  parkingCard: {
    p: 3,
    textAlign: 'center',
    borderRadius: 3,
    bgcolor: '#f5f7fb',
    width: '150px',
    transition: 'all 0.4s ease',
    cursor: 'pointer',
    '&:hover': {
      bgcolor: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
      boxShadow: '0px 8px 20px rgba(25, 118, 210, 0.4)',
      transform: 'translateY(-6px)',
    },
    '&:hover .MuiBox-root': {
      bgcolor: '#fff',
      color: '#1976d2',
    },
    '&:hover .MuiTypography-root': {
      color: '#1976d2',
    },
  },
  parkingIconBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bgcolor: '#1976d2',
    color: '#fff',
    width: 50,
    height: 50,
    borderRadius: '50%',
    mx: 'auto',
    mb: 2,
    transition: 'all 0.4s ease',
  },
  parkingLabel: {
    fontWeight: '600',
    transition: 'color 0.4s ease',
  },

  // Travel Hub Cards
  travelGridContainer: {
    p: { xs: 2, sm: 6 },
  },
  travelCard: {
    p: 3,
    display: 'flex',
    alignItems: 'center',
    borderLeft: '5px solid #1976d2',
    borderRadius: 2,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#fff',
    transition: 'color 0.4s, background 0.4s',
    cursor: 'pointer',
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      height: '100%',
      width: 0,
      background: 'linear-gradient(90deg, #1976d2 0%, #2196f3 100%)',
      zIndex: 0,
      transition: 'width 0.5s cubic-bezier(0.4,0,0.2,1)',
    },
    '&:hover::before': {
      width: '100%',
    },
    '&:hover, &:hover .travel-content, &:hover .travel-icon': {
      color: '#fff',
    },
    '& .travel-content': {
      position: 'relative',
      zIndex: 1,
      transition: 'color 0.4s',
    },
    '& .travel-icon': {
      color: '#1976d2',
      transition: 'color 0.4s',
      zIndex: 1,
      position: 'relative',
    },
  },
  travelLabel: {
    fontWeight: '600',
  },
  travelDistance: {
    color: 'inherit',
  },

  // Feature Cards
  featureCard: {
    textAlign: 'center',
    py: 4,
    mx: 4,
    width: '180px',
    position: 'relative',
    overflow: 'hidden',
    color: 'black',
    backgroundColor: 'transparent',
    backgroundImage: 'linear-gradient(to left,black 95%, blue 5%)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '0% 100%',
    backgroundPosition: 'left',
    transition: 'color 0.5s ease',
    '&:hover': {
      color: 'white',
      backgroundSize: '100% 100%',
      backgroundColor: '#6a6b6cff',
      animation: `${fillLeftToRight} 1.5s forwards ease-in-out`,
    },
    '& svg': {
      transition: 'color 0.5s ease',
      color: 'blue',
    },
    '&:hover svg': {
      color: 'white',
    },
  },
  featureLabel: {
    fontWeight: 600,
    mt: 1,
  },

  // Review Cards
  overallRatingCard: {
    p: 6,
    width: '400px',
    borderRadius: 3,
    textAlign: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-8px) scale(1.02)',
      boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
    },
  },
  overallRatingTitle: {
    fontWeight: '700',
    mb: 2,
    color: '#303f9f',
    letterSpacing: 0.5,
  },
  ratingCircleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    mb: 3,
    position: 'relative',
  },
  ratingCircle: {
    width: 90,
    height: 90,
    borderRadius: '50%',
    border: '6px solid #1976d2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.4s ease',
    '&:hover': {
      borderColor: '#2196f3',
    },
  },
  ratingValue: {
    fontWeight: '700',
    color: '#1976d2',
  },
  ratingStarsStack: {
    mb: 3,
  },
  reviewCard: {
    p: 4,
    width: '400px',
    minHeight: '50px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
    },
  },
  reviewerName: {
    fontWeight: '600',
  },
  reviewText: {
    mt: 1,
  },

  // Nearby Hotel Cards
  nearbyHotelCard: {
    borderRadius: 3,
    overflow: 'hidden',
    width: '320px',
  },
  nearbyHotelName: {
    fontWeight: '600',
  },
  nearbyHotelDistance: {
    color: 'text.secondary',
  },
  nearbyHotelRatingStack: {
    mt: 1,
  },

  // Footer
  footer: {
    bgcolor: '#3f51b5',
    color: '#fff',
    py: 4,
    width: 'auto',
    height: 'auto',
    px: { xs: 2, sm: 6, md: 12 },
    mt: 'auto',
  },
  footerTitleStack: {
    mb: 2,
  },
  footerIcon: {
    fontSize: 32,
    color: '#fcfcfbff',
  },
  footerTitle: {
    fontWeight: 'bold',
  },
  footerAboutText: {
    mb: 2,
    lineHeight: 1.7,
  },
  footerQuote: {
    fontStyle: 'italic',
    color: 'rgba(255,255,255,0.8)',
  },
  footerSectionHeading: {
    fontWeight: '600',
    mb: 2,
  },
  footerLink: {
    mb: 1,
    cursor: 'pointer',
    '&:hover': { color: '#ffca28' },
  },
  footerSocialIcon: {
    bgcolor: 'rgba(255,255,255,0.2)',
    color: '#fff',
    '&:hover': { bgcolor: '#ffca28', color: '#000' },
  },
  footerDivider: {
    my: 3,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  footerCopyright: {
    opacity: 0.8,
  },
};