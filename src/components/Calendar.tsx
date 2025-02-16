import { useState } from 'react';
import { 
  Box, 
  IconButton, 
  Typography, 
  Grid,
  Paper
} from '@mui/material';
import { 
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon 
} from '@mui/icons-material';

const daysOfWeek = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
const months = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];

interface CalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

const Calendar = ({ selectedDate, onDateSelect }: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(selectedDate.getMonth());
  const [currentYear, setCurrentYear] = useState(selectedDate.getFullYear());

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const isSelectedDate = (day: number) => {
    return selectedDate.getDate() === day &&
           selectedDate.getMonth() === currentMonth &&
           selectedDate.getFullYear() === currentYear;
  };

  const isToday = (day: number) => {
    const today = new Date();
    return today.getDate() === day &&
           today.getMonth() === currentMonth &&
           today.getFullYear() === currentYear;
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Ajouter les jours vides du début du mois
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<Grid item xs={1.7} key={`empty-${i}`} />);
    }

    // Ajouter les jours du mois
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <Grid item xs={1.7} key={day}>
          <Paper
            elevation={0}
            sx={{
              p: 1,
              textAlign: 'center',
              bgcolor: isSelectedDate(day) ? 'primary.main' : 
                      isToday(day) ? 'primary.light' : 'background.paper',
              color: isSelectedDate(day) ? 'white' : 'text.primary',
              cursor: 'pointer',
              '&:hover': {
                bgcolor: 'primary.light',
              },
              borderRadius: '50%',
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: 'auto'
            }}
            onClick={() => onDateSelect(new Date(currentYear, currentMonth, day))}
          >
            {day}
          </Paper>
        </Grid>
      );
    }

    return days;
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <IconButton onClick={handlePrevMonth} size="small">
          <ChevronLeftIcon />
        </IconButton>
        <Typography variant="h6">
          {months[currentMonth]} {currentYear}
        </Typography>
        <IconButton onClick={handleNextMonth} size="small">
          <ChevronRightIcon />
        </IconButton>
      </Box>

      <Grid container spacing={1} columns={12}>
        {daysOfWeek.map(day => (
          <Grid item xs={1.7} key={day}>
            <Typography variant="caption" align="center" display="block">
              {day}
            </Typography>
          </Grid>
        ))}
        {renderCalendarDays()}
      </Grid>
    </Box>
  );
};

export default Calendar;
