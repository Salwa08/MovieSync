import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Create the context
export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load user from token on initial render
  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      try {
        // Check for token in localStorage
        const token = localStorage.getItem('authToken');
        if (!token) {
          setLoading(false);
          return;
        }
        
        // Set the authorization header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Get user profile with the token
        const response = await axios.get('http://localhost:8000/admin/auth/user/');
        setCurrentUser(response.data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to load user:", error);
        // Clear invalid token
        localStorage.removeItem('authToken');
        delete axios.defaults.headers.common['Authorization'];
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Login user and store token
  const loginUser = (userData, token) => {
    localStorage.setItem('authToken', token);
    // Set the authorization header
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setCurrentUser(userData);
    setIsAuthenticated(true);
  };

  // Logout user and remove token
  const logoutUser = () => {
    localStorage.removeItem('authToken');
    delete axios.defaults.headers.common['Authorization'];
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  // Update user data (e.g., after profile update)
  const updateUser = (userData) => {
    setCurrentUser(prevUser => ({
      ...prevUser,
      ...userData
    }));
  };

  const value = {
    currentUser,
    isAuthenticated,
    loading,
    loginUser,
    logoutUser,
    updateUser
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};