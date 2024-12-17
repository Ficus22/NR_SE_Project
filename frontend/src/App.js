import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Articles from './pages/Articles';
import Reports from './pages/Reports';
import Alerts from './pages/Alerts';

// Vérifie si l'utilisateur est connecté
const isAuthenticated = () => {
    return !!localStorage.getItem('token'); // Retourne true si un token existe
};

// Route privée : accès uniquement si connecté
const PrivateRoute = ({ element }) => {
    return isAuthenticated() ? element : <Navigate to="/login" />;
};

function App() {
    return (
        <Router>
            <Routes>
                {/* Rediriger par défaut vers Login */}
                <Route path="/" element={<Navigate to="/login" />} />

                {/* Route pour la page de connexion */}
                <Route path="/login" element={<Login />} />

                {/* Route pour la page d'inscription */}
                <Route path="/register" element={<Register />} />

                {/* Routes protégées */}
                <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
                <Route path="/articles" element={<PrivateRoute element={<Articles />} />} />
                <Route path="/reports" element={<PrivateRoute element={<Reports />} />} />
                <Route path="/alerts" element={<PrivateRoute element={<Alerts />} />} />
            </Routes>
        </Router>
    );
}

export default App;
