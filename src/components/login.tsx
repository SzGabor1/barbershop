import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormContainer from './uiElements/formcontainer';
import bg2 from '../assets/bg2.jpg'; 

const Login: React.FC = () => {
    const backendURL: string = import.meta.env.VITE_BACKENDURL;
    const navigate = useNavigate();
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        if (token)
            navigate('/');
    }, [token]); 

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

                        toast.error('Failed to login. Please check your credentials and try again.');
                    } else if (error.request) {

                        toast.error('Network error. Please try again later.');
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
                    <div className="login-form mt-16">
                        <FormContainer
                            title="Login"
                            fields={['username', 'password']}
                            onSubmit={handleLogin}
                        />
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
