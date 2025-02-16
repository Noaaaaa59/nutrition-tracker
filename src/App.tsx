import { useState, useEffect } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { 
  Container, 
  Box, 
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Dialog,
  IconButton,
  useMediaQuery,
  Divider,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from '@mui/material'
import {
  Today as TodayIcon,
  Restaurant as RestaurantIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  Add as AddIcon,
  QrCodeScanner as ScannerIcon,
  Edit as EditIcon,
} from '@mui/icons-material'
import AddMealForm from './components/AddMealForm'
import MealsList from './components/MealsList'
import NutritionGoals from './components/NutritionGoals'
import Calendar from './components/Calendar'
import Statistics from './components/Statistics'
import BarcodeScanner from './components/BarcodeScanner'
import RecipeManager from './components/RecipeManager'

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
})

function App() {
  const [meals, setMeals] = useState<Meal[]>(() => {
    const saved = localStorage.getItem('meals');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentTab, setCurrentTab] = useState(0);
  const [addMealOpen, setAddMealOpen] = useState(false);
  const [scannerOpen, setScannerOpen] = useState(false);
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

  const getDailyTotals = () => {
    return filteredMeals.reduce(
      (acc, meal) => ({
        calories: acc.calories + meal.calories,
        proteins: acc.proteins + meal.proteins,
        carbs: acc.carbs + meal.carbs,
        fats: acc.fats + meal.fats,
      }),
      { calories: 0, proteins: 0, carbs: 0, fats: 0 }
    );
  };

  const renderContent = () => {
    switch (currentTab) {
      case 0: // Journal
        return (
          <>
            <NutritionGoals progress={getDailyTotals()} />
            <Box sx={{ height: 16 }} />
            <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
              <Calendar 
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
              />
            </Paper>
            <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Repas du {selectedDate.toLocaleDateString()}
              </Typography>
              <MealsList meals={filteredMeals} />
            </Paper>
          </>
        );
      case 1: // Recettes
        return <RecipeManager />;
      case 2: // Statistiques
        return <Statistics meals={meals} />;
      case 3: // Paramètres
        return (
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Paramètres
            </Typography>
            {/* TODO: Ajouter les paramètres */}
          </Paper>
        );
      default:
        return null;
    }
  };

  const handleBarcodeScan = (code: string) => {
    // TODO: Rechercher les informations nutritionnelles à partir du code-barres
    console.log('Code-barres scanné:', code);
    setScannerOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container 
        maxWidth="sm" 
        sx={{ 
          pb: 7,
          minHeight: '100vh',
          bgcolor: theme.palette.grey[100]
        }}
      >
        <Box sx={{ pt: 2, pb: 8 }}>
          {renderContent()}
        </Box>
      </Container>

      {/* Actions rapides */}
      <SpeedDial
        ariaLabel="Actions rapides"
        sx={{ position: 'fixed', bottom: 80, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          icon={<AddIcon />}
          tooltipTitle="Ajouter un repas"
          onClick={() => setAddMealOpen(true)}
        />
        <SpeedDialAction
          icon={<ScannerIcon />}
          tooltipTitle="Scanner un code-barres"
          onClick={() => setScannerOpen(true)}
        />
      </SpeedDial>

      {/* Navigation */}
      <Paper 
        sx={{ 
          position: 'fixed', 
          bottom: 0, 
          left: 0, 
          right: 0,
          zIndex: theme.zIndex.appBar,
        }} 
        elevation={3}
      >
        <BottomNavigation
          value={currentTab}
          onChange={(_, newValue) => setCurrentTab(newValue)}
          showLabels
        >
          <BottomNavigationAction label="Journal" icon={<TodayIcon />} />
          <BottomNavigationAction label="Recettes" icon={<RestaurantIcon />} />
          <BottomNavigationAction label="Stats" icon={<AssessmentIcon />} />
          <BottomNavigationAction label="Réglages" icon={<SettingsIcon />} />
        </BottomNavigation>
      </Paper>

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
              <EditIcon />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <AddMealForm onAddMeal={addMeal} />
        </Box>
      </Dialog>

      {/* Dialog pour le scanner */}
      <Dialog
        fullScreen={isMobile}
        open={scannerOpen}
        onClose={() => setScannerOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Scanner un code-barres</Typography>
            <IconButton onClick={() => setScannerOpen(false)}>
              <EditIcon />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <BarcodeScanner onDetected={handleBarcodeScan} />
        </Box>
      </Dialog>
    </ThemeProvider>
  )
}

export default App
