import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFound = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            <FaExclamationTriangle size={100} className="mb-4" />
            <h1 >404</h1>
            <h1 >Page Not Found</h1>
        </div>
    );
};

export default NotFound;