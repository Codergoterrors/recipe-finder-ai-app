import React from 'react';
import { useFavoritesViewModel } from '../../viewmodels';
import './FavoritesPage.css';

export const FavoritesPage: React.FC = () => {
  const { favorites, handleRemoveFavorite } = useFavoritesViewModel();

  return (
    <main className="favorites-container">
      <header className="favorites-header">
        <h1 className="favorites-title">Your Saved Favorites</h1>
        <p className="favorites-subtitle">
          {favorites.length === 1
            ? '1 recipe saved'
            : `${favorites.length} recipes saved for offline reference`}
        </p>
      </header>

      {favorites.length === 0 ? (
        <section className="empty-favorites">
          <div className="empty-icon">❤️</div>
          <h2>No Favorites Saved Yet</h2>
          <p>Explore recipes on the Home page and click the heart icon to save your favorites!</p>
        </section>
      ) : (
        <div className="favorites-grid">
          {favorites.map((fav) => (
            <article className="favorite-card" key={fav.id}>
              <div className="fav-image-wrapper">
                <img src={fav.thumbnail} alt={fav.name} className="fav-image" loading="lazy" />
                <button
                  type="button"
                  className="remove-fav-btn"
                  onClick={() => handleRemoveFavorite(fav.id)}
                  aria-label="Remove favorite"
                  title="Remove from favorites"
                >
                  🗑️
                </button>
              </div>
              <div className="fav-content">
                <h3 className="fav-card-title">{fav.name}</h3>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
};
