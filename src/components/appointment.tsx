import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import WeekViewDatePicker from './uiElements/weekViewDatepicker';
import SelectEmployee from './selectemployee';
import SelectService from './selectservice';
import Modal from './uiElements/modal';

import SubmitButton from './uiElements/submitButton';
import BookAppointment from './bookappointment';

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


  // for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const formatTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };



  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    console.log('Closing modal');
    setIsModalOpen(false);
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

    console.log('Selected date:', start_date, end_date);

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
    const modalContent = (
      <BookAppointment 
        timeslot={timeslot} 
        service={selectedService?.pk}
        employeeId={selectedEmployeeId} 
      />
    );
    openModal(modalContent);
  };
  

  return (
    <div className='m-5 min-h-screen '>
      <Modal open={isModalOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
        <>
          {/* <h1>{selectedEmployeeId}</h1> */}
        </>
        <SelectEmployee
          employees={employees}
          onSelectEmployee={handleEmployeeSelect}
        />
      
      
      {selectedEmployeeId && (
        <>
          <SelectService
            services={services}
            onSelectService={handleServiceSelect}
          />
          {/* <h1>{selectedService?.pk}</h1> */}
        </>
      )}
  
      {selectedEmployeeId && selectedService && (
        <>
          <div className='time-selection-wrapper mt-5'>
            <h2 className='time-selection-title text-xl text-center'>Pick a day</h2>
            <WeekViewDatePicker onSelectDate={handleDateSelect} />
            
            {/* Check if timeslots are available */}
            {timeslots.length > 0 && (
              <div className="flex flex-wrap justify-center">
                <div className="w-full md:w-1/4">
                  <h2 className="text-lg font-semibold mb-2 text-center">Morning</h2>
                  {timeslots
                    .filter(timeslot => new Date(timeslot.start_date).getHours() < 12)
                    .map((timeslot) => (
                      <div key={timeslot.pk} className="mb-2 justify-center text-center">
                        <button 
                          onClick={() => handleBookAppointment(timeslot)} 
                          className={`border-4 ${timeslot.pk === selectedService?.pk ? 'border-blue-500' : 'border-transparent'} bg-blue-500 hover:border-blue-600 text-white font-bold py-1 px-2 w-48 rounded`}
                        >
                          {formatTime(timeslot.start_date)}
                        </button>
                      </div>
                    ))}
                </div>
                <div className="w-full md:w-1/4">
                  <h2 className="text-lg font-semibold mb-2 text-center">Afternoon</h2>
                  {timeslots
                    .filter(timeslot => new Date(timeslot.start_date).getHours() >= 12)
                    .map((timeslot) => (
                      <div key={timeslot.pk} className="mb-2 justify-center text-center">
                        <button 
                          onClick={() => handleBookAppointment(timeslot)} 
                          className={`border-4 ${timeslot.pk === selectedService?.pk ? 'border-blue-500' : 'border-transparent'} bg-blue-500 hover:border-blue-600 text-white font-bold py-1 px-2 w-48 rounded`}
                        >
                          {formatTime(timeslot.start_date)}
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};  

export default Appointments;
