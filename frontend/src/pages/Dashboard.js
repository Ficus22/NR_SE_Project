import React, { useEffect, useState } from 'react';
import { fetchArticles } from '../services/articleService';

const Dashboard = () => {
    const [articles, setArticles] = useState([]);
    const [alertCount, setAlertCount] = useState(0);

    // Charger les articles et compter les alertes
    useEffect(() => {
        const getArticles = async () => {
            try {
                const data = await fetchArticles();
                setArticles(data);
                const alerts = data.filter((article) => article.quantity < article.stockThreshold).length;
                setAlertCount(alerts);
            } catch (error) {
                console.error('Erreur lors du chargement des articles :', error);
            }
        };
        getArticles();
    }, []);

    return (
        <div className="page-container">
            {/* Titre principal */}
            <h1 className="page-title">Tableau de Bord</h1>

            {/* Cartes statistiques */}
            <div className="grid grid-cols-2 gap-6">
                {/* Carte : Total Articles */}
                <div className="dashboard-card">
                    <div>
                        <div className="label">Total Articles</div>
                        <div className="number">{articles.length}</div>
                    </div>
                    <div className="icon">📦</div>
                </div>

                {/* Carte : Articles en Alerte */}
                <div className="dashboard-card">
                    <div>
                        <div className="label">Articles en Alerte</div>
                        <div className="number text-red-500">{alertCount}</div>
                    </div>
                    <div className="icon">⚠️</div>
                </div>
            </div>

            {/* Tableau des articles */}
            <div className="card mt-8">
                <h2 className="card-title">Liste des Articles</h2>
                <table className="table">
                    <thead>
                    <tr className="table-header">
                        <th className="table-cell">ID</th>
                        <th className="table-cell">Nom</th>
                        <th className="table-cell">Quantité</th>
                        <th className="table-cell">Seuil</th>
                    </tr>
                    </thead>
                    <tbody>
                    {articles.map((article) => (
                        <tr key={article.id} className="table-row">
                            <td className="table-cell">{article.id}</td>
                            <td className="table-cell">{article.name}</td>
                            <td className="table-cell">{article.quantity}</td>
                            <td className="table-cell">{article.stockThreshold}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
