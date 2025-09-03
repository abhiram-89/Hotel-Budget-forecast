import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Divider, Chip, Stack, Rating, Avatar, IconButton } from '@mui/material';
import {
  Star as StarIcon, LocalDining as LocalDiningIcon, Spa as SpaIcon, Pool as PoolIcon, FitnessCenter as FitnessCenterIcon,
  Wifi as WifiIcon, RoomService as RoomServiceIcon, LocalParking as LocalParkingIcon, LocationOn as LocationOnIcon,
  AirportShuttle as AirportShuttleIcon, Train as TrainIcon, Nightlife as NightlifeIcon, Medication as MedicationIcon,
  Man3 as Man3Icon, Waves as WavesIcon, BeachAccess as BeachAccessIcon, FilterTiltShift as FilterTiltShiftIcon,
  MeetingRoom as MeetingRoomIcon, DirectionsBus as DirectionsBusIcon, EmojiTransportationRounded as EmojiTransportationRoundedIcon,
  EvStation as EvStationIcon, DirectionsCar as DirectionsCarIcon, TwoWheeler as TwoWheelerIcon, Flight as FlightIcon
} from '@mui/icons-material';
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

// Import assets
import deluxeRoom from '../assets/deluxe_room.jpg';
import executiveRoom from '../assets/executive_room.jpeg';
import presidentialRoom from '../assets/presidential_room.jpg';
import standardroom from '../assets/standardroom.jpg';
import family_room from '../assets/family_room.jpg';
import hotel1 from '../assets/hotel1.jpg';
import hotel2 from '../assets/hotel2.jpg';
import hotel3 from '../assets/hotel3.jpg';
import luxury_room from '../assets/luxury_room.jpg';
import { styles } from '../css/style';

//Data
const hotelFeatures = [
  { icon: <PoolIcon fontSize="large" color="primary" />, label: 'Infinity Pool' },
  { icon: <SpaIcon fontSize="large" color="primary" />, label: 'Spa & Wellness' },
  { icon: <FitnessCenterIcon fontSize="large" color="primary" />, label: 'Fitness Center' },
  { icon: <LocalDiningIcon fontSize="large" color="primary" />, label: 'Gourmet Dining' },
  { icon: <WifiIcon fontSize="large" color="primary" />, label: 'High-Speed WiFi' },
  { icon: <RoomServiceIcon fontSize="large" color="primary" />, label: '24/7 Room Service' },
  { icon: <NightlifeIcon fontSize="large" color="primary" />, label: 'Pub with Live Band' },
  { icon: <MedicationIcon fontSize="large" color="primary" />, label: 'Medication' },
  { icon: <MeetingRoomIcon fontSize="large" color="primary" />, label: 'Banquet Hall' },
  { icon: <WavesIcon fontSize="large" color="primary" />, label: 'Beach View' },
  { icon: <Man3Icon fontSize="large" color="primary" />, label: 'Butler Service' },
  { icon: <LocalParkingIcon fontSize="large" color="primary" />, label: 'Valet Parking' }
];

const roomTypes = [
  { title: "Deluxe Suite", description: "Spacious suite with city view, king bed, luxury amenities", image: deluxeRoom },
  { title: "Executive Room", description: "Modern room with workspace, smart tech, elegant decor", image: executiveRoom },
  { title: "Presidential Suite", description: "Panoramic views, private lounge, upscale services,Premium experience", image: presidentialRoom },
  { title: "Standard Room", description: "Basic Ambiance with Master Bed with Balcony and Wifi ", image: standardroom },
  { title: "Family Room", description: " Family room with Master Bed with Children bed and services ", image: family_room },
  { title: " Luxury Suite", description: " Luxury Suite room with 24/7 room service with Free Food and Luxury Scotches ", image: luxury_room },
];

const statistics = [
  { label: "Rooms", value: 300 },
  { label: "Restaurants", value: 5 },
  { label: "Awards", value: 12 },
  { label: "Events Hosted", value: 500 },
];

const reviews = [
  { name: "Abhi", avatar: "", rating: 5, text: "Exceptional service, beautiful rooms, and top-notch amenities!" },
  { name: "Jaya", avatar: "", rating: 4, text: "Great location and facilities. Will visit again." },
  { name: "Phani", avatar: "", rating: 5, text: "Absolutely loved the spa and the gourmet dining experience." },
  { name: "David", avatar: "", rating: 4, text: "Spacious rooms and friendly staff, but breakfast could be better." },
  { name: "Isabella", avatar: "", rating: 5, text: "A luxurious stay! The pool area was relaxing and well-maintained." },
  { name: "James", avatar: "", rating: 4, text: "Clean, modern, and close to attractions. Highly recommend." }
];

