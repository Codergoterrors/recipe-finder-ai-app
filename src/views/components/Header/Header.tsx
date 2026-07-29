import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../viewmodels/useAuth';
import './Header.css';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Failed to log out', err);
    }
  };

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
          {user && (
            <NavLink
              to="/favorites"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              Favorites
            </NavLink>
          )}

          {user ? (
            <div className="user-section">
              <span className="user-email" title={user.email || ''}>
                {user.email}
              </span>
              <button type="button" className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                Register
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
