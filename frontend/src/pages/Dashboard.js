import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import { fetchArticles } from '../services/articleService';
import StockBarChart from '../components/StockBarChart'; // Import the StockBarChart component

const Dashboard = () => {
    const [articles, setArticles] = useState([]);
    const [alertCount, setAlertCount] = useState(0);
    const navigate = useNavigate(); // Initialize navigation

    // Load articles and count alerts
    useEffect(() => {
        const getArticles = async () => {
            try {
                const data = await fetchArticles();
                setArticles(data);
                const alerts = data.filter((article) => article.quantity < article.stockThreshold).length;
                setAlertCount(alerts);
            } catch (error) {
                console.error('Error loading articles:', error);
            }
        };
        getArticles();
    }, []);

    return (
        <div className="page-container">
            {/* Main title */}
            <h1 className="page-title">Dashboard</h1>

            {/* Statistics cards */}
            <div className="grid grid-cols-2 gap-6">
                {/* Card: Total Articles */}
                <div className="dashboard-card">
                    <div>
                        <div className="label">Total Articles</div>
                        <div className="number">{articles.length}</div>
                    </div>
                    <div className="icon">📦</div>
                </div>

                {/* Card: Articles in Alert */}
                <div className="dashboard-card">
                    <div>
                        <div className="label">Articles in Alert</div>
                        <div className="number text-red-500">{alertCount}</div>
                    </div>
                    <div className="icon">⚠️</div>
                </div>
            </div>

            {/* Bar Chart */}
            <div className="card mt-8">
                <h2 className="card-title">Stock Overview</h2>
                <StockBarChart /> {/* Embed the bar chart here */}
            </div>

            {/* Articles table */}
            <div className="card mt-8">
                <h2 className="card-title">Articles List</h2>
                <table className="table">
                    <thead>
                    <tr className="table-header">
                        <th className="table-cell">ID</th>
                        <th className="table-cell">Name</th>
                        <th className="table-cell">Quantity</th>
                        <th className="table-cell">Threshold</th>
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
