import React, { FC, useEffect } from "react";
import SubmitButton from "./submitButton";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode; // Update the type of the children prop
}

export default function Modal({ open, onClose, children }: ModalProps): ReturnType<FC> {
    useEffect(() => {
        // Add event listener to disable scrolling when modal is open
        const disableScroll = () => {
        if (open) {
        document.documentElement.style.overflowY = 'hidden';
        document.body.style.overflowY = 'hidden';
        } else {
        document.documentElement.style.overflowY = '';
        document.body.style.overflowY = '';
        }
        };

        disableScroll();

        return () => {
            // Remove event listener on component unmount
            document.documentElement.style.overflowY = '';
            document.body.style.overflowY = '';
        };
    }, [open]);
    
    return (
        <div className={open ? "fixed inset-0 flex items-center justify-center z-50 overflow-y-auto" : "hidden"}>
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="absolute top-1/6 w-2/3 bg-white rounded-lg shadow-lg p-6">
                <div className="modal-head mb-4">
                </div>
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-footer mt-6 flex justify-end">
                    <SubmitButton label="Close" labelcolor="white" bgcolor="red" onSubmit={onClose} />
                </div>
            </div>
        </div>
    );
}    