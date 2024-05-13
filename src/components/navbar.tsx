import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/bbshop logo.png";

export const Navbar: React.FC = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem('access_token');

    const toggleMenu = () => {
        setIsNavOpen(prevState => !prevState);
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        console.log('Logged out');
        navigate('/login');
        toggleMenu();
    };

    const navigateTo = (path: string) => {
        navigate(path);
        toggleMenu();
    };

    return (
        <section className="absolute w-full m-0 p-0 top-0 z-20">
            <div className="navbar-container bg-black bg-opacity-40">
                <div className="navbar-top justify-center text-center">
                    <button onClick={() => navigateTo(token ? '/home' : '/')}>
                        <img className="logo h-16 text-center justify-center m-auto" src={logo} alt="barber" />
                    </button>
                </div>
            </div>
            <div className="md:hidden">
                <button className="navbar-toggle" onClick={toggleMenu}>
                    <svg className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {isNavOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>
            {isNavOpen && (
                <div className="md:hidden fixed inset-0 bg-black z-30">
                    <div className="flex flex-col justify-start">
                        <button className="absolute top-0 right-0 m-4" onClick={toggleMenu}>
                            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <img className="logo h-16 text-center justify-center m-auto mt-8" src={logo} alt="barber" />
                        <ul className="text-white text-center mt-4">
                            <li className={location.pathname === '/home' || location.pathname === '/' ? 'py-3 active' : 'py-3'}>
                                <button onClick={() => navigateTo(token ? '/home' : '/')}>Home</button>
                            </li>
                            <li className={location.pathname === '/gallery' ? 'py-3 active' : 'py-3'}>
                                <a href="#gallery">Gallery</a>
                            </li>
                            <li className={location.pathname === '/appointments' ? 'py-3 active' : 'py-3'}>
                                <a href="/appointments">Book</a>
                            </li>
                            <li className={location.pathname === '/about' ? 'py-3 active' : 'py-3'}>
                                <a href="#about">About Us</a>
                            </li>
                            {token ? (
                                <li className="py-3">
                                    <a onClick={handleLogout}>Logout</a>
                                </li>
                            ) : (
                                <li className="py-3">
                                    <a href="/login">Login</a>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            )}
<div className="hidden md:block navbar-bottom bg-black bg-opacity-40 text-white">
    <div className="navbar-items flex justify-center">
        <ul className="flex p-3">
            <li className={`mx-3 permanent-marker-regular text-2xl transition duration-300 ease-in-out transform hover:scale-110 ${location.pathname === '/home' || location.pathname === '/' ? 'text-yellow-600' : ''}`}>
                <button onClick={() => navigateTo(token ? '/home' : '/')}>Home</button>
            </li>
            <li className={`mx-3 permanent-marker-regular text-2xl transition duration-300 ease-in-out transform hover:scale-110 ${location.pathname === '/gallery' ? 'text-yellow-600' : ''}`}>
                <a href="#gallery">Gallery</a>
            </li>
            <li className={`mx-3 permanent-marker-regular text-2xl transition duration-300 ease-in-out transform hover:scale-110 ${location.pathname === '/appointments' ? 'text-yellow-600' : ''}`}>
                <a href="/appointments">Book</a>
            </li>
            <li className={`mx-3 permanent-marker-regular text-2xl transition duration-300 ease-in-out transform hover:scale-110 ${location.pathname === '/about' ? 'text-yellow-600' : ''}`}>
                <a href="#about">About Us</a>
            </li>
            {token ? (
                <li className="mx-3 permanent-marker-regular text-2xl"><a onClick={handleLogout}>Logout</a></li>
            ) : (
                <li className={`mx-3 permanent-marker-regular text-2xl transition duration-300 ease-in-out transform hover:scale-110 ${location.pathname === '/login' ? 'text-yellow-600' : ''}`}>
                    <a href="/login">Login</a>
                </li>
            )}
        </ul>
    </div>
</div>

        </section>
    );
}
