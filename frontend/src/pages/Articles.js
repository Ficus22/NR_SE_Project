import React, { useEffect, useState } from 'react';
import { fetchArticles, addArticle, updateArticle, deleteArticle } from '../services/articleService';

const Articles = () => {
    // State to store the list of articles
    const [articles, setArticles] = useState([]);

    // State to manage the form data for adding or editing articles
    const [formData, setFormData] = useState({
        id: null,
        name: '',
        category: '',
        quantity: 0,
        price: 0,
        stockThreshold: 5,
    });

    // State to determine if the form is in editing mode
    const [isEditing, setIsEditing] = useState(false);

    // Load articles when the component is mounted
    useEffect(() => {
        loadArticles();
    }, []);

    // Fetch articles from the service and update the state
    const loadArticles = async () => {
        const data = await fetchArticles();
        setArticles(data);
    };

    // Handle changes in the form inputs and update the form data state
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission for adding or editing articles
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        if (isEditing) {
            // Update an existing article
            await updateArticle(formData.id, formData);
        } else {
            // Add a new article
            await addArticle(formData);
        }
        resetForm(); // Reset the form after submission
        loadArticles(); // Reload the articles to reflect changes
    };

    // Handle editing an article by pre-filling the form with its data
    const handleEdit = (article) => {
        setFormData(article);
        setIsEditing(true);
    };

    // Handle deleting an article after user confirmation
    const handleDelete = async (id) => {
        if (window.confirm('Confirm deletion of this article?')) {
            await deleteArticle(id);
            loadArticles(); // Reload the articles to reflect changes
        }
    };

    // Reset the form to its initial state
    const resetForm = () => {
        setFormData({ id: null, name: '', category: '', quantity: 0, price: 0, stockThreshold: 5 });
        setIsEditing(false);
    };

    return (
        <div className="p-8">
            {/* Title of the page */}
            <h1 className="text-3xl font-bold mb-6">Article Management</h1>

            {/* Form for adding or editing articles */}
            <form onSubmit={handleSubmit} className="mb-8 bg-gray-100 p-6 rounded shadow-md">
                <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Edit' : 'Add'} an Article</h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full mb-4 p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                    className="block w-full mb-4 p-2 border rounded"
                    required
                />
                <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="block w-full mb-4 p-2 border rounded"
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    className="block w-full mb-4 p-2 border rounded"
                />
                <input
                    type="number"
                    name="stockThreshold"
                    placeholder="Stock Threshold"
                    value={formData.stockThreshold}
                    onChange={handleChange}
                    className="block w-full mb-4 p-2 border rounded"
                />
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                    {isEditing ? 'Update' : 'Add'}
                </button>
                {isEditing && (
                    <button type="button" onClick={resetForm} className="ml-4 text-red-500">
                        Cancel
                    </button>
                )}
            </form>

            {/* Table displaying the list of articles */}
            <table className="w-full border-collapse">
                <thead>
                <tr className="bg-gray-200">
                    <th className="border p-2">ID</th>
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Category</th>
                    <th className="border p-2">Quantity</th>
                    <th className="border p-2">Price</th>
                    <th className="border p-2">Threshold</th>
                    <th className="border p-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {/* Render each article as a row in the table */}
                {articles.map((article) => (
                    <tr key={article.id} className="hover:bg-gray-100">
                        <td className="border p-2 text-center">{article.id}</td>
                        <td className="border p-2">{article.name}</td>
                        <td className="border p-2">{article.category}</td>
                        <td className="border p-2 text-center">{article.quantity}</td>
                        <td className="border p-2 text-center">{article.price} €</td>
                        <td className="border p-2 text-center">{article.stockThreshold}</td>
                        <td className="border p-2 text-center">
                            <button onClick={() => handleEdit(article)} className="text-blue-500 mr-2">
                                Edit
                            </button>
                            <button onClick={() => handleDelete(article.id)} className="text-red-500">
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Articles;
