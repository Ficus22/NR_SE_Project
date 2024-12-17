import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Supprime le token
        navigate('/login'); // Redirige vers Login
    };

    return (
        <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Inventory Management System</h1>
            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
                Déconnexion
            </button>
        </header>
    );
};

export default Header;
