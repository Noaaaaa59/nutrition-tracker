import { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import type { Meal } from '../App';

type AddMealFormProps = {
  onAddMeal: (meal: Omit<Meal, 'id' | 'date'>) => void;
};

const AddMealForm = ({ onAddMeal }: AddMealFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    calories: '',
    proteins: '',
    carbs: '',
    fats: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddMeal({
      name: formData.name,
      calories: Number(formData.calories),
      proteins: Number(formData.proteins),
      carbs: Number(formData.carbs),
      fats: Number(formData.fats),
    });
    setFormData({
      name: '',
      calories: '',
      proteins: '',
      carbs: '',
      fats: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        Ajouter un repas
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Nom du repas"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            label="Calories (kcal)"
            name="calories"
            value={formData.calories}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            label="Protéines (g)"
            name="proteins"
            value={formData.proteins}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            label="Glucides (g)"
            name="carbs"
            value={formData.carbs}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            label="Lipides (g)"
            name="fats"
            value={formData.fats}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Ajouter
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddMealForm;
