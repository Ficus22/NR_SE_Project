import React, { useEffect, useState } from 'react';
import { fetchArticles, addArticle, updateArticle, deleteArticle } from '../services/articleService';

const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [formData, setFormData] = useState({
        id: null,
        name: '',
        category: '',
        quantity: 0,
        price: 0,
        stockThreshold: 5,
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        loadArticles();
    }, []);

    const loadArticles = async () => {
        const data = await fetchArticles();
        setArticles(data);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditing) {
            await updateArticle(formData.id, formData);
        } else {
            await addArticle(formData);
        }
        resetForm();
        loadArticles();
    };

    const handleEdit = (article) => {
        setFormData(article);
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Confirmer la suppression de cet article ?')) {
            await deleteArticle(id);
            loadArticles();
        }
    };

    const resetForm = () => {
        setFormData({ id: null, name: '', category: '', quantity: 0, price: 0, stockThreshold: 5 });
        setIsEditing(false);
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Gestion des Articles</h1>

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="mb-8 bg-gray-100 p-6 rounded shadow-md">
                <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Modifier' : 'Ajouter'} un Article</h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Nom"
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full mb-4 p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Catégorie"
                    value={formData.category}
                    onChange={handleChange}
                    className="block w-full mb-4 p-2 border rounded"
                    required
                />
                <input
                    type="number"
                    name="quantity"
                    placeholder="Quantité"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="block w-full mb-4 p-2 border rounded"
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Prix"
                    value={formData.price}
                    onChange={handleChange}
                    className="block w-full mb-4 p-2 border rounded"
                />
                <input
                    type="number"
                    name="stockThreshold"
                    placeholder="Seuil d'Alerte"
                    value={formData.stockThreshold}
                    onChange={handleChange}
                    className="block w-full mb-4 p-2 border rounded"
                />
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                    {isEditing ? 'Mettre à jour' : 'Ajouter'}
                </button>
                {isEditing && (
                    <button type="button" onClick={resetForm} className="ml-4 text-red-500">
                        Annuler
                    </button>
                )}
            </form>

            {/* Tableau des articles */}
            <table className="w-full border-collapse">
                <thead>
                <tr className="bg-gray-200">
                    <th className="border p-2">ID</th>
                    <th className="border p-2">Nom</th>
                    <th className="border p-2">Catégorie</th>
                    <th className="border p-2">Quantité</th>
                    <th className="border p-2">Prix</th>
                    <th className="border p-2">Seuil</th>
                    <th className="border p-2">Actions</th>
                </tr>
                </thead>
                <tbody>
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
                                Modifier
                            </button>
                            <button onClick={() => handleDelete(article.id)} className="text-red-500">
                                Supprimer
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
