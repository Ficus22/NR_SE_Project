const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Créer un nouvel utilisateur (Inscription)
router.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            role
        });
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de l\'inscription.' });
    }
});

// Connexion
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé.' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Mot de passe incorrect.' });

        const token = jwt.sign(
            { id: user.id, role: user.role },
            'SECRET_KEY',  // Remplace cette clé par une variable d'environnement
            { expiresIn: '1h' }
        );

        res.json({ message: 'Connexion réussie', token });
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la connexion.' });
    }
});

module.exports = router;
