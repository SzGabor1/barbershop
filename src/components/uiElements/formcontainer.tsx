import React from 'react';
import SubmitButton from './submitButton';
import {useLocation } from "react-router-dom";

export interface FormProps {
    title: string;
    fields: string[];
    onSubmit: (data: FormData) => void;
}

export interface FormData {
    [key: string]: string;
}

const FormContainer: React.FC<FormProps> = ({ title, fields, onSubmit }) => {
    const [formData, setFormData] = React.useState<FormData>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formattedData = fields.reduce((acc, fieldName) => {
            acc[fieldName] = formData[fieldName] || '';
            return acc;
        }, {} as FormData);

        onSubmit(formattedData);
    };

    return (
        <div className="flex justify-center items-center">
            <div className="FormContainer text-center bg-black bg opacity-90 border-black border-4 shadow-2xl rounded-xl p-3 align-middle">
                <h1 className='text-white mb-6 text-3xl'>{title}</h1>
                <form onSubmit={handleSubmit}>
                    {fields.map((fieldName) => (
                        <div key={fieldName} className="flex flex-col">
                            <label className="text-white text-xl" htmlFor={fieldName}>{fieldName}</label>
                            <input
                                className="text-center my-2 border-2 border-gray-300 rounded-md p-1 mx-1 mb-4 w-64"
                                type={(fieldName === 'password' || fieldName === 'password2') ? 'password' : 'text'}
                                name={fieldName}
                                autoComplete='on'
                                value={formData[fieldName] || ''}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    ))}

                    <div className="redirect">
                    {useLocation().pathname === '/login' ? <p className='text-white mb-4'>Don't have an account? <a href="/register" className='text-yellow-500 underline'>Register</a></p> : <p className='text-white mb-4'>Already have an account? <a href="/login" className='text-yellow-500 underline'>Login</a></p>}
                   </div>
                   {useLocation().pathname === '/login' ? <SubmitButton onSubmit={() => { }} label="Login" labelcolor="white" bgcolor="rgb(202 138 4)" /> : <SubmitButton onSubmit={() => { }} label="Register" labelcolor="white" bgcolor="rgb(202 138 4)" />}
                </form>
            </div>
        </div>
    );
};

export default FormContainer;
