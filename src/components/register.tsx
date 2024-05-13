import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormContainer, { FormData } from './uiElements/formcontainer';
import bg2 from '../assets/bg2.jpg'; 

const Register: React.FC = () => {
    const backendURL: string = import.meta.env.VITE_BACKENDURL;
    const navigate = useNavigate();
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        if (token)
            navigate('/');
    }, [navigate, token]);

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
        <div className="home-container flex-col bg-cover bg-center relative" style={{ backgroundImage: `url(${bg2})`, minHeight: '100vh' }}>
            <div className="inset-0 bg-black opacity-50"></div>
            <div className="welcome w-full relative z-10">
                <div className="w-3/4 mx-auto pt-40">
                    <div className="register-form mt-16 pb-16">
                        <FormContainer
                            title="Register"
                            fields={['username', 'password', 'password2', 'email', 'first_name', 'last_name']}
                            onSubmit={handleRegister}
                        />
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Register;
