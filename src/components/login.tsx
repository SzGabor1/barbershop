import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormContainer from './uiElements/formcontainer';

const Login: React.FC = () => {
    const backendURL: string = import.meta.env.VITE_BACKENDURL;
    const navigate = useNavigate();
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        if (token)
            navigate('/');
    }, [token]); // Run whenever token changes

    const handleLogin = (data: { [key: string]: string }) => {
        const { username, password } = data;
        if (username === '' || password === '') {
            toast.error('Please fill in all fields');
        } else {
            axios.post(backendURL + '/api/token/', data, { withCredentials: true })
                .then((response) => {
                    localStorage.setItem('access_token', response.data.access);
                    localStorage.setItem('refresh_token', response.data.refresh);
                    navigate("/");
                })
                .catch((error) => {
                    if (error.response) {
                        // Server responded with an error status code (e.g., 4xx, 5xx)
                        toast.error('Failed to login. Please check your credentials and try again.');
                    } else if (error.request) {
                        // Request was made but no response was received
                        toast.error('Network error. Please try again later.');
                    } else {
                        // Something else happened while setting up the request
                        toast.error('An unexpected error occurred. Please try again later.');
                    }
                });
        }
    };

    return (
        <div className="flex justify-center items-center m-20">
            <ToastContainer />
            <FormContainer
                title="Login"
                fields={['username', 'password']}
                onSubmit={handleLogin}
            />
        </div>
    );
};

export default Login;
