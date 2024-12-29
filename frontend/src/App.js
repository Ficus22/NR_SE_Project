import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Reports from './pages/Reports';
import Alerts from './pages/Alerts';
import ArticleTable from './components/ArticleTable'; // Import the ArticleTable component
import StockBarChart from './components/StockBarChart'; // Import the StockBarChart component
import './styles/global.css';

// Function to check if the user is  authenticated
const isAuthenticated = () => {
    return !!localStorage.getItem('token'); // Returns true if a token exists in localStorage
};

// Private route component: renders the element only if the user is authenticated
const PrivateRoute = ({ element }) => {
    return isAuthenticated() ? element : <Navigate to="/login" />;
};

function App() {
    return (
        <Router>
            <Routes>
                {/* Default route redirects to the login page */}
                <Route path="/" element={<Navigate to="/login" />} />

                {/* Route for the login page */}
                <Route path="/login" element={<Login />} />

                {/* Route for the registration page */}
                <Route path="/register" element={<Register />} />

                {/* Protected routes */}
                <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
                <Route path="/articles" element={<PrivateRoute element={<ArticleTable />} />} /> {/* Use ArticleTable for articles */}
                <Route path="/reports" element={<PrivateRoute element={<Reports />} />} />
                <Route path="/alerts" element={<PrivateRoute element={<Alerts />} />} />
                <Route path="/stock-chart" element={<PrivateRoute element={<StockBarChart />} />} /> {/* Add StockBarChart route */}
            </Routes>
        </Router>
    );
}

export default App;
