import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/login_signUp/RegisterPage';
import MoviesPage from './pages/MoviesPage';
import LoginPage from './pages/login_signUp/LoginPage';
import ForgotPasswordPage from './pages/login_signUp/ForgotPasswordPage';
import InputDesign from './pages/LandingPage/InputDesign';



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route path="/" element={<RegisterPage />} /> */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/movies/" element={<MoviesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/" element={<InputDesign />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;