import React from 'react';
import SubmitButton from './submitButton';

interface FormProps {
    title: string;
    fields: string[];
    onSubmit: (data: { [key: string]: string }) => void; // Modified onSubmit type
}

interface FormData {
    [key: string]: string;
}

const FormContainer: React.FC<FormProps> = ({ title, fields, onSubmit}) => {
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
        
        // Restructure form data to match the expected format
        const formattedData = fields.reduce((acc, fieldName) => {
            acc[fieldName] = formData[fieldName] || '';
            return acc;
        }, {} as { [key: string]: string });

        onSubmit(formattedData);
        setFormData({});
    };

    return (
        <div className="flex justify-center items-center h-full">
            <div className="FormContainer text-center border-gray-400 border-2 rounded-md p-3 align-middle">
                <h1 className='underline mb-6 text-2xl'>{title}</h1>
                <form onSubmit={handleSubmit}>
                    {fields.map((fieldName) => (
                        <div key={fieldName} className="flex flex-col">
                            <label htmlFor={fieldName}>{fieldName}</label>
                            <input
                                className="text-center my-2 border-2 border-gray-300 rounded-md p-1 m-1 w-48"
                                type={(fieldName === 'password' || fieldName === 'password2') ? 'password' : 'text'}
                                name={fieldName}
                                autoComplete='on'
                                value={formData[fieldName] || ''}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    ))}
                    <SubmitButton onSubmit={()=>{}} label="Submit" labelcolor="white" bgcolor="lightblue" />
                </form>
            </div>
        </div>
    );
};

export default FormContainer;
