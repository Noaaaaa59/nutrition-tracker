import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Autocomplete,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { predefinedFoods } from '../data/predefinedFoods';

type Food = {
  name: string;
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
};

type Props = {
  onAddMeal: (meal: {
    name: string;
    calories: number;
    proteins: number;
    carbs: number;
    fats: number;
  }) => void;
};

const AddMealForm = ({ onAddMeal }: Props) => {
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [quantity, setQuantity] = useState<number>(100);
  const [customFoods, setCustomFoods] = useState<Food[]>(() => {
    const saved = localStorage.getItem('customFoods');
    return saved ? JSON.parse(saved) : [];
  });
  const [newFoodDialogOpen, setNewFoodDialogOpen] = useState(false);
  const [newFood, setNewFood] = useState<Food>({
    name: '',
    calories: 0,
    proteins: 0,
    carbs: 0,
    fats: 0,
  });

  const handleAddCustomFood = () => {
    const updatedCustomFoods = [...customFoods, newFood];
    setCustomFoods(updatedCustomFoods);
    localStorage.setItem('customFoods', JSON.stringify(updatedCustomFoods));
    setNewFoodDialogOpen(false);
    setSelectedFood(newFood);
    setNewFood({
      name: '',
      calories: 0,
      proteins: 0,
      carbs: 0,
      fats: 0,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFood) {
      const ratio = quantity / 100;
      onAddMeal({
        name: `${selectedFood.name} (${quantity}g)`,
        calories: Math.round(selectedFood.calories * ratio),
        proteins: Math.round(selectedFood.proteins * ratio),
        carbs: Math.round(selectedFood.carbs * ratio),
        fats: Math.round(selectedFood.fats * ratio),
      });
      setSelectedFood(null);
      setQuantity(100);
    }
  };

  const allFoods = [...predefinedFoods, ...customFoods];

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <Autocomplete
          value={selectedFood}
          onChange={(_, newValue) => setSelectedFood(newValue)}
          options={allFoods}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Sélectionner un aliment"
              required
              fullWidth
            />
          )}
          sx={{ flex: 1 }}
        />
        <IconButton
          color="primary"
          onClick={() => setNewFoodDialogOpen(true)}
          sx={{ alignSelf: 'center' }}
        >
          <AddIcon />
        </IconButton>
      </Box>

      <TextField
        type="number"
        label="Quantité (g)"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        required
        fullWidth
        InputProps={{
          endAdornment: <InputAdornment position="end">g</InputAdornment>,
        }}
        sx={{ mb: 2 }}
      />

      {selectedFood && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Valeurs nutritionnelles pour {quantity}g :
          </Typography>
          <Typography variant="body2">
            Calories: {Math.round((selectedFood.calories * quantity) / 100)} kcal
          </Typography>
          <Typography variant="body2">
            Protéines: {Math.round((selectedFood.proteins * quantity) / 100)}g
          </Typography>
          <Typography variant="body2">
            Glucides: {Math.round((selectedFood.carbs * quantity) / 100)}g
          </Typography>
          <Typography variant="body2">
            Lipides: {Math.round((selectedFood.fats * quantity) / 100)}g
          </Typography>
        </Box>
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={!selectedFood}
      >
        Ajouter le repas
      </Button>

      <Dialog
        open={newFoodDialogOpen}
        onClose={() => setNewFoodDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Ajouter un nouvel aliment</DialogTitle>
        <DialogContent>
          <TextField
            label="Nom de l'aliment"
            value={newFood.name}
            onChange={(e) =>
              setNewFood({ ...newFood, name: e.target.value })
            }
            fullWidth
            required
            sx={{ mt: 2, mb: 2 }}
          />
          <TextField
            label="Calories (pour 100g)"
            type="number"
            value={newFood.calories}
            onChange={(e) =>
              setNewFood({ ...newFood, calories: Number(e.target.value) })
            }
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Protéines (g pour 100g)"
            type="number"
            value={newFood.proteins}
            onChange={(e) =>
              setNewFood({ ...newFood, proteins: Number(e.target.value) })
            }
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Glucides (g pour 100g)"
            type="number"
            value={newFood.carbs}
            onChange={(e) =>
              setNewFood({ ...newFood, carbs: Number(e.target.value) })
            }
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Lipides (g pour 100g)"
            type="number"
            value={newFood.fats}
            onChange={(e) =>
              setNewFood({ ...newFood, fats: Number(e.target.value) })
            }
            fullWidth
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNewFoodDialogOpen(false)}>Annuler</Button>
          <Button
            onClick={handleAddCustomFood}
            variant="contained"
            disabled={!newFood.name || !newFood.calories}
          >
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddMealForm;
