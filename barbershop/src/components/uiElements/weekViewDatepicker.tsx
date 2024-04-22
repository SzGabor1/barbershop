import React, { useState } from 'react';

interface WeekViewDatePickerProps {
  onSelectDate: (selectedDate: Date) => void;
}

const WeekViewDatePicker: React.FC<WeekViewDatePickerProps> = ({ onSelectDate }) => {

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleClickOnDate = (dayNumber: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(dayNumber);
    const formattedDate = newDate.toISOString().slice(0, 10); // Extract yyyy-mm-dd
    const dateObject = new Date(formattedDate); // Convert formatted string to Date object
    onSelectDate(dateObject);
  };
  
 
  const goToPreviousWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 7);
    setSelectedDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 7);
    setSelectedDate(newDate);
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const getDaysOfWeekForWeekNumber = (year: number, weekNumber: number) => {
    const date = new Date(year, 0, 1 + (weekNumber - 1) * 7);
    const days: number[] = [];
    for (let i = 0; i < 7; i++) {
      days.push(date.getDate());
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  // Get current week number
  const getWeekNumber = (date: Date) => {
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const millisecondsInDay = 86400000;
    return Math.ceil((((date.getTime() - oneJan.getTime()) / millisecondsInDay) + oneJan.getDay() + 1) / 7);
  };

  const currentWeekNumber = getWeekNumber(selectedDate);
  const daysInCurrentWeek = getDaysOfWeekForWeekNumber(selectedDate.getFullYear(), currentWeekNumber);

  return (
    <div>
      <div>
        <button onClick={goToPreviousWeek}>&lt; Previous Week</button>
        <span>{selectedDate.toLocaleString('default', { month: 'long' })} {selectedDate.getFullYear()}</span>
        <button onClick={goToNextWeek}>Next Week &gt;</button>
      </div>
      <div>
        {daysOfWeek.map((day, index) => (
          <button onClick={() => handleClickOnDate(daysInCurrentWeek[index])} key={index} style={{ marginRight: '10px' }}>{day} {daysInCurrentWeek[index]}</button>
        ))}
      </div>
    </div>
  );
};

export default WeekViewDatePicker;
