import { useState } from 'react';
import { 
  TextField, 
  Button, 
  Grid, 
  Typography, 
  Autocomplete,
  Box,
  InputAdornment
} from '@mui/material';
import type { Meal } from '../App';
import { predefinedFoods, PredefinedFood } from '../data/predefinedFoods';

type AddMealFormProps = {
  onAddMeal: (meal: Omit<Meal, 'id' | 'date'>) => void;
};

const AddMealForm = ({ onAddMeal }: AddMealFormProps) => {
  const [selectedFood, setSelectedFood] = useState<PredefinedFood | null>(null);
  const [quantity, setQuantity] = useState('100');
  const [customFood, setCustomFood] = useState({
    name: '',
    calories: '',
    proteins: '',
    carbs: '',
    fats: '',
  });

  const handlePredefinedFoodSelect = (food: PredefinedFood | null) => {
    setSelectedFood(food);
    if (food) {
      const ratio = Number(quantity) / 100;
      setCustomFood({
        name: food.name,
        calories: (food.calories * ratio).toString(),
        proteins: (food.proteins * ratio).toString(),
        carbs: (food.carbs * ratio).toString(),
        fats: (food.fats * ratio).toString(),
      });
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = e.target.value;
    setQuantity(newQuantity);
    if (selectedFood) {
      const ratio = Number(newQuantity) / 100;
      setCustomFood({
        name: selectedFood.name,
        calories: (selectedFood.calories * ratio).toString(),
        proteins: (selectedFood.proteins * ratio).toString(),
        carbs: (selectedFood.carbs * ratio).toString(),
        fats: (selectedFood.fats * ratio).toString(),
      });
    }
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomFood(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddMeal({
      name: customFood.name,
      calories: Number(customFood.calories),
      proteins: Number(customFood.proteins),
      carbs: Number(customFood.carbs),
      fats: Number(customFood.fats),
    });
    setSelectedFood(null);
    setQuantity('100');
    setCustomFood({
      name: '',
      calories: '',
      proteins: '',
      carbs: '',
      fats: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Ajouter un repas
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Autocomplete
            value={selectedFood}
            onChange={(_, newValue) => handlePredefinedFoodSelect(newValue)}
            options={predefinedFoods}
            groupBy={(option) => option.category}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Sélectionner un aliment"
                fullWidth
              />
            )}
          />
        </Grid>

        {selectedFood && (
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="number"
              label="Quantité (g)"
              value={quantity}
              onChange={handleQuantityChange}
              InputProps={{
                endAdornment: <InputAdornment position="end">g</InputAdornment>,
              }}
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Nom du repas"
            name="name"
            value={customFood.name}
            onChange={handleCustomChange}
            required
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            type="number"
            label="Calories"
            name="calories"
            value={customFood.calories}
            onChange={handleCustomChange}
            required
            InputProps={{
              endAdornment: <InputAdornment position="end">kcal</InputAdornment>,
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            type="number"
            label="Protéines"
            name="proteins"
            value={customFood.proteins}
            onChange={handleCustomChange}
            required
            InputProps={{
              endAdornment: <InputAdornment position="end">g</InputAdornment>,
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            type="number"
            label="Glucides"
            name="carbs"
            value={customFood.carbs}
            onChange={handleCustomChange}
            required
            InputProps={{
              endAdornment: <InputAdornment position="end">g</InputAdornment>,
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            type="number"
            label="Lipides"
            name="fats"
            value={customFood.fats}
            onChange={handleCustomChange}
            required
            InputProps={{
              endAdornment: <InputAdornment position="end">g</InputAdornment>,
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ mt: 1 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
            >
              Ajouter
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddMealForm;
