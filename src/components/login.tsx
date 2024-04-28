import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FormContainer from './uiElements/formcontainer';

const Login: React.FC = () => {
    const backendURL: string = import.meta.env.VITE_BACKENDURL;
    const navigate = useNavigate();
    const token = localStorage.getItem('access_token');
    useEffect(() => {
        if (token)
            navigate('/');
    }, []);

    const handleLogin = (data: { [key: string]: string }) => {
        const { username, password } = data;
        if (username === '' || password === '') {
            alert('Please fill in all fields');
        } else {

            axios.post(backendURL + '/api/token/', data, { withCredentials: true }).then((response) => {
                //console.log(response);
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);


                navigate("/");
            }).catch((error) => {
                console.log(error);
            });
        }
    };

    return (
        <div className="flex justify-center items-center m-20">
            <FormContainer
                title="Login"
                fields={['username', 'password']}
                onSubmit={handleLogin}
            />
        </div>
    );
};

export default Login;
