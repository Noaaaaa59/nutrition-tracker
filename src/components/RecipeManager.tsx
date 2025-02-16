import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Autocomplete,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { predefinedFoods } from '../data/predefinedFoods';

interface Ingredient {
  name: string;
  quantity: number;
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
}

interface Recipe {
  id: string;
  name: string;
  ingredients: Ingredient[];
  servings: number;
  instructions: string;
  totalNutrition: {
    calories: number;
    proteins: number;
    carbs: number;
    fats: number;
  };
}

const RecipeManager = () => {
  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    const saved = localStorage.getItem('recipes');
    return saved ? JSON.parse(saved) : [];
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [newIngredient, setNewIngredient] = useState<{
    food: typeof predefinedFoods[0] | null;
    quantity: number;
  }>({
    food: null,
    quantity: 100,
  });

  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  const calculateTotalNutrition = (ingredients: Ingredient[]) => {
    return ingredients.reduce(
      (acc, ingredient) => ({
        calories: acc.calories + ingredient.calories,
        proteins: acc.proteins + ingredient.proteins,
        carbs: acc.carbs + ingredient.carbs,
        fats: acc.fats + ingredient.fats,
      }),
      { calories: 0, proteins: 0, carbs: 0, fats: 0 }
    );
  };

  const handleAddIngredient = () => {
    if (newIngredient.food && editingRecipe) {
      const ratio = newIngredient.quantity / 100;
      const ingredient: Ingredient = {
        name: newIngredient.food.name,
        quantity: newIngredient.quantity,
        calories: Math.round(newIngredient.food.calories * ratio),
        proteins: Math.round(newIngredient.food.proteins * ratio),
        carbs: Math.round(newIngredient.food.carbs * ratio),
        fats: Math.round(newIngredient.food.fats * ratio),
      };

      const updatedIngredients = [...editingRecipe.ingredients, ingredient];
      setEditingRecipe({
        ...editingRecipe,
        ingredients: updatedIngredients,
        totalNutrition: calculateTotalNutrition(updatedIngredients),
      });

      setNewIngredient({ food: null, quantity: 100 });
    }
  };

  const handleSaveRecipe = () => {
    if (editingRecipe) {
      const isEditing = recipes.some((r) => r.id === editingRecipe.id);
      const updatedRecipes = isEditing
        ? recipes.map((r) =>
            r.id === editingRecipe.id ? editingRecipe : r
          )
        : [...recipes, editingRecipe];

      setRecipes(updatedRecipes);
      setDialogOpen(false);
      setEditingRecipe(null);
    }
  };

  const handleCreateNewRecipe = () => {
    setEditingRecipe({
      id: Date.now().toString(),
      name: '',
      ingredients: [],
      servings: 1,
      instructions: '',
      totalNutrition: {
        calories: 0,
        proteins: 0,
        carbs: 0,
        fats: 0,
      },
    });
    setDialogOpen(true);
  };

  const handleDeleteRecipe = (recipeId: string) => {
    setRecipes(recipes.filter((r) => r.id !== recipeId));
  };

  return (
    <>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6">Mes Recettes</Typography>
          <IconButton color="primary" onClick={handleCreateNewRecipe}>
            <AddIcon />
          </IconButton>
        </Box>

        <List>
          {recipes.map((recipe) => (
            <ListItem key={recipe.id}>
              <ListItemText
                primary={recipe.name}
                secondary={`${recipe.ingredients.length} ingrédients - ${recipe.totalNutrition.calories} kcal par portion`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  onClick={() => {
                    setEditingRecipe(recipe);
                    setDialogOpen(true);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  onClick={() => handleDeleteRecipe(recipe.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Dialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setEditingRecipe(null);
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editingRecipe?.id ? 'Modifier la recette' : 'Nouvelle recette'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Nom de la recette"
              value={editingRecipe?.name || ''}
              onChange={(e) =>
                setEditingRecipe(
                  editingRecipe
                    ? { ...editingRecipe, name: e.target.value }
                    : null
                )
              }
              fullWidth
            />

            <TextField
              label="Nombre de portions"
              type="number"
              value={editingRecipe?.servings || 1}
              onChange={(e) =>
                setEditingRecipe(
                  editingRecipe
                    ? {
                        ...editingRecipe,
                        servings: Number(e.target.value),
                      }
                    : null
                )
              }
              fullWidth
            />

            <Box sx={{ display: 'flex', gap: 1 }}>
              <Autocomplete
                value={newIngredient.food}
                onChange={(_, newValue) =>
                  setNewIngredient({ ...newIngredient, food: newValue })
                }
                options={predefinedFoods}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Ajouter un ingrédient"
                    fullWidth
                  />
                )}
                sx={{ flex: 1 }}
              />
              <TextField
                type="number"
                label="Quantité (g)"
                value={newIngredient.quantity}
                onChange={(e) =>
                  setNewIngredient({
                    ...newIngredient,
                    quantity: Number(e.target.value),
                  })
                }
                sx={{ width: 120 }}
              />
              <Button
                variant="contained"
                onClick={handleAddIngredient}
                disabled={!newIngredient.food}
              >
                Ajouter
              </Button>
            </Box>

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Ingrédients :
              </Typography>
              {editingRecipe?.ingredients.map((ingredient, index) => (
                <Chip
                  key={index}
                  label={`${ingredient.name} (${ingredient.quantity}g)`}
                  onDelete={() =>
                    setEditingRecipe(
                      editingRecipe
                        ? {
                            ...editingRecipe,
                            ingredients: editingRecipe.ingredients.filter(
                              (_, i) => i !== index
                            ),
                          }
                        : null
                    )
                  }
                  sx={{ m: 0.5 }}
                />
              ))}
            </Box>

            <TextField
              label="Instructions"
              multiline
              rows={4}
              value={editingRecipe?.instructions || ''}
              onChange={(e) =>
                setEditingRecipe(
                  editingRecipe
                    ? {
                        ...editingRecipe,
                        instructions: e.target.value,
                      }
                    : null
                )
              }
              fullWidth
            />

            {editingRecipe && (
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Valeurs nutritionnelles par portion :
                </Typography>
                <Typography variant="body2">
                  Calories:{' '}
                  {Math.round(
                    editingRecipe.totalNutrition.calories /
                      editingRecipe.servings
                  )}{' '}
                  kcal
                </Typography>
                <Typography variant="body2">
                  Protéines:{' '}
                  {Math.round(
                    editingRecipe.totalNutrition.proteins /
                      editingRecipe.servings
                  )}{' '}
                  g
                </Typography>
                <Typography variant="body2">
                  Glucides:{' '}
                  {Math.round(
                    editingRecipe.totalNutrition.carbs / editingRecipe.servings
                  )}{' '}
                  g
                </Typography>
                <Typography variant="body2">
                  Lipides:{' '}
                  {Math.round(
                    editingRecipe.totalNutrition.fats / editingRecipe.servings
                  )}{' '}
                  g
                </Typography>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDialogOpen(false);
              setEditingRecipe(null);
            }}
          >
            Annuler
          </Button>
          <Button
            onClick={handleSaveRecipe}
            variant="contained"
            disabled={!editingRecipe?.name}
          >
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RecipeManager;
