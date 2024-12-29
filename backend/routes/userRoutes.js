const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Créer un nouvel utilisateur (Inscription)
router.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        // Hachage du mot de passe avant de l'enregistrer dans la base de données
        const hashedPassword = await bcrypt.hash(password, 10);

        // Création d'un nouvel utilisateur dans la base de données
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            role
        });

        // Réponse en cas de succès
        res.status(201).json(newUser);
    } catch (err) {
        // Gestion des erreurs (par exemple, email déjà utilisé)
        res.status(500).json({ error: 'Erreur lors de l\'inscription.' });
    }
});

// Connexion
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Recherche de l'utilisateur dans la base de données par email
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé.' });

        // Comparaison du mot de passe fourni avec celui stocké dans la base de données
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Mot de passe incorrect.' });

        // Génération d'un token JWT avec l'ID et le rôle de l'utilisateur
        const token = jwt.sign(
            { id: user.id, role: user.role },
            'SECRET_KEY',  // Remplacez cette clé par une variable d'environnement pour plus de sécurité
            { expiresIn: '1h' } // Durée de validité du token (1 heure ici)
        );

        // Réponse en cas de succès avec le token JWT
        res.json({ message: 'Connexion réussie', token });
    } catch (err) {
        // Gestion des erreurs lors de la connexion
        res.status(500).json({ error: 'Erreur lors de la connexion.' });
    }
});

module.exports = router;
