import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const NavigationGuard = ({ children }) => {
  const { isAuthenticated, loading } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  
  const publicRoutes = ['/', '/login', '/register', '/forgot-password'];
  
  useEffect(() => {
    // Only check routes after loading completes
    if (!loading) {
      const isPublicRoute = publicRoutes.some(route => 
        location.pathname === route || 
        location.pathname.startsWith(route + '/')
      );
      
      if (!isAuthenticated && !isPublicRoute) {
        navigate('/login', { 
          state: { from: location.pathname },
          replace: true 
        });
      }
    }
  }, [location.pathname, isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return children;
};

export default NavigationGuard;