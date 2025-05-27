import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Create the context
export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(() => localStorage.getItem("authToken"));

  
  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      try {
const storedToken = localStorage.getItem("authToken");
if (!storedToken) {
  setLoading(false);
  setToken(null);
  delete axios.defaults.headers.common["Authorization"];
  return;
}
setToken(storedToken);
axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
try {
  const response = await axios.get("http://localhost:8000/admin/auth/user/");
  setCurrentUser(response.data);
  setIsAuthenticated(true);
} catch (error) {
  
  localStorage.removeItem("authToken");
  setToken(null);
  delete axios.defaults.headers.common["Authorization"];
  setCurrentUser(null);
  setIsAuthenticated(false);
} finally {
  setLoading(false);
}
      } catch (error) {
        console.error("Failed to load user:", error);
        
        localStorage.removeItem("authToken");
        setToken(null);
        delete axios.defaults.headers.common["Authorization"];
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  // Login user and store token
  const loginUser = (userData, newToken) => {
    localStorage.setItem("authToken", newToken);
    setToken(newToken);
    // Set the authorization header
    axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
    setCurrentUser(userData);
    setIsAuthenticated(true);
  };

  // Logout user and remove token
  const logoutUser = () => {
    localStorage.removeItem("authToken");
    setToken(null);
    delete axios.defaults.headers.common["Authorization"];
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  // Update user data 
  const updateUser = (userData) => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      ...userData,
    }));
  };

  const value = {
    currentUser,
    isAuthenticated,
    loading,
    token,
    loginUser,
    logoutUser,
    updateUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
