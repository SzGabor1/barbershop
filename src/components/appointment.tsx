import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import WeekViewDatePicker from './uiElements/weekViewDatepicker';
import SelectEmployee from './selectemployee';
import SelectService from './selectservice';
import Modal from './uiElements/modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  const backendURL: string = import.meta.env.VITE_BACKENDURL;
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | undefined>(undefined);
  const [timeslots, setTimeslots] = useState<Timeslot[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service>({} as Service);
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

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      axios.get(backendURL+'/api/getemployees/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          setEmployees(response.data.results);
        })
        .catch(error => {
          console.error('Error fetching employees:', error);
          toast.error('Failed to fetch employees. Please try again later.');
        });
    }
  }, []);

  useEffect(() => {
    if (selectedEmployee) {
      axios.get(backendURL+'/api/services/employee/', {
        params: {
          'employee_id': selectedEmployee.id,
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
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
    const start_date = selectedDate.toISOString();
    selectedDate.setDate(selectedDate.getDate() + 1);
    const end_date = selectedDate.toISOString();

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


  return (<>
    <ToastContainer />
    <div className='m-5 min-h-screen '>
      <Modal open={isModalOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
      <>
        {/* <h1>{selectedEmployee.id}</h1>  */}
      </>
      <SelectEmployee
        employees={employees}
        onSelectEmployee={handleEmployeeSelect}
        />
      {selectedEmployee && (
        <>
          <SelectService
            services={services}
            onSelectService={handleServiceSelect}
            />
        </>
      )}
      {selectedEmployee && selectedService.pk && (
        <>
          <div className='time-selection-wrapper mt-5'>
            <h2 className='time-selection-title text-xl text-center'>Pick a day</h2>
            <WeekViewDatePicker onSelectDate={handleDateSelect} />
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
      </>
  );
};  

export default Appointments;
