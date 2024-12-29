import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    // Function to handle user logout
    const handleLogout = () => {
        localStorage.removeItem('token'); // Removes the token from local storage
        navigate('/login'); // Redirects the user to the login page
    };

    return (
        <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
            {/* Header title */}
            <h1 className="text-2xl font-bold">Inventory Management System</h1>

            {/* Logout button */}
            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
                Logout
            </button>
        </header>
    );
};

export default Header;
