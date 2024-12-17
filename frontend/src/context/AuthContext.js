import React, { createContext, useContext, useState } from 'react';

// Créer le contexte d'authentification
export const AuthContext = createContext();

// Provider pour AuthContext
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    const login = (userData, token) => {
        setUser(userData);
        setToken(token);
        localStorage.setItem('token', token);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personnalisé pour utiliser AuthContext
export const useAuth = () => useContext(AuthContext);
