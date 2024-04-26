import React, { useState } from "react";
import logo from "../assets/barberimage.jpg";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('access_token');

    const toggleMenu = () => {
        setIsOpen(prevState => !prevState);
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        console.log('Logged out');
        navigate('/login');
    };

    return (
        <section>
            <div className="navbar-container flex justify-between items-center bg-blue-300">
                <header>
                    <div className="logo flex items-center">
                        <img className="w-10 h-10 rounded-full" src={logo} alt="barber" />
                        <p className="ml-5 underline text-xl">Barbershop</p>
                    </div>
                </header>
                <nav className="hidden md:block mr-10">
                    <ul className="flex space-x-4">
                    {token &&<li><a href="/" className="text-xl relative after:bg-black after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-500 cursor-pointer">Home</a></li>}
                        {token &&<li><a href="/appointments" className="text-xl relative after:bg-black after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-500 cursor-pointer">Appointments</a></li>}
                        {token && <li><a href="#" onClick={handleLogout} className="text-xl relative after:bg-black after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-500 cursor-pointer">Logout</a></li>}
                        {!token && <li><a href="/login" className="text-xl relative after:bg-black after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-500 cursor-pointer">Login</a></li>}
                        {!token && <li><a href="/register" className="text-xl relative after:bg-black after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-500 cursor-pointer">Register</a></li>}
                   </ul>
                </nav>
                <div className="md:hidden">
                    <svg
                        className="w-6 h-6 cursor-pointer"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        onClick={toggleMenu}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </div>
            </div>

            {/* Sidebar */}
            <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
                <div className="bg-blue-300">
                    <ul className="py-4">
                        {token && <li><a href="/" className="block py-2 px-4 text-white hover:bg-blue-400">Home</a></li>}
                        {token && <li><a href="/appointments" className="block py-2 px-4 text-white hover:bg-blue-400">Appointments</a></li>}
                        {token && <li><a href="/login" onClick={handleLogout} className="block py-2 px-4 text-white hover:bg-blue-400">Logout</a></li>}
                        {!token && <li><a href="/login" className="text-xl relative after:bg-black after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-500 cursor-pointer">Login</a></li>}
                        {!token && <li><a href="/register" className="text-xl relative after:bg-black after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-500 cursor-pointer">Register</a></li>} 
                    </ul>
                </div>
            </div>
        </section>
    );
}
