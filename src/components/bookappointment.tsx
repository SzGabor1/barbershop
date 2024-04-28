import React, { useState } from 'react';
import SubmitButton from './uiElements/submitButton';
import axios from 'axios';

interface BookAppointmentProps {
  timeslot: Timeslot;
  service: Service;
  employee: Employee;
}

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

const BookAppointment: React.FC<BookAppointmentProps> = ({ timeslot, service, employee }) => {
  const backendURL: string = import.meta.env.VITE_BACKENDURL;
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notification, setNotification] = useState(true); // Default value
  const token = localStorage.getItem('access_token');

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16).replace('T', ' ');
  };

  const bookAppointment = () => {
    const splitToken = token?.split('.')[1];
    const decodedUserId = atob(splitToken || '');
    const userIdJson = JSON.parse(decodedUserId);
    const userId = userIdJson.user_id;

    const serviceId = service.pk;
    const timeslotId = timeslot.pk;

    const data = {
      user: userId,
      service: serviceId,
      email: email,
      phone: phone,
      notification: notification,
      timeslot: timeslotId,
    };

    axios.post(backendURL+'/api/appointments/', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response => {
      console.log('Appointment booked successfully:', response.data);
      // You can redirect or show a success message here
    })
    .catch(error => {
      console.error('Error booking appointment:', error);
      // You can show an error message to the user
    });
  };

  return (
    <div className="container mx-auto p-4 text-center">
      <h2 className="text-2xl font-bold mb-4 text-center underline">Appointment Booking</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center">
        <div className="text-center">
          <p className='text-xl my-2'><span className="font-semibold">Service:</span> {service.name}</p>
          <p className='text-xl my-2'><span className="font-semibold">Employee:</span> {employee.username}</p>
          <p className='text-xl my-2'><span className="font-semibold">Price:</span> {service.price} Ft</p>
          <p className='text-xl my-2'><span className="font-semibold">Date:</span> {formatDate(timeslot.start_date)}</p>
        </div>

        <div className="flex flex-col md:items-start">
          <div className="mb-4">
            <label htmlFor="email" className="text-xl font-semibold block">Email:</label>
            <input
              type="email"
              id="email"
              className="border border-gray-300 rounded px-3 py-2 w-full md:w-80 text-center"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="text-xl font-semibold block">Phone Number:</label>
            <input
              type="tel"
              id="phone"
              className="border border-gray-300 rounded px-3 py-2 w-full md:w-80 text-center"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="notification" className="text-xl font-semibold block">Notification:</label>
            <select
              id="notification"
              className="border border-gray-300 rounded px-3 py-2 w-full md:w-80"
              value={notification.toString()}
              onChange={(e) => setNotification(e.target.value === 'true')}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>
      </div>

      <SubmitButton label="Confirm Appointment" labelcolor="white" bgcolor="blue" onSubmit={bookAppointment} />
    </div>
  );
};

export default BookAppointment;
