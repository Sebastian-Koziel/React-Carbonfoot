import { Box, Container, Grid, Paper, Typography } from "@mui/material"
import PeopleIcon from '@mui/icons-material/People';
import ArticleIcon from '@mui/icons-material/Article';
import Co2Icon from '@mui/icons-material/Co2';
import InventoryIcon from '@mui/icons-material/Inventory';

const stats = [
    { icon: <PeopleIcon />, number: '4500+', label: 'Zarejestrowanych firm' },
    { icon: <ArticleIcon />, number: '225', label: 'Wygenerowanych raportów' },
    { icon: <Co2Icon />, number: '550+', label: 'dodanych wskaźników' },
    { icon: <InventoryIcon />, number: '123+', label: 'Produktów' },
  ];

const Numbers = () => {
    return (
        <Container sx={{
            display: "flex", justifyContent: "center"
        }}>
        <Paper elevation={4} sx={{ p: 3, borderRadius: 2, boxShadow: 3, width: "80%" }}>
          <Grid container spacing={4} justifyContent="space-around">
            {stats.map((stat, index) => (
              <Grid item key={index} xs={6} sm={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      mb: 1,
                      bgcolor: 'orange',
                      color: 'white',
                      borderRadius: '50%',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '60px',
                      height: '60px',
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Typography variant="h4" component="p" sx={{ fontWeight: 'bold' }}>
                    {stat.number}
                  </Typography>
                  <Typography variant="subtitle1">{stat.label}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>
        </Container>
      );
    };


export default Numbers