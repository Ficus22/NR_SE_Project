import React, { useEffect, useState } from 'react';
import { fetchArticles } from '../services/articleService';

const Alerts = () => {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        const loadAlerts = async () => {
            try {
                const articles = await fetchArticles();
                const filteredAlerts = articles.filter(
                    (article) => article.quantity < article.stockThreshold
                );
                setAlerts(filteredAlerts);
            } catch (error) {
                console.error('Erreur lors de la récupération des alertes :', error);
            }
        };

        loadAlerts();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Articles en Alerte</h1>

            {alerts.length > 0 ? (
                <table className="w-full border-collapse">
                    <thead>
                    <tr className="bg-red-100">
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Nom</th>
                        <th className="border p-2">Quantité</th>
                        <th className="border p-2">Seuil</th>
                    </tr>
                    </thead>
                    <tbody>
                    {alerts.map((alert) => (
                        <tr key={alert.id} className="hover:bg-red-50">
                            <td className="border p-2 text-center">{alert.id}</td>
                            <td className="border p-2">{alert.name}</td>
                            <td className="border p-2 text-center">{alert.quantity}</td>
                            <td className="border p-2 text-center">{alert.stockThreshold}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>Aucune alerte pour le moment.</p>
            )}
        </div>
    );
};

export default Alerts;
