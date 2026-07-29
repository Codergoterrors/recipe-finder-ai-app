import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './viewmodels/useAuth';
import { Header } from './views/components/Header/Header';
import { ProtectedRoute } from './views/components/ProtectedRoute';
import { HomePage } from './views/pages/HomePage';
import { FavoritesPage } from './views/pages/FavoritesPage';
import { LoginPage } from './views/pages/LoginPage';
import { RegisterPage } from './views/pages/RegisterPage';
import './index.css';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <FavoritesPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
