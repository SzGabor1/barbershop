import React, { useState } from "react";
import barberimage from '../../assets/barberimage.jpg';

import '../../styles/selectemployee.css';

interface Employee {
    id: number;
    username: string;
}

interface SelectEmployeeProps {
    employees: Employee[];
    onSelectEmployee: (selectedEmployee: Employee) => void;
}

const SelectEmployee: React.FC<SelectEmployeeProps> = ({ employees, onSelectEmployee }) => {
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

    const handleSelectEmployee = (employee: Employee) => {
        setSelectedEmployee(employee);
        onSelectEmployee(employee);
    };

    return (
        <div className="pt-5 flex justify-center items-center ">
            <div>
                <div className="text-2xl select-employee text-center m-2 p-2">Select an employee:</div>
                <div className="employee-wrapper flex justify-center flex-wrap">
                    {employees.map((employee) => (
                        <div key={employee.id} className={`employee border-2 m-2 p-2 border-black flex flex-col items-center w-64 h-100 clickable rounded-md bg-black bg-opacity-90 ${selectedEmployee && selectedEmployee.id === employee.id ? 'border-yellow-600' : ''} transform hover:scale-105 transition-transform duration-300 ease-in-out`} onClick={() => handleSelectEmployee(employee)}>
    <img src={barberimage} alt="barber" className="barber-image rounded-full w-24 h-24 mb-2" />
    <span className="employee-name text-xl m-2 text-white">{employee.username}</span>
    <div className="description text-center text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore dolorum unde animi ipsa maxime cupiditate, rem consectetur. Omnis expedita rerum iste quibusdam, soluta eveniet illo dolore, praesentium quod, corporis quam.</div>
</div>

                    ))}
                </div>
            </div>
        </div>
    );
};

export default SelectEmployee;
