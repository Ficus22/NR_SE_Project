const jwt = require('jsonwebtoken');

// Middleware for authentication
const authMiddleware = (req, res, next) => {
    // Check if authentication is enabled
    const authEnabled = process.env.AUTH_ENABLED === 'true';

    if (!authEnabled) {
        console.log('Authentication middleware executed (authentication disabled)');
        return next(); // Skip token verification if authentication is disabled
    }

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access denied: No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, 'SECRET_KEY'); // Replace 'SECRET_KEY' with your actual secret or use process.env.JWT_SECRET
        req.user = decoded; // Add decoded user information to the request object
        next(); // Proceed to the next middleware or route
    } catch (err) {
        return res.status(403).json({ error: 'Invalid token.' });
    }
};

module.exports = authMiddleware;
