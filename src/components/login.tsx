import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import FormContainer from './uiElements/formcontainer';
const Login: React.FC = () => {
    const navigate = useNavigate(); // Initialize navigate using useNavigate hook
    useEffect(() => {
        const token = localStorage.getItem('access_token');
           
    
        if (token) 
            navigate('/');
    }, []); // Use navigate to navigate to the desired route after successful login

    const handleLogin = (data: { [key: string]: string }) => {
        const { username, password } = data;
        if (username === '' || password === '') {
            alert('Please fill in all fields');
        } else {
            axios.post('http://localhost:8000/api/token/', data, { withCredentials: true }).then((response) => {
                //console.log(response);
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);


                navigate("/"); // Use navigate to navigate to the desired route after successful login
            }).catch((error) => {
                console.log(error);
            });
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <FormContainer
                title="Login"
                fields={['username', 'password']}
                onSubmit={handleLogin}
            />
        </div>
    );
};

export default Login;
