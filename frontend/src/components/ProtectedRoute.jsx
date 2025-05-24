import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useUser();
  const location = useLocation();

  console.log('PROTECTED ROUTE CHECK:', { 
    isAuthenticated, 
    loading, 
    path: location.pathname,
    time: new Date().toISOString()
  });

  // Force redirect if not authenticated and not loading
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      console.log('Force redirecting unauthenticated user to login');
      window.location.href = '/login'; // Forceful redirect
    }
  }, [loading, isAuthenticated]);

  // Still show loading state while authentication check is in progress
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  // React Router's Navigate component as a fallback
  if (!isAuthenticated) {
    console.log('Using Navigate for unauthenticated user');
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Only render children if authenticated
  console.log('User authenticated, rendering protected content');
  return children;
};

export default ProtectedRoute;