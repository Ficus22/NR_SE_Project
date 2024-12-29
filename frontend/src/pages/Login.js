import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/authService';

const Login = () => {
    // State to store user credentials (email and password)
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    // State to handle error messages
    const [error, setError] = useState(null);

    // Hook to navigate between routes
    const navigate = useNavigate();

    // Function to handle input changes and update credentials state
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    // Function to handle form submission and login logic
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents the default form submission behavior
        try {
            const response = await login(credentials); // Calls the login service with the entered credentials
            localStorage.setItem('token', response.token); // Stores the token in local storage
            navigate('/dashboard'); // Redirects the user to the dashboard page
        } catch (err) {
            // Sets an error message if login fails
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="page-container flex items-center justify-center">
            {/* Login form */}
            <form onSubmit={handleSubmit} className="form-container">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Login</h2>

                {/* Error message display */}
                {error && <p className="alert-danger">{error}</p>}

                {/* Email input field */}
                <label className="input-label">Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="input-field"
                    onChange={handleChange}
                    required
                />

                {/* Password input field */}
                <label className="input-label">Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="input-field"
                    onChange={handleChange}
                    required
                />

                {/* Login button */}
                <button type="submit" className="btn-primary">
                    Login
                </button>

                {/* Link to the registration page */}
                <div className="text-center mt-4">
                    <p className="text-gray-600">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-blue-500 hover:underline">
                            Sign up here
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
