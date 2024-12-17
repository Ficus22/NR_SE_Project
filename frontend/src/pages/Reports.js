import React from 'react';
import api from '../services/api';

const Reports = () => {
    const downloadCSV = async () => {
        try {
            const response = await api.get('/reports/csv', { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'articles.csv');
            document.body.appendChild(link);
            link.click();
        } catch (err) {
            console.error('Erreur lors du téléchargement du rapport CSV :', err);
        }
    };

    const downloadPDF = async () => {
        try {
            const response = await api.get('/reports/pdf', { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'articles.pdf');
            document.body.appendChild(link);
            link.click();
        } catch (err) {
            console.error('Erreur lors du téléchargement du rapport PDF :', err);
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Génération des Rapports</h1>

            <div className="flex flex-col gap-6">
                <div className="p-6 bg-white rounded shadow-md">
                    <h2 className="text-xl mb-4">Télécharger le rapport CSV</h2>
                    <button
                        onClick={downloadCSV}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                    >
                        Télécharger CSV
                    </button>
                </div>

                <div className="p-6 bg-white rounded shadow-md">
                    <h2 className="text-xl mb-4">Télécharger le rapport PDF</h2>
                    <button
                        onClick={downloadPDF}
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
                    >
                        Télécharger PDF
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Reports;
