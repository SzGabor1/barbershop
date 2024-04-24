import React from "react";
import barberimage from '../assets/barberimage.jpg';

import '../styles/selectemployee.css';

interface Employee {
    id: number;
    username: string;
}

interface SelectEmployeeProps {
    employees: Employee[];
    onSelectEmployee: (selectedEmployee: Employee) => void;
}

const SelectEmployee: React.FC<SelectEmployeeProps> = ({ employees, onSelectEmployee }) => {
    return (
<div className="flex justify-center items-center">
  <div>
    <div className="select-employee text-center m-2 p-2">Select an employee:</div>
    <div className="employee-wrapper flex justify-center flex-wrap">
      {employees.map((employee) => (

    <div key={employee.id} className="employee border-2 m-2 p-2 flex flex-col items-center w-64 h-100 clickable" onClick={() => onSelectEmployee(employee)}>
         <img src={barberimage} alt="barber" className="barber-image rounded-full w-24 h-24 mb-2" />
          <span className="employee-name text-xl underline m-2">{employee.username}</span>
          <div className="description text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore dolorum unde animi ipsa maxime cupiditate, rem consectetur. Omnis expedita rerum iste quibusdam, soluta eveniet illo dolore, praesentium quod, corporis quam.</div>
        </div>
      ))}
    </div>
  </div>
</div>




    );
};

export default SelectEmployee;
