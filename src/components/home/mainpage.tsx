import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import SubmitButton from '../uiElements/submitButton';

import bg from '../../assets/bg.jpg';
import About from '../about/about';

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
        <div>
            <div className="home-container flex-col relative h-screen" style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center">
                    <div className="welcome w-full relative z-10">
                        <div className="w-3/4 mx-auto pt-40">
                            <p className="text-center font-bold mb-5 text-7xl text-white">Get the <span className='text-yellow-600'>hairstyle </span><br /> you deserve!</p>
                            <div className="book-container mt-16">
                                <p className="text-center text-3xl text-white">Book an appointment now!</p>
                                <div className="text-center mt-5">
                                    <SubmitButton label="Book Now" labelcolor='black' bgcolor='rgb(202 138 4)' onSubmit={navigateToAppointments}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <About />
</div>  
    );
};

export default Main;
