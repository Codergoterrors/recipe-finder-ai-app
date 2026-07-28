import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './views/components/Header/Header';
import { HomePage } from './views/pages/HomePage';
import { FavoritesPage } from './views/pages/FavoritesPage';
import './index.css';

export const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </Router>
  );
};

export default App;
