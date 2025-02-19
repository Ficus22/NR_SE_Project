const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: process.env.DB_PORT
    }
);

// Vérifie si la connexion à la base de données est réussie
sequelize.authenticate()
    .then(() => {
        console.log('Connexion réussie à la base de données MySQL.');
    })
    .catch(err => {
        console.error('Erreur de connexion à la base de données :', err);
    });

module.exports = sequelize;
