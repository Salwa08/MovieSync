import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useUser();
  const location = useLocation();

  if (loading) {
    // Display loading indicator while checking authentication
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  // If user is not logged in, redirect to login page
  // and remember the page they tried to access
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // If user is logged in, render the protected component
  return children;
};

export default ProtectedRoute;