import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, []);


    return (
        <div className="home-container min-h-screen ">

<div className="text-3xl text-center">
    <h1>Welcome to the Main page!</h1>
</div>
        </div>

    );
};

export default Home;

