import React from 'react';
import { useHomeViewModel } from '../../viewmodels';
import './HomePage.css';

export const HomePage: React.FC = () => {
  const { recipes, searchQuery, setSearchQuery, handleSearch, resetToRandom } =
    useHomeViewModel();

  return (
    <main className="home-container">
      <section className="search-section">
        <h1 className="search-heading">Discover & Search Delicious Recipes</h1>
        <form className="search-form" onSubmit={handleSearch}>
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search recipes (e.g., Chicken, Pasta, Cake)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={resetToRandom}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </section>

      <section className="recipes-grid-section">
        <h2 className="section-title">
          {searchQuery ? `Search Results for "${searchQuery}"` : 'Featured Recipes'}
        </h2>
        {recipes.length === 0 ? (
          <div className="no-recipes">No recipes found. Try another search term!</div>
        ) : (
          <div className="recipe-grid">
            {recipes.map((recipe) => (
              <article className="recipe-card" key={recipe.id}>
                <div className="card-image-wrapper">
                  <img
                    src={recipe.thumbnail}
                    alt={recipe.name}
                    className="card-image"
                    loading="lazy"
                  />
                  <span className="card-tag">{recipe.category}</span>
                </div>
                <div className="card-content">
                  <span className="card-area">{recipe.area} Cuisine</span>
                  <h3 className="card-title">{recipe.name}</h3>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};
