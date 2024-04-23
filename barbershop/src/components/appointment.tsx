import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import WeekViewDatePicker from './uiElements/weekViewDatepicker';
import SelectEmployee from './selectemployee';
import SelectService from './selectservice';


interface Employee {
  id: number;
  username: string;
}

interface Timeslot {
  pk: number;
  start_date: string;
  end_date: string;
}

interface Service {
  pk: number;
  name: string;
  description: string;
  price: number;
  duration: string;
}

const Appointments: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
  const [timeslots, setTimeslots] = useState<Timeslot[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null); // Utilize selectedService state

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
          setEmployees(response.data.results);
        })
        .catch(error => {
          console.error('Error fetching employees:', error);
        });

      // Fetch services when selectedEmployeeId changes
      if (selectedEmployeeId) {
        axios.get('http://localhost:8000/api/services/employee/', {
          params: {
            'employee_id': selectedEmployeeId,
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then((response) => {
            console.log('Services:', response.data.results);
            setServices(response.data.results);
          })
          .catch((error) => {
            console.log('Error fetching services:', error);
          });
      }
    }
  }, [selectedEmployeeId, token, navigate]);

  const handleDateSelect = (selectedDate: Date) => {
    // Convert start_date and end_date to string format
    const start_date = selectedDate.toISOString();
    selectedDate.setDate(selectedDate.getDate() + 1);
    const end_date = selectedDate.toISOString();

    axios.get('http://localhost:8000/api/timeslots/range/', {
      params: {
        'start_date': start_date,
        'end_date': end_date,
        'employee_id': selectedEmployeeId,
      }
    }).then((response) => {
      setTimeslots(response.data.results);
    }).catch((error) => {
      console.log('Error fetching timeslots:', error);
    });
  };

  const handleEmployeeSelect = (selectedEmployee: Employee) => {
    setTimeslots([]);
    setSelectedEmployeeId(selectedEmployee.id);
    setSelectedService(null); // Reset selected service when employee changes
  };

  const handleServiceSelect = (selectedService: Service) => {
    setSelectedService(selectedService);
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
  <SelectService
    services={services}
    onSelectService={handleServiceSelect}
  />
)}

      <h1>{selectedService?.pk}</h1>
      {selectedEmployeeId && selectedService && (
        <>
        <div className='time-selection-wrapper'>

          <h2 className='time-selection-title text-xl text-center'>Pick a day</h2>
          <WeekViewDatePicker onSelectDate={handleDateSelect} />
          {/* Map over timeslots and render */}
          {timeslots.map((timeslot) => (
            <div key={timeslot.pk}>
              <button onClick={() => handleBookAppointment(timeslot)}>Start Time: {formatTime(timeslot.start_date)}</button>
              {/* <p>End Time: {timeslot.end_date}</p> */}
            </div>
          ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Appointments;