const nearbyHotels = [
  { name: "Cityview Inn", distance: "0.5 km", image: hotel1, rating: 4, reviews: 120 },
  { name: "The Urban Retreat", distance: "0.8 km", image: hotel2, rating: 3.5, reviews: 200 },
  { name: "Riverside Lodge", distance: "1.2 km", image: hotel3, rating: 2.5, reviews: 320 },
];

const travelDistances = [
  { icon: <FlightIcon color="secondary" />, label: 'International Airport', distance: '15 km' },
  { icon: <TrainIcon color="secondary" />, label: 'Central Station', distance: '2 km' },
  { icon: <DirectionsBusIcon color="secondary" />, label: 'Bus Complex', distance: '4.5 km' },
  { icon: <FilterTiltShiftIcon color="secondary" />, label: 'Center of Eternity', distance: '1 km' },
  { icon: <BeachAccessIcon color="secondary" />, label: 'Beach', distance: '7 km' },
];

const useCounter = (end, duration = 1500) => {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    let start = 0;
    const stepTime = Math.max(Math.floor(duration / end), 5);
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [end, duration]);
  return count;
};

const StatCard = ({ label, value }) => {
  const count = useCounter(value);
  return (
    <Card elevation={3} sx={styles.statCard}>
      <Typography variant="h4" sx={styles.statCount}>{count}</Typography>
      <Typography variant="subtitle1" sx={styles.statLabel}>{label}</Typography>
    </Card>
  );
};

