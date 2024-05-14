import React from 'react';

const About: React.FC = () => {
    return (
        <div className="flex justify-center">
            <div className="about-section bg-gray-200 py-10 w-1/2">
                <div className="container mx-auto">
                    <p className="text-center text-3xl font-bold text-gray-800">About Us</p>
                    <p className="text-center text-lg text-gray-600 mt-4">BarberShop is a traditional barber shop with a modern twist. We pride ourselves on delivering exceptional haircuts and grooming services in a relaxed and welcoming environment. Our experienced barbers are skilled in a range of styles, from classic cuts to the latest trends. At BarberShop, we believe that everyone deserves to look and feel their best, and we're here to help you achieve that. Visit us today and experience the BarberShop difference!</p>
                </div>
            </div>
            <div className="reasons-section bg-gray-100 py-10 w-1/2 flex justify-center">
                <div className="reasons-container mx-auto">
                    <p className="text-center text-3xl font-bold text-gray-800">Why Choose Us?</p>
                    <ul className="mt-4 text-left">
                        <li className="flex items-center text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-orange-500" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Friendly and experienced staff
                        </li>
                        <li className="flex items-center text-gray-700 mt-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-orange-500" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            High-quality services
                        </li>
                        <li className="flex items-center text-gray-700 mt-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-orange-500" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Trendy and classic haircut styles
                        </li>
                        <li className="flex items-center text-gray-700 mt-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-orange-500" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Clean and comfortable environment
                        </li>
                        <li className="flex items-center text-gray-700 mt-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-orange-500" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Convenient location and hours
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default About;
