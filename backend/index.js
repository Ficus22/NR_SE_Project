const express = require('express');
const cors = require('cors'); // Importer le middleware CORS pour gérer les requêtes cross-origin
const morgan = require('morgan'); // Middleware pour logger les requêtes HTTP
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
const db = require('./config/database');

const app = express();

// Middlewares
app.use(cors()); // Autoriser les requêtes provenant d'autres domaines
app.use(express.json()); // Analyser les requêtes avec un payload JSON
app.use(morgan('dev')); // Log des requêtes HTTP en mode développement

// Route de test
app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API de gestion d\'inventaire !');
});

// Synchronisation de la base de données
db.sync()
    .then(() => {
        console.log('Base de données synchronisée.');
    })
    .catch(err => console.error('Erreur lors de la synchronisation :', err));

// Importation des routes
const articleRoutes = require('./routes/articleRoutes'); // Routes pour la gestion des articles
const userRoutes = require('./routes/userRoutes'); // Routes pour la gestion des utilisateurs et l'authentification
const reportRoutes = require('./routes/reports'); // Routes pour la génération de rapports (CSV, PDF)

// Utilisation des routes
app.use('/api/articles', articleRoutes); // Gestion des articles
app.use('/api/users', userRoutes); // Gestion des utilisateurs
app.use('/api/reports', reportRoutes); // Gestion des rapports

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // Documentation interactive des API

// Démarrage du serveur
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