export default function Dashboard() {
  return (
    <Box sx={styles.pageContainer}>
      {/* Header */}
      <Typography variant="h3" align="center" gutterBottom sx={styles.headerTitle}>
        <StarIcon color="secondary" sx={styles.headerIcon} />
        Grand Metropolitan Hotel
        <StarIcon color="secondary" sx={styles.headerIcon} />
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary" sx={styles.headerSubtitle}>
        Luxury Redefined – Experience Excellence
      </Typography>

      {/* Stats */}
      <Grid container spacing={6} justifyContent="center" sx={styles.statsGridContainer}>
        {statistics.map((s) => (
          <Grid item xs={6} lg={3} key={s.label}>
            <Box sx={styles.statCardWrapper}>
              <StatCard label={s.label} value={s.value} />
            </Box>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{my:10}} />

      {/* Rooms */}
      <Typography variant="h4" sx={styles.sectionTitle}>Room Types</Typography>
      <Grid container spacing={4} justifyContent="center">
        {roomTypes.map(({ title, description, image }) => (
          <Grid item xs={12} sm={6} md={4} key={title} width="360px" sx={styles.roomCardGridItem}>
            <Card elevation={5} sx={styles.roomCard}>
              <CardMedia component="img" height="180" image={image} alt={title} />
              <CardContent>
                <Typography variant="h6" sx={styles.roomTitle}>{title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={styles.roomDescription}>{description}</Typography>
                <Stack direction="row" spacing={1} sx={styles.roomChipStack}>
                  {["King Size Bed", "Free WiFi", "Room Service"].map((chip, i) => (
                    <Chip key={i} label={chip} color="primary" size="small" sx={styles.roomChip} />
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={styles.divider} />

      {/* Parking Options */}
      <Typography variant="h4" sx={styles.sectionTitle}>Parking Facilities</Typography>
      <Grid container spacing={4} sx={styles.parkingGridContainer} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Grid container spacing={3}>
            {[
              { icon: <LocalParkingIcon />, label: "Valet & Self-Parking" }, { icon: <EvStationIcon />, label: "EV Charging Stations" },
              { icon: <AirportShuttleIcon />, label: "Hotel Shuttle Service" }, { icon: <TwoWheelerIcon />, label: "Two Wheeler Parking" },
              { icon: <DirectionsCarIcon />, label: "Covered Parking Garriage" },
            ].map((p, i) => (
              <Grid item xs={6} key={i}>
                <Card elevation={4} sx={styles.parkingCard}>
                  <Box className="MuiBox-root" sx={styles.parkingIconBox}>{p.icon}</Box>
                  <Typography variant="subtitle1" sx={styles.parkingLabel}>{p.label}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Divider sx={styles.dividerLarge} />

      {/* Travel */}
      <Typography variant="h4" sx={styles.sectionTitle}>Nearby Travel Hubs</Typography>
      <Grid container spacing={4} sx={styles.travelGridContainer}>
        {travelDistances.map(({ icon, label, distance }) => (
          <Grid item xs={12} sm={6} key={label} width={'230px'}>
            <Card elevation={4} sx={styles.travelCard}>
              <Box className="travel-icon" sx={{ mr: 2 }}>{icon}</Box>
              <Box className="travel-content">
                <Typography variant="subtitle1" sx={styles.travelLabel}>{label}</Typography>
                <Typography variant="body2" color="text.secondary" sx={styles.travelDistance}>{distance}</Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={styles.divider} />

      {/* Features */}
      <Typography variant="h4" sx={styles.sectionTitle}>Exclusive Features</Typography>
      <Grid container spacing={3} justifyContent="center">
        {hotelFeatures.map(({ icon, label }) => (
          <Grid item xs={6} sm={4} md={3} key={label}>
            <Card elevation={4} sx={styles.featureCard}>
              {icon}
              <Typography variant="subtitle1" sx={styles.featureLabel}>{label}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={styles.dividerLarge} />

      {/* Reviews */}
      <Typography variant="h4" sx={styles.sectionTitle}>Guest Reviews</Typography>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={6} md={4} sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
          <Card elevation={6} sx={styles.overallRatingCard}>
            <Typography variant="h6" sx={styles.overallRatingTitle}>Overall Rating</Typography>
            <Box sx={styles.ratingCircleContainer}>
              <Box sx={styles.ratingCircle}>
                <Typography variant="h5" sx={styles.ratingValue}>4.5</Typography>
              </Box>
            </Box>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={styles.ratingStarsStack}>
              <Rating value={4.5} precision={0.5} readOnly size="large" />
              <Typography variant="body1" sx={{ fontWeight: "600" }}>4.5 / 5</Typography>
            </Stack>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={4} sx={{ p: 3, justifyContent: 'center' }}>
        {reviews.map((r, i) => (
          <Grid item xs={12} sm={6} key={i}>
            <Card elevation={3} sx={styles.reviewCard}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar src={r.avatar} />
                <Box>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography variant="subtitle1" sx={styles.reviewerName}>{r.name}</Typography>
                    <Rating value={r.rating} size="small" readOnly />
                  </Stack>
                  <Typography variant="body2" color="text.secondary" sx={styles.reviewText}>{r.text}</Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={styles.divider} />

      {/* Nearby hotels */}
      <Typography variant="h4" sx={styles.sectionTitle}>Nearby Hotels</Typography>
      <Grid container spacing={6} sx={{ p: 6, justifyContent: 'center' }} >
        {nearbyHotels.map((h, i) => (
          <Grid item xs={12} md={6} key={i}>
            <Card elevation={5} sx={styles.nearbyHotelCard}>
              <CardMedia component="img" height="200" image={h.image} alt={h.name} />
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center">
                  <LocationOnIcon color="secondary" />
                  <Box>
                    <Typography variant="subtitle1" sx={styles.nearbyHotelName}>{h.name}</Typography>
                    <Typography variant="body2" sx={styles.nearbyHotelDistance}>{h.distance} from property</Typography>
                    <Stack direction="row" spacing={1} alignItems="center" sx={styles.nearbyHotelRatingStack}>
                      <Rating value={h.rating} precision={0.5} size="small" readOnly />
                      <Typography variant="body2" color="text.secondary">({h.reviews} ratings)</Typography>
                    </Stack>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={styles.divider} />

      {/* Footer */}
      <Box component="footer" sx={styles.footer}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <Stack direction="row" alignItems="center" spacing={1} sx={styles.footerTitleStack}>
              <EmojiTransportationRoundedIcon sx={styles.footerIcon} />
              <Typography variant="h5" sx={styles.footerTitle}>Grand Metropolitan Plaza</Typography>
            </Stack>
            <Typography variant="body2" sx={styles.footerAboutText}>
              Nestled in the heart of the city, the Grand Metropolitan Hotel offers unparalleled luxury and sophistication. From elegant rooms to world-class dining and spa facilities, we make every stay unforgettable.
            </Typography>
            <Typography variant="body2" sx={styles.footerQuote}>"Where elegance meets comfort."</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={styles.footerSectionHeading}>Contact Us</Typography>
            <Typography variant="body2">📞 +1 234 567 890</Typography>
            <Typography variant="body2">✉️ info@grandmetro.com</Typography>
            <Typography variant="body2">📍 123 Luxury Lane, City Center</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={styles.footerSectionHeading}>Quick Links</Typography>
            {["Rooms & Suites", "Dining", "Spa & Wellness", "Events", "Book Now"].map((link, i) => (
              <Typography key={i} variant="body2" sx={styles.footerLink}>{link}</Typography>
            ))}
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={styles.footerSectionHeading}>Follow Us</Typography>
            <Stack direction="row" spacing={2}>
              {[FacebookIcon, InstagramIcon, TwitterIcon].map((Icon, i) => (
                <IconButton key={i} sx={styles.footerSocialIcon}><Icon /></IconButton>
              ))}
            </Stack>
          </Grid>
        </Grid>
        <Divider sx={styles.footerDivider} />
        <Typography variant="body2" align="center" sx={styles.footerCopyright}>
          © {new Date().getFullYear()} Grand Metropolitan Hotel. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}