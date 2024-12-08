const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const authMiddleware = require('../middlewares/authMiddleware');

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
    const { name, category, quantity, price } = req.body;
    try {
        const newArticle = await Article.create({ name, category, quantity, price });
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
    const { name, category, quantity, price } = req.body;
    try {
        const article = await Article.findByPk(req.params.id);
        if (!article) return res.status(404).json({ error: 'Article non trouvé.' });

        await article.update({ name, category, quantity, price });
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

module.exports = router;
