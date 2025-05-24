import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import RegisterPage from './pages/login_signUp/RegisterPage';
import MoviesPage from './pages/MoviesPage';
import LoginPage from './pages/login_signUp/LoginPage';
import MovieDetails from './pages/movieDetails/movieDetailsPage';
import ForgotPasswordPage from './pages/login_signUp/ForgotPasswordPage';
import InputDesign from './pages/LandingPage/InputDesign';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import SearchPage from './pages/SearchPage/SearchPage';


function App() {
  return (
    <Router>
      <UserProvider>
      <div className="App">
        <Routes> 
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/" element={<InputDesign />} />

          <Route path="/search" element={<SearchPage />} />
          {/* Add more routes as needed */}
          <Route path="/home/" element={
              <ProtectedRoute>
                <MoviesPage />
              </ProtectedRoute>
            } />

          <Route path="/home/:id" element={
            <ProtectedRoute>
              <MovieDetails />
            </ProtectedRoute>
          } />

            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />

        </Routes>
      </div>
    </UserProvider>
    </Router>
  );
}

export default App;