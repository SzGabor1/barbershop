import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeekViewDatePicker from './uiElements/weekViewDatepicker';
import SelectEmployee from './selectemployee';
import SelectService from './selectservice';
import Modal from './uiElements/modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookAppointment from './bookappointment';

import bgImage from '../assets/bg3.jpg';

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
  const backendURL: string = import.meta.env.VITE_BACKENDURL;
  // const navigate = useNavigate();
  // const token = localStorage.getItem('access_token');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | undefined>(undefined);
  const [timeslots, setTimeslots] = useState<Timeslot[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service>({} as Service);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [appSelectedDate, setAppSelectedDate] = useState(new Date());

  const formatTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    handleDateSelect(appSelectedDate);
  };

  useEffect(() => {

      axios.get(backendURL+'/api/getemployees/', {

      })
        .then(response => {
          setEmployees(response.data.results);
        })
        .catch(error => {
          console.error('Error fetching employees:', error);
          toast.error('Failed to fetch employees. Please try again later.');
        });
    
  }, []);

  useEffect(() => {
    if (selectedEmployee) {
      axios.get(backendURL+'/api/services/employee/', {
        params: {
          'employee_id': selectedEmployee.id,
        },
      })
        .then((response) => {
          setServices(response.data.results);
        })
        .catch((error) => {
          console.log('Error fetching services:', error);
          toast.error('Failed to fetch services. Please try again later.');
        });
    }
  }, [selectedEmployee]);


  const handleDateSelect = (selectedDate: Date) => {
    setAppSelectedDate(selectedDate);
    const start_date = selectedDate.toISOString();
    const end_date = new Date(selectedDate);
    end_date.setDate(end_date.getDate() + 1);
    end_date.toISOString();


    if (selectedEmployee) {
      axios.get(backendURL+'/api/timeslots/range/', {
        params: {
          'start_date': start_date,
          'end_date': end_date,
          'employee_id': selectedEmployee.id,
        }
      }).then((response) => {
        setTimeslots(response.data.results);
      }).catch((error) => {
        console.log('Error fetching timeslots:', error);
        toast.error('Failed to fetch timeslots. Please try again later.');
      });
    }
  };

  const handleEmployeeSelect = (selectedEmployee: Employee) => {
    setTimeslots([]);
    setSelectedEmployee(selectedEmployee);
    setSelectedService({} as Service); 
  };

  const handleServiceSelect = (selectedService: Service) => {
    setSelectedService(selectedService);
  };

const handleBookAppointment = (timeslot: Timeslot) => {
  if (!selectedEmployee) {
    console.error('Employee not selected');
    toast.error('Failed to book appointment. Please select an employee.');
    return;
  }

  if (!selectedService.pk) {
    console.error('Service not selected');
    toast.error('Failed to book appointment. Please select a service.');
    return;
  }

  if (!timeslot) {
    console.error('Timeslot not selected');
    toast.error('Failed to book appointment. Please select a timeslot.');
    return;
  }

  const modalContent = (
    <BookAppointment 
      timeslot={timeslot} 
      service={selectedService}
      employee={selectedEmployee} 
      onClose={closeModal}
    />
  );
  openModal(modalContent);
};


return (
  <>
  <ToastContainer />
  <div className="relative p-32">
    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})`, zIndex: -1}}></div>
    <div className=" min-h-screen flex flex-col items-center justify-center">
      <Modal open={isModalOpen} onClose={closeModal}>
        {modalContent}
      </Modal>

      {/* Selected Employee */}
      <SelectEmployee
        employees={employees}
        onSelectEmployee={handleEmployeeSelect}
      />

      {/* Selected Service */}
      {selectedEmployee && (
        <SelectService
          services={services}
          onSelectService={handleServiceSelect}
        />
      )}

      {/* Time Selection */}
      {selectedEmployee && selectedService.pk && (
        <div className="time-selection-wrapper mt-5">
          <h2 className="time-selection-title text-xl text-center mb-3">Pick a day</h2>
          <WeekViewDatePicker onSelectDate={handleDateSelect} />

          {/* Time Slots */}
          {timeslots.length > 0 && (
            <div className="flex flex-wrap justify-center">
              <div className="w-full md:w-1/2">
                <div className="text-center">
                  <h2 className="text-lg font-semibold mb-2">Morning</h2>
                  {timeslots
                    .filter(timeslot => new Date(timeslot.start_date).getHours() < 12)
                    .map(timeslot => (
                      <button
                        key={timeslot.pk}
                        onClick={() => handleBookAppointment(timeslot)}
                        className={`border-4 ${timeslot.pk === selectedService?.pk ? 'border-yellow-600' : 'border-transparent'} bg-yellow-600 hover:border-yellow-500 text-white font-bold py-2 px-4 mb-2 rounded`}
                      >
                        {formatTime(timeslot.start_date)}
                      </button>
                    ))}
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="text-center">
                  <h2 className="text-lg font-semibold mb-2">Afternoon</h2>
                  {timeslots
                    .filter(timeslot => new Date(timeslot.start_date).getHours() >= 12)
                    .map(timeslot => (
                      <button
                        key={timeslot.pk}
                        onClick={() => handleBookAppointment(timeslot)}
                        className={`border-4 ${timeslot.pk === selectedService?.pk ? 'border-yellow-600' : 'border-transparent'} bg-yellow-600 hover:border-yellow-500 text-white font-bold py-2 px-4 mb-2 rounded`}
                      >
                        {formatTime(timeslot.start_date)}
                      </button>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  </div>
</>
);
};  

export default Appointments;
