import React from 'react';

export default function Footer() {
    return (
        <div className="bg-blue-400 text-white text-center p-3">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <div className="flex flex-col items-center">
                    <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
                    <p className="mb-1">Email: example@example.com</p>
                    <p className="mb-1">Phone: +1 234 567 890</p>
                    <p>Location: 1234 Street Name, City, Country</p>
                </div>

            </div>
            <p className="mt-4">&copy; {new Date().getFullYear()} All rights reserved</p>
        </div>
    );
}
