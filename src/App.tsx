import { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Container, Box, Typography, Paper } from '@mui/material'
import AddMealForm from './components/AddMealForm'
import MealsList from './components/MealsList'
import NutritionSummary from './components/NutritionSummary'

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
  const [meals, setMeals] = useState<Meal[]>([])

  const addMeal = (meal: Omit<Meal, 'id' | 'date'>) => {
    const newMeal = {
      ...meal,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    }
    setMeals([...meals, newMeal])
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Suivi Nutritionnel
          </Typography>
          
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <AddMealForm onAddMeal={addMeal} />
          </Paper>

          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <NutritionSummary meals={meals} />
          </Paper>

          <Paper elevation={3} sx={{ p: 3 }}>
            <MealsList meals={meals} />
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default App
