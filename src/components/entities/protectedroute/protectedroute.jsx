import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const user = localStorage.getItem('userEmail');
    return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
