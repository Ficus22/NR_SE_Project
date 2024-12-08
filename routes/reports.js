const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const { createObjectCsvWriter } = require('csv-writer');
const PDFDocument = require('pdfkit');

// Génération du CSV
router.get('/csv', async (req, res) => {
    try {
        const articles = await Article.findAll();

        // Séparation des articles
        const articlesEnAlerte = articles.filter(article => article.quantity < article.stockThreshold);
        const articlesNormaux = articles.filter(article => article.quantity >= article.stockThreshold);

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

        // Création d'un tableau clair avec le statut
        const articlesRapport = [
            ...articlesEnAlerte.map(a => ({ ...a.dataValues, status: 'En Alerte' })),
            ...articlesNormaux.map(a => ({ ...a.dataValues, status: 'Normal' }))
        ];

        await csvWriter.writeRecords(articlesRapport);
        res.download('export/articles.csv');
    } catch (err) {
        console.error('Erreur lors de la génération du CSV :', err);
        res.status(500).json({ error: 'Erreur lors de la génération du rapport.' });
    }
});


// Génération du PDF
router.get('/pdf', async (req, res) => {
    try {
        const articles = await Article.findAll();

        // Séparation des articles
        const articlesEnAlerte = articles.filter(article => article.quantity < article.stockThreshold);
        const articlesNormaux = articles.filter(article => article.quantity >= article.stockThreshold);

        const doc = new PDFDocument();
        const fileName = 'export/articles.pdf';

        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
        doc.pipe(res);

        doc.fontSize(20).text('Rapport des Articles', { align: 'center' }).moveDown();

        // Section 1 : Articles en Alerte
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

        // Section 2 : Articles Normaux
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

        doc.end();
    } catch (err) {
        console.error('Erreur lors de la génération du PDF :', err);
        res.status(500).json({ error: 'Erreur lors de la génération du rapport.' });
    }
});


module.exports = router;
