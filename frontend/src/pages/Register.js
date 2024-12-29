import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/authService';

const Register = () => {
    // State to store user registration data
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
    });

    // State to handle error messages
    const [error, setError] = useState(null);

    // State to handle success messages
    const [success, setSuccess] = useState(null);

    // Hook to navigate between routes
    const navigate = useNavigate();

    // Function to handle input changes and update userData state
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    // Function to handle form submission and registration logic
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents the default form submission behavior
        try {
            await register(userData); // Calls the register service with the entered data
            setSuccess("Registration successful! You can now log in."); // Sets success message
            setError(null); // Clears any previous error message
            setTimeout(() => navigate('/login'), 1500); // Redirects to login after 1.5 seconds
        } catch (err) {
            // Sets an error message if registration fails
            setError('Registration failed. Please check your information.');
            setSuccess(null); // Clears any previous success message
        }
    };

    return (
        <div className="page-container flex items-center justify-center">
            {/* Registration form */}
            <form onSubmit={handleSubmit} className="form-container">
                <h2 className="text-3xl font-bold text-center text-green-600 mb-6">Register</h2>

                {/* Display success or error messages */}
                {error && <p className="alert-danger">{error}</p>}
                {success && <p className="alert-success">{success}</p>}

                {/* Username input field */}
                <label className="input-label">Username</label>
                <input
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    className="input-field"
                    onChange={handleChange}
                    required
                />

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

                {/* Registration button */}
                <button type="submit" className="btn-secondary">
                    Register
                </button>

                {/* Link to navigate back to the login page */}
                <div className="text-center mt-4">
                    <p className="text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-500 hover:underline">
                            Log in here
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Register;
