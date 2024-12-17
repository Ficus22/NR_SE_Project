import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/authService';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(credentials);
            localStorage.setItem('token', response.token);
            navigate('/dashboard');
        } catch (err) {
            setError('Connexion échouée. Vérifiez vos informations.');
        }
    };

    return (
        <div className="page-container flex items-center justify-center">
            <form onSubmit={handleSubmit} className="form-container">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Connexion</h2>

                {error && <p className="alert-danger">{error}</p>}

                {/* Champ Email */}
                <label className="input-label">Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Entrez votre email"
                    className="input-field"
                    onChange={handleChange}
                    required
                />

                {/* Champ Mot de passe */}
                <label className="input-label">Mot de passe</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Entrez votre mot de passe"
                    className="input-field"
                    onChange={handleChange}
                    required
                />

                {/* Bouton de connexion */}
                <button type="submit" className="btn-primary">
                    Se connecter
                </button>

                {/* Lien pour s'inscrire */}
                <div className="text-center mt-4">
                    <p className="text-gray-600">
                        Pas encore de compte ?{" "}
                        <Link to="/register" className="text-blue-500 hover:underline">
                            Inscrivez-vous ici
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
