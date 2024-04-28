import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import FormContainer from './uiElements/formcontainer';

const Register: React.FC = () => {
    const backendURL: string = import.meta.env.VITE_BACKENDURL;
    const navigate = useNavigate();

    const token = localStorage.getItem('access_token');
    
    useEffect(() => {
        if (token) 
            navigate('/');
    }, [navigate, token]); 

    const handleRegister = (data: { [key: string]: string }) => {
        const { username, password, password2, email, first_name, last_name } = data;
        if (!username || !password || !password2 || !email || !first_name || !last_name) {
            alert('Please fill in all fields');
        } else if (password !== password2) {
            alert('Passwords do not match');
        } else {
            axios.post(`${backendURL}/api/register/`, data, { withCredentials: true })
                .then(() => {
                    navigate('/login');
                })
                .catch((error) => {
                    console.error('Registration failed:', error);
                    if (error.response) {
                        console.error('Server responded with:', error.response.data);

                    }
                });
        }
    };

    return (
        <div className="flex justify-center items-center m-20">
            <FormContainer
                title="Register"
                fields={['username', 'password', 'password2', 'email', 'first_name', 'last_name']}
                onSubmit={handleRegister}
            />
        </div>
    );
};

export default Register;
