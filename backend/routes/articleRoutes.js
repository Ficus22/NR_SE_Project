const express = require('express');
const router = express.Router();
const { Sequelize } = require('sequelize'); // Sequelize pour les requêtes conditionnelles
const Article = require('../models/Article');
const authMiddleware = require('../middlewares/authMiddleware');

// Route pour obtenir les articles en alerte (quantité < stockThreshold)
router.get('/alerts', async (req, res) => {
    try {
        console.log('Début du traitement pour /alerts');

        // Récupère les articles où la quantité est en dessous du seuil
        const articles = await Article.findAll({
            where: {
                quantity: {
                    [Sequelize.Op.lt]: Sequelize.col('stockThreshold')
                }
            }
        });

        console.log('Requête exécutée. Articles trouvés :', articles);

        if (!articles || articles.length === 0) {
            console.log('Aucun article en dessous du seuil.');
            return res.status(404).json({ error: 'Aucun article en dessous du seuil.' });
        }

        res.json(articles);
    } catch (err) {
        console.error('Erreur lors de la récupération des alertes :', err);
        res.status(500).json({ error: 'Erreur lors de la récupération des alertes.' });
    }
});

// Route publique : Obtenir tous les articles
router.get('/', async (req, res) => {
    try {
        // Retourne tous les articles de la base de données
        const articles = await Article.findAll();
        res.json(articles);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la récupération des articles.' });
    }
});

// Route protégée : Ajouter un nouvel article
router.post('/', authMiddleware, async (req, res) => {
    const { name, category, quantity, price, stockThreshold } = req.body; // Données nécessaires
    try {
        // Crée un nouvel article dans la base
        const newArticle = await Article.create({ name, category, quantity, price, stockThreshold });
        res.status(201).json(newArticle);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'article.' });
    }
});

// Route publique : Obtenir un article par ID
router.get('/:id', async (req, res) => {
    try {
        // Trouve un article par son ID
        const article = await Article.findByPk(req.params.id);
        if (!article) return res.status(404).json({ error: 'Article non trouvé.' });
        res.json(article);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'article.' });
    }
});

// Route protégée : Mettre à jour un article
router.put('/:id', authMiddleware, async (req, res) => {
    const { name, category, quantity, price, stockThreshold } = req.body; // Données à mettre à jour
    try {
        // Vérifie si l'article existe
        const article = await Article.findByPk(req.params.id);
        if (!article) return res.status(404).json({ error: 'Article non trouvé.' });

        // Met à jour l'article avec les nouvelles données
        await article.update({ name, category, quantity, price, stockThreshold });
        res.json(article);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'article.' });
    }
});

// Route protégée : Supprimer un article
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        // Trouve et supprime un article par son ID
        const article = await Article.findByPk(req.params.id);
        if (!article) return res.status(404).json({ error: 'Article non trouvé.' });

        await article.destroy();
        res.json({ message: 'Article supprimé avec succès.' });
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'article.' });
    }
});

module.exports = router;
