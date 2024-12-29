import React, { useEffect, useState } from 'react';
import { fetchArticles } from '../services/articleService';

const Alerts = () => {
    // State to store articles that trigger alerts
    const [alerts, setAlerts] = useState([]);

    // Effect to load alerts when the component is mounted
    useEffect(() => {
        const loadAlerts = async () => {
            try {
                // Fetch all articles from the service
                const articles = await fetchArticles();

                // Filter articles that are below their stock threshold
                const filteredAlerts = articles.filter(
                    (article) => article.quantity < article.stockThreshold
                );

                // Update the alerts state with the filtered articles
                setAlerts(filteredAlerts);
            } catch (error) {
                // Log any errors that occur during the fetching process
                console.error('Error while fetching alerts:', error);
            }
        };

        loadAlerts(); // Call the function to load alerts
    }, []);

    return (
        <div className="p-8">
            {/* Title for the alerts section */}
            <h1 className="text-3xl font-bold mb-6">Low Stock Alerts</h1>

            {/* Check if there are any alerts to display */}
            {alerts.length > 0 ? (
                <table className="w-full border-collapse">
                    <thead>
                    <tr className="bg-red-100">
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Quantity</th>
                        <th className="border p-2">Threshold</th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* Render each alert as a table row */}
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
                // Display this message if there are no alerts
                <p>No alerts at the moment.</p>
            )}
        </div>
    );
};

export default Alerts;
