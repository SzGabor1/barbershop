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

  // Get today's date
  const yesterday = new Date();
  //yesterday.setDate(yesterday.getDate() - 1);

  return (
    <div className="date-picker-wrapper my-4">
      <div className="week-select flex items-center justify-center mb-2">
        <button className="px-2 py-1 rounded-lg bg-gray-200 hover:bg-gray-300" onClick={goToPreviousWeek}>&lt;</button>
        <span className="text-xl font-medium m-2">{selectedDate.toLocaleString('en-US', { month: 'short' })} {selectedDate.getFullYear()}</span>
        <button className="px-2 py-1 rounded-lg bg-gray-200 hover:bg-gray-300" onClick={goToNextWeek}>&gt;</button>
      </div>
      <div className="day-wrapper flex flex-wrap justify-center">
        {daysOfWeek.map((day, index) => {
          // Calculate date for the current button
          const buttonDate = new Date(selectedDate);
          buttonDate.setDate(daysInCurrentWeek[index]);

          // Check if the button date is older than today
          const isPastDate = buttonDate < yesterday;

          return (
            <button
              onClick={() => handleClickOnDate(daysInCurrentWeek[index])}
              key={index}
              className={`px-3 py-1 rounded-lg ${isPastDate ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'} mr-2 mb-2`}
              disabled={isPastDate}
            >
              {day} {daysInCurrentWeek[index]}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default WeekViewDatePicker;
