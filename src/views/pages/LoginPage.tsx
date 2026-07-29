import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../viewmodels/useAuth';
import './AuthPage.css';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to log in. Please check your credentials.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-page-container">
      <div className="auth-card">
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Log in to manage your saved recipe favorites</p>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              className="auth-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="auth-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-button" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <footer className="auth-footer">
          <p>
            Don't have an account? <Link to="/register" className="auth-link">Register here</Link>
          </p>
        </footer>
      </div>
    </main>
  );
};
