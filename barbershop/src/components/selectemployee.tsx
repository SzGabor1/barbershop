import React from "react";

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
        <div>
            <div>Select an employee:</div>
            <div>
                {employees.map((employee) => (
                    <button key={employee.id} onClick={() => onSelectEmployee(employee)}>
                        {employee.username}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SelectEmployee;
