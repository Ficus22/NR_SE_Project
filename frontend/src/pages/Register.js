import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/authService';

const Register = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(userData);
            setSuccess("Inscription réussie ! Vous pouvez maintenant vous connecter.");
            setError(null);
            setTimeout(() => navigate('/login'), 1500); // Redirection vers login après 1.5s
        } catch (err) {
            setError('Inscription échouée. Vérifiez vos informations.');
            setSuccess(null);
        }
    };

    return (
        <div className="page-container flex items-center justify-center">
            <form onSubmit={handleSubmit} className="form-container">
                <h2 className="text-3xl font-bold text-center text-green-600 mb-6">Inscription</h2>

                {/* Message de succès ou d'erreur */}
                {error && <p className="alert-danger">{error}</p>}
                {success && <p className="alert-success">{success}</p>}

                {/* Champ Nom d'utilisateur */}
                <label className="input-label">Nom d'utilisateur</label>
                <input
                    type="text"
                    name="username"
                    placeholder="Entrez votre nom d'utilisateur"
                    className="input-field"
                    onChange={handleChange}
                    required
                />

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

                {/* Bouton d'inscription */}
                <button type="submit" className="btn-secondary">
                    S'inscrire
                </button>

                {/* Lien pour revenir à la page Login */}
                <div className="text-center mt-4">
                    <p className="text-gray-600">
                        Vous avez déjà un compte ?{" "}
                        <Link to="/login" className="text-blue-500 hover:underline">
                            Connectez-vous ici
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Register;
