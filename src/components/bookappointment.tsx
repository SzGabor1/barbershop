import React from 'react';
import SubmitButton from './uiElements/submitButton';
import FormContainer from './uiElements/formcontainer';

interface BookAppointmentProps {
  timeslot: Timeslot;
  service?: number;
  employeeId: Employee;
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

const BookAppointment: React.FC<BookAppointmentProps> = ({ timeslot, service, employeeId }) => {
  // Function to format date to "yyyy-mm-dd hh-mm"
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().slice(0, 16).replace('T', ' ');
    return formattedDate;
  };

  return (
    <div>
      <h2>Appointment Booking</h2>
      <p>You are booking an appointment for timeslot: {timeslot.pk}</p>
      <p>Start Time: {formatDate(timeslot.start_date)}</p>
      {service !== null && employeeId !== null && (
        <>
          <p>Service ID: {service}</p>
          <p>Employee ID: {employeeId}</p>
        </>
      )}
      <SubmitButton label="Confirm Appointment" labelcolor='white' bgcolor='blue' onSubmit={() => {}} />
    </div>
  );
};

export default BookAppointment;
