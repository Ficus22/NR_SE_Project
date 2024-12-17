const express = require('express');
const router = express.Router();
const { Sequelize } = require('sequelize'); // Assure-toi d'importer Sequelize
const Article = require('../models/Article');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/alerts', async (req, res) => {
    try {
        console.log('Début du traitement pour /alerts');

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
// Obtenir tous les articles (route publique)
router.get('/', async (req, res) => {
    try {
        const articles = await Article.findAll();
        res.json(articles);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la récupération des articles.' });
    }
});

// Ajouter un nouvel article (protégé)
router.post('/', authMiddleware, async (req, res) => {
    const { name, category, quantity, price, stockThreshold } = req.body; // Inclure stockThreshold
    try {
        const newArticle = await Article.create({ name, category, quantity, price, stockThreshold });
        res.status(201).json(newArticle);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'article.' });
    }
});

// Obtenir un article spécifique (route publique)
router.get('/:id', async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id);
        if (!article) return res.status(404).json({ error: 'Article non trouvé.' });
        res.json(article);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'article.' });
    }
});

// Mettre à jour un article (protégé)
router.put('/:id', authMiddleware, async (req, res) => {
    const { name, category, quantity, price, stockThreshold } = req.body; // Inclure stockThreshold
    try {
        const article = await Article.findByPk(req.params.id);
        if (!article) return res.status(404).json({ error: 'Article non trouvé.' });

        await article.update({ name, category, quantity, price, stockThreshold });
        res.json(article);
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'article.' });
    }
});

// Supprimer un article (protégé)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const article = await Article.findByPk(req.params.id);
        if (!article) return res.status(404).json({ error: 'Article non trouvé.' });

        await article.destroy();
        res.json({ message: 'Article supprimé avec succès.' });
    } catch (err) {
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'article.' });
    }
});

// Obtenir les articles en dessous du seuil




module.exports = router;