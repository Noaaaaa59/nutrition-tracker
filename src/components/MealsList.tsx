import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Typography 
} from '@mui/material';
import type { Meal } from '../App';

type MealsListProps = {
  meals: Meal[];
};

const MealsList = ({ meals }: MealsListProps) => {
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Historique des repas
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Protéines</TableCell>
              <TableCell align="right">Glucides</TableCell>
              <TableCell align="right">Lipides</TableCell>
              <TableCell align="right">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {meals.map((meal) => (
              <TableRow key={meal.id}>
                <TableCell component="th" scope="row">
                  {meal.name}
                </TableCell>
                <TableCell align="right">{meal.calories} kcal</TableCell>
                <TableCell align="right">{meal.proteins} g</TableCell>
                <TableCell align="right">{meal.carbs} g</TableCell>
                <TableCell align="right">{meal.fats} g</TableCell>
                <TableCell align="right">
                  {new Date(meal.date).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default MealsList;
