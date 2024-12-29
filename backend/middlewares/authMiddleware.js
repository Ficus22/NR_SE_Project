const jwt = require('jsonwebtoken');

// Middleware for authentication
const authMiddleware = (req, res, next) => {
    // Check if authentication is enabled (useful for disabling auth in development/testing)
    const authEnabled = process.env.AUTH_ENABLED === 'true';

    if (!authEnabled) {
        console.log('Authentication middleware executed (authentication disabled)');
        return next(); // Skip token verification if authentication is disabled
    }

    // Extract the token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access denied: No token provided.' });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, 'SECRET_KEY'); // Replace 'SECRET_KEY' with process.env.JWT_SECRET in production
        req.user = decoded; // Attach the decoded user information to the request object
        next(); // Proceed to the next middleware or route
    } catch (err) {
        // Handle invalid token errors
        return res.status(403).json({ error: 'Invalid token.' });
    }
};

module.exports = authMiddleware;
