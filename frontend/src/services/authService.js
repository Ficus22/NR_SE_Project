import api from './api';

// Fonction de connexion
export const login = async (credentials) => {
    const response = await api.post('/users/login', credentials);
    return response.data; // Retourne { token: "..." }
};

// Fonction d'inscription
export const register = async (userData) => {
    const response = await api.post('/users/register', userData);
    return response.data; // Retourne les données utilisateur ou un message de succès
};
