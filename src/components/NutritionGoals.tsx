import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  LinearProgress,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';

interface NutritionGoals {
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
}

interface DailyProgress {
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
}

interface Props {
  progress: DailyProgress;
}

const DEFAULT_GOALS: NutritionGoals = {
  calories: 2000,
  proteins: 150,
  carbs: 250,
  fats: 65,
};

const NutritionGoals = ({ progress }: Props) => {
  const [goals, setGoals] = useState<NutritionGoals>(() => {
    const saved = localStorage.getItem('nutritionGoals');
    return saved ? JSON.parse(saved) : DEFAULT_GOALS;
  });
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedGoals, setEditedGoals] = useState(goals);

  useEffect(() => {
    localStorage.setItem('nutritionGoals', JSON.stringify(goals));
  }, [goals]);

  const handleSaveGoals = () => {
    setGoals(editedGoals);
    setEditDialogOpen(false);
  };

  const getProgressColor = (value: number, goal: number) => {
    const ratio = value / goal;
    if (ratio > 1) return '#f44336'; // Rouge si dépassé
    if (ratio > 0.9) return '#ff9800'; // Orange si proche
    return '#4caf50'; // Vert sinon
  };

  const renderProgressBar = (
    value: number,
    goal: number,
    label: string,
    unit: string
  ) => {
    const progress = Math.min((value / goal) * 100, 100);
    const color = getProgressColor(value, goal);

    return (
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {value}/{goal} {unit}
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: 'rgba(0,0,0,0.1)',
            '& .MuiLinearProgress-bar': {
              backgroundColor: color,
            },
          }}
        />
      </Box>
    );
  };

  return (
    <>
      <Paper elevation={3} sx={{ p: 2, position: 'relative' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">Objectifs Journaliers</Typography>
          <IconButton
            size="small"
            onClick={() => setEditDialogOpen(true)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <EditIcon />
          </IconButton>
        </Box>

        {renderProgressBar(
          progress.calories,
          goals.calories,
          'Calories',
          'kcal'
        )}
        {renderProgressBar(
          progress.proteins,
          goals.proteins,
          'Protéines',
          'g'
        )}
        {renderProgressBar(
          progress.carbs,
          goals.carbs,
          'Glucides',
          'g'
        )}
        {renderProgressBar(
          progress.fats,
          goals.fats,
          'Lipides',
          'g'
        )}
      </Paper>

      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Modifier les objectifs</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Calories (kcal)"
                type="number"
                value={editedGoals.calories}
                onChange={(e) =>
                  setEditedGoals({
                    ...editedGoals,
                    calories: Number(e.target.value),
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Protéines (g)"
                type="number"
                value={editedGoals.proteins}
                onChange={(e) =>
                  setEditedGoals({
                    ...editedGoals,
                    proteins: Number(e.target.value),
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Glucides (g)"
                type="number"
                value={editedGoals.carbs}
                onChange={(e) =>
                  setEditedGoals({
                    ...editedGoals,
                    carbs: Number(e.target.value),
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Lipides (g)"
                type="number"
                value={editedGoals.fats}
                onChange={(e) =>
                  setEditedGoals({
                    ...editedGoals,
                    fats: Number(e.target.value),
                  })
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Annuler</Button>
          <Button onClick={handleSaveGoals} variant="contained">
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NutritionGoals;
