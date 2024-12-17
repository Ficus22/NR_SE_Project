const roleMiddleware = (roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ error: "Accès interdit : rôle non autorisé." });
        }
        next();
    };
};

module.exports = roleMiddleware;
