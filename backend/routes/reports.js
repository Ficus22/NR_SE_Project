const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const { createObjectCsvWriter } = require('csv-writer');
const PDFDocument = require('pdfkit');

// Route : Génération d'un rapport CSV
router.get('/csv', async (req, res) => {
    try {
        // Récupération de tous les articles
        const articles = await Article.findAll();

        // Séparation des articles : en alerte vs normaux
        const articlesEnAlerte = articles.filter(article => article.quantity < article.stockThreshold);
        const articlesNormaux = articles.filter(article => article.quantity >= article.stockThreshold);

        // Configuration pour l'écriture du fichier CSV
        const csvWriter = createObjectCsvWriter({
            path: 'export/articles.csv',
            header: [
                { id: 'id', title: 'ID' },
                { id: 'name', title: 'Nom' },
                { id: 'category', title: 'Catégorie' },
                { id: 'quantity', title: 'Quantité' },
                { id: 'price', title: 'Prix (€)' },
                { id: 'stockThreshold', title: 'Seuil' },
                { id: 'status', title: 'Statut' }
            ]
        });

        // Création des données du rapport avec un statut (En Alerte ou Normal)
        const articlesRapport = [
            ...articlesEnAlerte.map(a => ({ ...a.dataValues, status: 'En Alerte' })),
            ...articlesNormaux.map(a => ({ ...a.dataValues, status: 'Normal' }))
        ];

        // Écriture dans le fichier CSV
        await csvWriter.writeRecords(articlesRapport);
        res.download('export/articles.csv'); // Téléchargement du fichier
    } catch (err) {
        console.error('Erreur lors de la génération du CSV :', err);
        res.status(500).json({ error: 'Erreur lors de la génération du rapport.' });
    }
});

// Route : Génération d'un rapport PDF
router.get('/pdf', async (req, res) => {
    try {
        // Récupération de tous les articles
        const articles = await Article.findAll();

        // Séparation des articles : en alerte vs normaux
        const articlesEnAlerte = articles.filter(article => article.quantity < article.stockThreshold);
        const articlesNormaux = articles.filter(article => article.quantity >= article.stockThreshold);

        // Initialisation du document PDF
        const doc = new PDFDocument();
        const fileName = 'export/articles.pdf';

        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
        doc.pipe(res);

        // Titre principal
        doc.fontSize(20).text('Rapport des Articles', { align: 'center' }).moveDown();

        // Section : Articles en Alerte
        doc.fontSize(16).text('Articles en Alerte', { underline: true, align: 'left' }).moveDown();
        articlesEnAlerte.forEach(article => {
            doc
                .fontSize(12)
                .text(
                    `ID: ${article.id} | Nom: ${article.name} | Catégorie: ${article.category} | Quantité: ${article.quantity} | Prix: ${article.price}€ | Seuil: ${article.stockThreshold}`,
                    { align: 'left' }
                )
                .moveDown();
        });

        // Section : Articles Normaux
        doc.addPage();
        doc.fontSize(16).text('Articles Normaux', { underline: true, align: 'left' }).moveDown();
        articlesNormaux.forEach(article => {
            doc
                .fontSize(12)
                .text(
                    `ID: ${article.id} | Nom: ${article.name} | Catégorie: ${article.category} | Quantité: ${article.quantity} | Prix: ${article.price}€ | Seuil: ${article.stockThreshold}`,
                    { align: 'left' }
                )
                .moveDown();
        });

        // Terminer et envoyer le document
        doc.end();
    } catch (err) {
        console.error('Erreur lors de la génération du PDF :', err);
        res.status(500).json({ error: 'Erreur lors de la génération du rapport.' });
    }
});

module.exports = router;
