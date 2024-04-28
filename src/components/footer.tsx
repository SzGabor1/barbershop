import React from 'react';

export default function Footer() {
    return (
        <div className="bg-blue-400 text-white text-center p-3">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="flex flex-col items-center mb-4 md:mb-0">
                    <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
                    <p className="mb-1">Email: example@example.com</p>
                    <p className="mb-1">Phone: +1 234 567 890</p>
                    <p>Location: 1234 Street Name, City, Country</p>
                </div>
                <div className="map-container">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12087.93286579134!2d-74.00559604167937!3d40.76239387395142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2598b4f41e787%3A0x46171cb606c416f4!2sBarber%20Shop%20NYC!5e0!3m2!1shu!2shu!4v1714234854720!5m2!1shu!2shu" width="100%" height="200" style={{ border: "0" }}  loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
            <p className="mt-4">&copy; {new Date().getFullYear()} All rights reserved</p>
        </div>
    );
}
