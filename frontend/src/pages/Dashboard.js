import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchArticles } from '../services/articleService';
import StockBarChart from '../components/StockBarChart';
import AddArticle from '../components/AddArticle';

const Dashboard = () => {
    const [articles, setArticles] = useState([]);
    const [alertCount, setAlertCount] = useState(0);
    const [sortCriteria, setSortCriteria] = useState('name'); // Default sort by name
    const [editingArticleId, setEditingArticleId] = useState(null);
    const [editedArticle, setEditedArticle] = useState(null);
    const navigate = useNavigate();

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

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/articles/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setArticles((prevArticles) => prevArticles.filter((article) => article.id !== id));
                console.log(`Article with ID ${id} deleted successfully.`);
            } else {
                console.error(`Failed to delete article with ID ${id}`);
            }
        } catch (error) {
            console.error(`Error deleting article with ID ${id}:`, error);
        }
    };

    const handleUpdate = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/articles/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedArticle),
            });

            if (response.ok) {
                const updatedArticle = await response.json();
                setArticles((prevArticles) =>
                    prevArticles.map((article) => (article.id === id ? updatedArticle : article))
                );
                setEditingArticleId(null);
                setEditedArticle(null);
                console.log(`Article with ID ${id} updated successfully.`);
            } else {
                console.error(`Failed to update article with ID ${id}`);
            }
        } catch (error) {
            console.error(`Error updating article with ID ${id}:`, error);
        }
    };

    // Function to sort articles based on the selected criteria
    const getSortedArticles = () => {
        return [...articles].sort((a, b) => {
            if (sortCriteria === 'name') {
                return a.name.localeCompare(b.name); // Sort alphabetically by name
            } else if (sortCriteria === 'category') {
                return a.category.localeCompare(b.category); // Sort alphabetically by category
            } else if (sortCriteria === 'quantity') {
                return b.quantity - a.quantity; // Sort numerically by remaining stock (descending)
            }
            return 0;
        });
    };

    return (
        <div className="page-container">
            <h1 className="page-title">Dashboard</h1>

            <div className="grid grid-cols-2 gap-6">
                <div className="dashboard-card">
                    <div>
                        <div className="label">Total Articles</div>
                        <div className="number">{articles.length}</div>
                    </div>
                    <div className="icon">📦</div>
                </div>

                <div className="dashboard-card">
                    <div>
                        <div className="label">Articles in Alert</div>
                        <div className="number text-red-500">{alertCount}</div>
                    </div>
                    <div className="icon">⚠️</div>
                </div>
            </div>

            <div className="card mt-8">
                <h2 className="card-title">Stock Overview</h2>
                <StockBarChart />
            </div>

            <div className="card mt-8">
                <h2 className="card-title">Add a New Article</h2>
                <AddArticle onArticleAdded={(newArticle) => setArticles((prev) => [...prev, newArticle])} />
            </div>

            <div className="card mt-8">
                <div className="flex justify-between items-center">
                    <h2 className="card-title">Articles List</h2>
                    <select
                        value={sortCriteria}
                        onChange={(e) => setSortCriteria(e.target.value)}
                        className="sort-select"
                    >
                        <option value="name">Sort by Name</option>
                        <option value="category">Sort by Category</option>
                        <option value="quantity">Sort by Remaining Stock</option>
                    </select>
                </div>
                <table className="table">
                    <thead>
                    <tr className="table-header">
                        <th className="table-cell">ID</th>
                        <th className="table-cell">Name</th>
                        <th className="table-cell">Category</th>
                        <th className="table-cell">Quantity</th>
                        <th className="table-cell">Threshold</th>
                        <th className="table-cell">Price</th>
                        <th className="table-cell">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {getSortedArticles().map((article) => (
                        <tr
                            key={article.id}
                            className={`table-row ${
                                article.quantity < article.stockThreshold ? 'alert-row' : ''
                            }`}
                        >
                            <td className="table-cell">{article.id}</td>
                            <td className="table-cell">
                                {editingArticleId === article.id ? (
                                    <input
                                        type="text"
                                        value={editedArticle?.name || article.name}
                                        onChange={(e) =>
                                            setEditedArticle((prev) => ({ ...prev, name: e.target.value }))
                                        }
                                    />
                                ) : (
                                    article.name
                                )}
                            </td>
                            <td className="table-cell">
                                {editingArticleId === article.id ? (
                                    <input
                                        type="text"
                                        value={editedArticle?.category || article.category}
                                        onChange={(e) =>
                                            setEditedArticle((prev) => ({ ...prev, category: e.target.value }))
                                        }
                                    />
                                ) : (
                                    article.category
                                )}
                            </td>
                            <td className="table-cell">
                                {editingArticleId === article.id ? (
                                    <input
                                        type="number"
                                        value={editedArticle?.quantity || article.quantity}
                                        onChange={(e) =>
                                            setEditedArticle((prev) => ({
                                                ...prev,
                                                quantity: parseInt(e.target.value, 10),
                                            }))
                                        }
                                    />
                                ) : (
                                    article.quantity
                                )}
                            </td>
                            <td className="table-cell">
                                {editingArticleId === article.id ? (
                                    <input
                                        type="number"
                                        value={editedArticle?.stockThreshold || article.stockThreshold}
                                        onChange={(e) =>
                                            setEditedArticle((prev) => ({
                                                ...prev,
                                                stockThreshold: parseInt(e.target.value, 10),
                                            }))
                                        }
                                    />
                                ) : (
                                    article.stockThreshold
                                )}
                            </td>
                            <td className="table-cell">
                                {editingArticleId === article.id ? (
                                    <input
                                        type="number"
                                        value={editedArticle?.price || article.price}
                                        onChange={(e) =>
                                            setEditedArticle((prev) => ({
                                                ...prev,
                                                price: parseFloat(e.target.value),
                                            }))
                                        }
                                    />
                                ) : (
                                    article.price.toFixed(2)
                                )}
                            </td>
                            <td className="table-cell">
                                {editingArticleId === article.id ? (
                                    <>
                                        <button
                                            onClick={() => handleUpdate(article.id)}
                                            className="update-button"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => {
                                                setEditingArticleId(null);
                                                setEditedArticle(null);
                                            }}
                                            className="cancel-button"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => {
                                                setEditingArticleId(article.id);
                                                setEditedArticle(article);
                                            }}
                                            className="edit-button"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(article.id)}
                                            className="delete-button"
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
