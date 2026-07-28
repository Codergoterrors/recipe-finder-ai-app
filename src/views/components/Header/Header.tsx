import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

export const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div className="header-container">
        <NavLink to="/" className="brand-logo">
          <span className="logo-icon">🍳</span>
          <span className="logo-title">Recipe Finder</span>
        </NavLink>
        <nav className="header-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Home
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Favorites
          </NavLink>
        </nav>
      </div>
    </header>
  );
};
