import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import WeekViewDatePicker from './uiElements/weekViewDatepicker';
import SelectEmployee from './selectemployee';

interface Employee {
  id: number;
  username: string;
}

interface Timeslot {
  pk: number;
  start_date: string;
  end_date: string;

}

const Appointments: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
  const [timeslots, setTimeslots] = useState<Timeslot[]>([]); // State to hold timeslots

  const formatTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      // Fetch employees
      axios.get('http://127.0.0.1:8000/api/getemployees/', {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
.then(response => {
    setEmployees(response.data.results); // Set the state with the results array
})
.catch(error => {
    console.error('Error fetching employees:', error);
});
}
  }, []);

  const handleDateSelect = (selectedDate: Date) => {
    // Convert start_date and end_date to string format
    const start_date = selectedDate.toISOString();
    selectedDate.setDate(selectedDate.getDate() + 1);
    const end_date = selectedDate.toISOString();

    // console.log('start_date:', start_date);
    // console.log('end_date:', end_date);

    axios.get('http://localhost:8000/api/timeslots/range/', {
      params: {
          'start_date': start_date,
          'end_date': end_date,
          'employee_id': selectedEmployeeId,
      }
  }).then((response) => {
      // console.log(response.data.results);

        setTimeslots(response.data.results);


  }).catch((error) => {
      console.log(error);
  });
  };

  const handleEmployeeSelect = (selectedEmployee: Employee) => {
    setTimeslots([]);
    setSelectedEmployeeId(selectedEmployee.id);
  };

  const handleBookAppointment = (timeslot: Timeslot) => {
    console.log('Booking appointment for timeslot:', timeslot.pk);
  };

  return (
    <div>
      <SelectEmployee
        employees={employees}
        onSelectEmployee={handleEmployeeSelect}
      />
      <h1>{selectedEmployeeId}</h1>
      {selectedEmployeeId && (
        <>
          <h1>Pick a day</h1>
          <WeekViewDatePicker onSelectDate={handleDateSelect} />
          {/* Map over timeslots and render */}
          {timeslots.map((timeslot) => (
            <div key={timeslot.pk}>
              <button onClick={()=>handleBookAppointment(timeslot)}>Start Time: {formatTime(timeslot.start_date)}</button>
              {/* <p>End Time: {timeslot.end_date}</p> */}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Appointments;
