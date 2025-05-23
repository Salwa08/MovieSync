import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/login_signUp/RegisterPage';
import MoviesPage from './pages/MoviesPage';
import LoginPage from './pages/login_signUp/LoginPage';
import MovieDetails from './pages/movieDetails/movieDetailsPage';
import ForgotPasswordPage from './pages/login_signUp/ForgotPasswordPage';
import InputDesign from './pages/LandingPage/InputDesign';
import SearchPage from './pages/SearchPage/SearchPage';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route path="/" element={<RegisterPage />} /> */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/movies/" element={<MoviesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/" element={<InputDesign />} />
          <Route path="/search" element={<SearchPage />} />
          {/* Add more routes as needed */}

        </Routes>
      </div>
    </Router>
  );
}

export default App;