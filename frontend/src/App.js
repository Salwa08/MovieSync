import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import RegisterPage from "./pages/login_signUp/RegisterPage";
import MoviesPage from "./pages/MoviesPage";
import LoginPage from "./pages/login_signUp/LoginPage";
import MovieDetailsPage from "./pages/movieDetails/movieDetailsPage";
import ForgotPasswordPage from "./pages/login_signUp/ForgotPasswordPage";
import InputDesign from "./pages/LandingPage/InputDesign";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import SearchPage from "./pages/SearchPage/SearchPage";
import FilmsPage from "./pages/FilmsPage";
import SeriesPage from "./pages/SeriesPage";
import DocumentaryPage from "./pages/DocumentaryPage";
import SportsPage from "./pages/SportsPage";
import KidsPage from "./pages/KidsPage";

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
            <Route path="/films" element={<FilmsPage />} />
            <Route path="/series" element={<SeriesPage />} />
            <Route path="/documentary" element={<DocumentaryPage />} />
            <Route path="/sports" element={<SportsPage />} />
            <Route path="/kids" element={<KidsPage />} />
            <Route
              path="/home/"
              element={
                <ProtectedRoute>
                  <MoviesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/home/:id"
              element={
                <ProtectedRoute>
                  <MovieDetailsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />{" "}
            <Route path="/film/:id" element={<MovieDetailsPage />} />
            <Route
              path="/series/:id"
              element={<MovieDetailsPage isSerie={true} />}
            />
            <Route
              path="/documentary/:id"
              element={<MovieDetailsPage isSerie={false} />}
            />
            <Route
              path="/kids/:id"
              element={<MovieDetailsPage isSerie={false} />}
            />
          </Routes>
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;
