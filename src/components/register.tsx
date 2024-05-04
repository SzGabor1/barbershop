import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormContainer from './uiElements/formcontainer';

interface FormData {
    username: string;
    password: string;
    password2: string;
    email: string;
    first_name: string;
    last_name: string;
}

const Register: React.FC = () => {
    const backendURL: string = import.meta.env.VITE_BACKENDURL;
    const navigate = useNavigate();
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        if (token)
            navigate('/');
    }, [navigate, token]);

    const [formData] = useState<FormData>({
        username: '',
        password: '',
        password2: '',
        email: '',
        first_name: '',
        last_name: ''
    });

    const handleRegister = (data: FormData) => {
        const { username, password, password2, email, first_name, last_name } = data;
        if (!username || !password || !password2 || !email || !first_name || !last_name) {
            toast.error('Please fill in all fields');
        } else if (password !== password2) {
            toast.error('Passwords do not match');
        } else {
            axios.post(`${backendURL}/api/register/`, data, { withCredentials: true })
                .then(() => {
                    toast.success('Registration successful');
                    navigate('/login');
                })
                .catch((error) => {
                    console.error('Registration failed:', error);
                    if (error.response) {
                        const responseData = error.response.data;
                        if (responseData && responseData.username) {
                            toast.error(responseData.username[0]);
                        }
                        if (responseData && responseData.email) {
                            toast.error(responseData.email[0]);
                        }
                    } else {
                        toast.error('An unexpected error occurred. Please try again later.');
                    }
                });
        }
    };
    
    return (
        <div className="flex justify-center items-center m-20">
            <ToastContainer />
            <FormContainer
                title="Register"
                fields={['username', 'password', 'password2', 'email', 'first_name', 'last_name']}
                formData={formData}
                onSubmit={handleRegister}
            />
        </div>
    );
};

export default Register;
