const express = require('express');
const cors = require('cors'); // Importer le middleware CORS
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
const db = require('./config/database');

const app = express();

// Middlewares
app.use(cors()); // Autoriser les requêtes cross-origin
app.use(express.json()); // Analyser les requêtes JSON
app.use(morgan('dev')); // Logger les requêtes HTTP

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
const articleRoutes = require('./routes/articleRoutes');
const userRoutes = require('./routes/userRoutes');
const reportRoutes = require('./routes/reports');

// Utilisation des routes
app.use('/api/articles', articleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reports', reportRoutes);

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Démarrage du serveur
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
