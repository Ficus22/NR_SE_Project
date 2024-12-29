import React, { useState } from 'react';

const AddArticle = ({ onArticleAdded }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [stockThreshold, setStockThreshold] = useState(0);
    const [price, setPrice] = useState(0);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate inputs
        if (!name || !category || quantity <= 0 || stockThreshold < 0 || price <= 0) {
            setError('All fields must be valid and filled out.');
            return;
        }

        const newArticle = {
            name,
            category,
            quantity,
            stockThreshold,
            price,
        };

        try {
            const response = await fetch('http://localhost:3000/api/articles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newArticle),
            });

            if (response.ok) {
                const addedArticle = await response.json();
                onArticleAdded(addedArticle); // Notify parent component
                setName(''); // Reset form
                setCategory('');
                setQuantity(0);
                setStockThreshold(0);
                setPrice(0);
                setError(''); // Clear errors
            } else {
                setError('Failed to add article. Please try again.');
            }
        } catch (err) {
            console.error('Error adding article:', err);
            setError('An unexpected error occurred.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-article-form">
            <h2>Add a New Article</h2>

            {/* Display error message */}
            {error && <p className="error-message">{error}</p>}

            {/* Input fields with labels */}
            <div className="form-group">
                <label>Article Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter the article name"
                    required
                />
            </div>

            <div className="form-group">
                <label>Category</label>
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Enter the article category"
                    required
                />
            </div>

            <div className="form-group">
                <label>Quantity</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    placeholder="Enter the quantity"
                    required
                />
            </div>

            <div className="form-group">
                <label>Stock Threshold</label>
                <input
                    type="number"
                    value={stockThreshold}
                    onChange={(e) => setStockThreshold(Number(e.target.value))}
                    placeholder="Enter the stock threshold"
                    required
                />
            </div>

            <div className="form-group">
                <label>Price</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    placeholder="Enter the price"
                    required
                />
            </div>

            <button type="submit" className="submit-button">Add Article</button>
        </form>
    );
};

export default AddArticle;
