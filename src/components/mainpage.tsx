import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import SubmitButton from './uiElements/submitButton';

import bg from '../assets/bg.jpg';

const Main: React.FC = () => {
    const token = localStorage.getItem('access_token');
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate('/home');
        }
    }, []);

    const navigateToAppointments = () => {
        navigate('/appointments');
    }

    return (
<div className="home-container flex-col bg-cover bg-center relative" style={{ backgroundImage: `url(${bg})`, minHeight: '100vh' }}>
    <div className="inset-0 bg-black opacity-50"></div>
    <div className="welcome w-full relative z-10">
        <div className="w-3/4 mx-auto pt-40">
            <p className="text-center font-bold mb-5 text-7xl text-white">Get the <span className='text-yellow-600'>haristyle </span> <br></br> you deserve!</p>
            <div className="book-container mt-16">
            <p className="text-center text-3xl text-white">Book an appointment now!</p>
            <div className="text-center mt-5">
                <SubmitButton label="Book Now" labelcolor='black' bgcolor='rgb(202 138 4)' onSubmit={navigateToAppointments}/>
           </div>
            </div>
       </div>
    </div>
</div>


    );
};

export default Main;
