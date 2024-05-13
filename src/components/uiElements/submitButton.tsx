import React from 'react';

interface ButtonProps {
    label: string;
    labelcolor: string;
    bgcolor: string;
    onSubmit: () => void;
}

const SubmitButton: React.FC<ButtonProps> = ({ label, labelcolor, bgcolor, onSubmit }) => {
    return (
        <button onClick={onSubmit} style={{ color: labelcolor, backgroundColor: bgcolor}} className="font-bold py-2 px-4 rounded-md">
            {label}
        </button>
    );
};

export default SubmitButton;
