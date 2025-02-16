import { Grid, Typography, Paper, Box } from '@mui/material';
import type { Meal } from '../App';

type NutritionSummaryProps = {
  meals: Meal[];
};

const NutritionSummary = ({ meals }: NutritionSummaryProps) => {
  const today = new Date().toISOString().split('T')[0];
  const todaysMeals = meals.filter(meal => meal.date.startsWith(today));

  const totals = todaysMeals.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.calories,
      proteins: acc.proteins + meal.proteins,
      carbs: acc.carbs + meal.carbs,
      fats: acc.fats + meal.fats,
    }),
    { calories: 0, proteins: 0, carbs: 0, fats: 0 }
  );

  const SummaryItem = ({ label, value, unit }: { label: string; value: number; unit: string }) => (
    <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
      <Typography variant="h6" color="primary">
        {value} {unit}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Paper>
  );

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Résumé du jour
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <SummaryItem 
              label="Calories" 
              value={Math.round(totals.calories)} 
              unit="kcal" 
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SummaryItem 
              label="Protéines" 
              value={Math.round(totals.proteins)} 
              unit="g" 
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SummaryItem 
              label="Glucides" 
              value={Math.round(totals.carbs)} 
              unit="g" 
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SummaryItem 
              label="Lipides" 
              value={Math.round(totals.fats)} 
              unit="g" 
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default NutritionSummary;
