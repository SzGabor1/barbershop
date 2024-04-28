import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import image1 from '../assets/output.jpg';
import image2 from '../assets/output (1).jpg';
import image3 from '../assets/output (2).jpg';

const Home: React.FC = () => {
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


    // Slider settings
    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000
    };

    return (
        <div className="home-container flex flex-col mt-5 relative">
            <div className="welcome w-3/4 mx-auto">

            <p className="text-center text-xlfont-bold mb-5 text-4xl">Welcome to our barbershop!</p>
            <p className="text-center mb-8">Step into a world of style and sophistication where every haircut tells a story. Our homey yet chic atmosphere invites you to relax and unwind while our skilled barbers work their magic. From classic cuts to modern trends, we cater to every style preference. As you wait for your turn, take a glimpse at our vibrant showcase displayed on our digital slider. Each image captures the essence of our craftsmanship and attention to detail. And when you're ready to elevate your grooming experience, simply click 'Book Now' to secure your appointment. Join us in shaping more than just hairstyles; join us in shaping memories.</p>
            </div>
            <Slider {...settings} className="w-full relative">
                <div className="w-full h-48 md:h-64 lg:h-80 xl:h-96 overflow-hidden relative">
                    <img src={image1} alt="Image 1" className="w-full h-full object-cover" />
                    <button onClick={navigateToAppointments} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-8 py-4 rounded-lg opacity-90">Book Now</button>
                </div>
                <div className="w-full h-48 md:h-64 lg:h-80 xl:h-96 overflow-hidden relative">
                    <img src={image2} alt="Image 2" className="w-full h-full object-cover" />
                    <button onClick={navigateToAppointments} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-8 py-4 rounded-lg opacity-90">Book Now</button>
                </div>
                <div className="w-full h-48 md:h-64 lg:h-80 xl:h-96 overflow-hidden relative">
                    <img src={image3} alt="Image 3" className="w-full h-full object-cover" />
                    <button onClick={navigateToAppointments} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-8 py-4 rounded-lg opacity-90">Book Now</button>
                </div>
            </Slider>
        </div>
    );
};

export default Home;
