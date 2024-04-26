import React, { useState } from 'react';

interface WeekViewDatePickerProps {
  onSelectDate: (selectedDate: Date) => void;
}

const WeekViewDatePicker: React.FC<WeekViewDatePickerProps> = ({ onSelectDate }) => {

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleClickOnDate = (date: Date) => {
    onSelectDate(date);
  };

  const goToPreviousWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 7);
    setSelectedDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 7);
    setSelectedDate(newDate);
  };

  const goToCurrentWeek = () => {
    setSelectedDate(new Date()); // Set selected date to current date
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Function to get the week number for a given date
  const getWeekNumber = (date: Date): number => {
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const millisecondsInDay = 86400000;
    return Math.ceil((((date.getTime() - oneJan.getTime()) / millisecondsInDay) + oneJan.getDay() + 1) / 7);
  };

  // Function to get the dates for a given week number and year
  const getDatesForWeekNumber = (year: number, weekNumber: number): Date[] => {
    const firstDayOfYear = new Date(year, 0, 1);
    const daysToFirstMonday = (8 - firstDayOfYear.getDay()) % 7; // 0-indexed, 1 represents Monday
    const firstMondayDate = new Date(firstDayOfYear);
    firstMondayDate.setDate(firstDayOfYear.getDate() + daysToFirstMonday);
    const startDate = new Date(firstMondayDate);
    startDate.setDate(firstMondayDate.getDate() + (weekNumber - 1) * 7);
    const dates: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startDate);
      currentDate.setHours(currentDate.getHours() + 2);
      currentDate.setDate(startDate.getDate() + i);
      dates.push(currentDate);
    }

    return dates;
  };

  const currentYear = selectedDate.getFullYear();
  const currentWeekNumber = getWeekNumber(selectedDate);
  const datesForCurrentWeek = getDatesForWeekNumber(currentYear, currentWeekNumber);

  // Calculate current week and year
  const currentDate = new Date();
  const currentYearToday = currentDate.getFullYear();
  const currentWeekNumberToday = getWeekNumber(currentDate);

  // Check if the selected week is the current week
  const isCurrentWeek = currentYear === currentYearToday && currentWeekNumber === currentWeekNumberToday;

  return (
    <div className="date-picker-wrapper my-4">
      <div className="week-select flex items-center justify-center mb-2">
        <button className="px-2 py-1 rounded-lg bg-gray-200 hover:bg-gray-300" onClick={goToPreviousWeek}>&lt;</button>
        <span className="text-xl font-medium m-2">{selectedDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })}</span>
        <button className="px-2 py-1 rounded-lg bg-gray-200 hover:bg-gray-300" onClick={goToNextWeek}>&gt;</button>
        {!isCurrentWeek && <button className="px-2 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 ml-2" onClick={goToCurrentWeek}>Today</button>}
      </div>
      <div className="day-wrapper flex flex-wrap justify-center">
        {daysOfWeek.map((day, index) => {
          // Check if the button date is older than yesterday
          const isPastDate = datesForCurrentWeek[index] < new Date(new Date().setDate(new Date().getDate() - 1));
          return (
            <button
              onClick={() => handleClickOnDate(datesForCurrentWeek[index])}
              key={index}
              className={`px-3 py-1 rounded-lg ${isPastDate ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'} mr-2 mb-2`}
              disabled={isPastDate}
            >
              {day} {datesForCurrentWeek[index].getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default WeekViewDatePicker;
