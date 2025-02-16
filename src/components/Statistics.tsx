import { Box, Typography, Paper, Grid } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import type { Meal } from '../App';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface StatisticsProps {
  meals: Meal[];
}

const Statistics = ({ meals }: StatisticsProps) => {
  // Grouper les repas par jour
  const dailyTotals = meals.reduce((acc, meal) => {
    const date = new Date(meal.date).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = {
        calories: 0,
        proteins: 0,
        carbs: 0,
        fats: 0,
      };
    }
    acc[date].calories += meal.calories;
    acc[date].proteins += meal.proteins;
    acc[date].carbs += meal.carbs;
    acc[date].fats += meal.fats;
    return acc;
  }, {} as Record<string, { calories: number; proteins: number; carbs: number; fats: number; }>);

  // Préparer les données pour le graphique
  const dates = Object.keys(dailyTotals).slice(-7); // Derniers 7 jours
  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Calories',
        data: dates.map(date => dailyTotals[date].calories),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Protéines',
        data: dates.map(date => dailyTotals[date].proteins),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Glucides',
        data: dates.map(date => dailyTotals[date].carbs),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Lipides',
        data: dates.map(date => dailyTotals[date].fats),
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Évolution sur 7 jours',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Calculer les moyennes
  const averages = dates.reduce(
    (acc, date) => {
      acc.calories += dailyTotals[date].calories;
      acc.proteins += dailyTotals[date].proteins;
      acc.carbs += dailyTotals[date].carbs;
      acc.fats += dailyTotals[date].fats;
      return acc;
    },
    { calories: 0, proteins: 0, carbs: 0, fats: 0 }
  );

  const daysCount = dates.length || 1;
  const avgCalories = Math.round(averages.calories / daysCount);
  const avgProteins = Math.round(averages.proteins / daysCount);
  const avgCarbs = Math.round(averages.carbs / daysCount);
  const avgFats = Math.round(averages.fats / daysCount);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Statistiques
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6} sm={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="subtitle2" color="text.secondary">
              Calories/jour
            </Typography>
            <Typography variant="h6" color="primary">
              {avgCalories}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="subtitle2" color="text.secondary">
              Protéines/jour
            </Typography>
            <Typography variant="h6" color="primary">
              {avgProteins}g
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="subtitle2" color="text.secondary">
              Glucides/jour
            </Typography>
            <Typography variant="h6" color="primary">
              {avgCarbs}g
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="subtitle2" color="text.secondary">
              Lipides/jour
            </Typography>
            <Typography variant="h6" color="primary">
              {avgFats}g
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ p: 2 }}>
        <Line options={options} data={chartData} />
      </Paper>
    </Box>
  );
};

export default Statistics;
