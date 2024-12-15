const express = require('express');
const app = express();

// Middleware pour analyser les requêtes JSON
app.use(express.json());

// Route de test
app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API de gestion d\'inventaire !');
});

// Démarrer le serveur
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
const db = require('./config/database');

db.sync()
    .then(() => {
        console.log('Base de données synchronisée.');
    })
    .catch(err => console.error('Erreur lors de la synchronisation :', err));

const Article = require('./models/Article');

db.sync()
    .then(() => {
        console.log('Base de données synchronisée.');
    })
    .catch(err => console.error('Erreur lors de la synchronisation :', err));

const articleRoutes = require('./routes/articleRoutes');

// Utiliser les routes articles
app.use('/api/articles', articleRoutes);
const User = require('./models/User');

db.sync()
    .then(() => {
        console.log('Base de données synchronisée.');
    })
    .catch(err => console.error('Erreur lors de la synchronisation :', err));


const userRoutes = require('./routes/userRoutes');

// Routes utilisateurs
app.use('/api/users', userRoutes);

const morgan = require('morgan');
app.use(morgan('dev'));

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/articles', articleRoutes);

const reportRoutes = require('./routes/reports');
app.use('/api/reports', reportRoutes);

