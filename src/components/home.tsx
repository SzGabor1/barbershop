import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';


const Home: React.FC = () => {
const token = localStorage.getItem('access_token');
const navigate = useNavigate();
    useEffect(() => {
        if (token) {
            navigate('/home');
        }
    }, []);


    return (
        <div className="home-container min-h-screen ">

<div className="text-3xl text-center">
    <h1>Welcome to the Home page!</h1>
</div>
        </div>

    );
};

export default Home;

