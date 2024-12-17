const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Accès refusé : aucun token fourni.' });
    }

    try {
        const decoded = jwt.verify(token, 'SECRET_KEY'); // Remplace par ta clé secrète ou utilise `process.env.JWT_SECRET`.
        req.user = decoded; // Ajoute les infos de l'utilisateur décodé à `req`.
        next(); // Continue vers la route suivante.
    } catch (err) {
        return res.status(403).json({ error: 'Token invalide.' });
    }
};

module.exports = authMiddleware;
console.log('Middleware exécuté');