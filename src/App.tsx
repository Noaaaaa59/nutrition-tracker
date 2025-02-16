import { useState, useEffect } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { 
  Container, 
  Box, 
  Typography, 
  Paper,
  Fab,
  Dialog,
  IconButton,
  useMediaQuery,
  Divider
} from '@mui/material'
import {
  Add as AddIcon,
  Close as CloseIcon
} from '@mui/icons-material'
import AddMealForm from './components/AddMealForm'
import MealsList from './components/MealsList'
import NutritionSummary from './components/NutritionSummary'
import Calendar from './components/Calendar'
import Statistics from './components/Statistics'

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
  const [addMealOpen, setAddMealOpen] = useState(false);
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
    setAddMealOpen(false);
  }

  const filteredMeals = meals.filter(meal => 
    new Date(meal.date).toDateString() === selectedDate.toDateString()
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ pb: 7 }}>
        <Box sx={{ my: 2 }}>
          <Typography variant="h5" component="h1" gutterBottom align="center" sx={{ mb: 3 }}>
            Suivi Nutritionnel
          </Typography>
          
          {/* Calendrier */}
          <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
            <Calendar 
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />
          </Paper>

          {/* Résumé nutritionnel */}
          <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
            <NutritionSummary meals={filteredMeals} />
          </Paper>

          {/* Liste des repas */}
          <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Repas du {selectedDate.toLocaleDateString()}
            </Typography>
            <MealsList meals={filteredMeals} />
          </Paper>

          {/* Statistiques */}
          <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
            <Statistics meals={meals} />
          </Paper>
        </Box>
      </Container>

      {/* Bouton d'ajout flottant */}
      <Fab 
        color="primary" 
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => setAddMealOpen(true)}
      >
        <AddIcon />
      </Fab>

      {/* Dialog pour ajouter un repas */}
      <Dialog
        fullScreen={isMobile}
        open={addMealOpen}
        onClose={() => setAddMealOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Ajouter un repas</Typography>
            <IconButton onClick={() => setAddMealOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <AddMealForm onAddMeal={addMeal} />
        </Box>
      </Dialog>
    </ThemeProvider>
  )
}

export default App
