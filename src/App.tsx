import { useState, useEffect } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { 
  Container, 
  Box, 
  Typography, 
  Paper, 
  BottomNavigation, 
  BottomNavigationAction,
  SwipeableDrawer,
  IconButton,
  useMediaQuery
} from '@mui/material'
import {
  CalendarMonth as CalendarIcon,
  Add as AddIcon,
  Assessment as AssessmentIcon,
  Close as CloseIcon
} from '@mui/icons-material'
import AddMealForm from './components/AddMealForm'
import MealsList from './components/MealsList'
import NutritionSummary from './components/NutritionSummary'
import Calendar from './components/Calendar'

export type Meal = {
  id: string;
  name: string;
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
  date: string;
}

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          '@media (max-width: 600px)': {
            paddingLeft: 8,
            paddingRight: 8,
          },
        },
      },
    },
  },
})

function App() {
  const [meals, setMeals] = useState<Meal[]>(() => {
    const saved = localStorage.getItem('meals');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [navigation, setNavigation] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    localStorage.setItem('meals', JSON.stringify(meals));
  }, [meals]);

  const addMeal = (meal: Omit<Meal, 'id' | 'date'>) => {
    const newMeal = {
      ...meal,
      id: Date.now().toString(),
      date: selectedDate.toISOString(),
    }
    setMeals([...meals, newMeal]);
    if (isMobile) {
      setDrawerOpen(false);
    }
  }

  const filteredMeals = meals.filter(meal => 
    new Date(meal.date).toDateString() === selectedDate.toDateString()
  );

  const renderContent = () => {
    switch (navigation) {
      case 0: // Journal
        return (
          <>
            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
              <Calendar 
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
              />
            </Paper>
            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
              <NutritionSummary meals={filteredMeals} />
            </Paper>
            <Paper elevation={3} sx={{ p: 2, mb: 8 }}>
              <MealsList meals={filteredMeals} />
            </Paper>
          </>
        );
      case 1: // Ajouter
        if (isMobile) {
          return null; // Le formulaire sera dans le drawer pour mobile
        }
        return (
          <Paper elevation={3} sx={{ p: 2, mb: 8 }}>
            <AddMealForm onAddMeal={addMeal} />
          </Paper>
        );
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ pb: 7 }}>
        <Box sx={{ my: 2 }}>
          <Typography variant="h5" component="h1" gutterBottom align="center" sx={{ mb: 3 }}>
            Suivi Nutritionnel
          </Typography>
          
          {renderContent()}
        </Box>
      </Container>

      <SwipeableDrawer
        anchor="bottom"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onOpen={() => setDrawerOpen(true)}
        sx={{
          '& .MuiDrawer-paper': {
            height: '90%',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Ajouter un repas</Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <AddMealForm onAddMeal={addMeal} />
        </Box>
      </SwipeableDrawer>

      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          value={navigation}
          onChange={(_, newValue) => {
            setNavigation(newValue);
            if (newValue === 1 && isMobile) {
              setDrawerOpen(true);
            }
          }}
          showLabels
        >
          <BottomNavigationAction label="Journal" icon={<CalendarIcon />} />
          <BottomNavigationAction label="Ajouter" icon={<AddIcon />} />
          <BottomNavigationAction label="Statistiques" icon={<AssessmentIcon />} />
        </BottomNavigation>
      </Paper>
    </ThemeProvider>
  )
}

export default App
