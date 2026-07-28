import { useState, useEffect, useCallback } from 'react';
import type { Recipe, UserFavorite } from '../models';
import { getRandomMeals, searchMeals, addFavorite, removeFavorite, getFavorites } from '../services';

const DEFAULT_USER_ID = 'test-user-1';

export interface UseHomeViewModelReturn {
  recipes: Recipe[];
  searchQuery: string;
  favoriteIds: Set<string>;
  setSearchQuery: (query: string) => void;
  handleSearch: (e?: React.FormEvent) => Promise<void>;
  resetToRandom: () => Promise<void>;
  toggleFavorite: (recipe: Recipe) => Promise<void>;
}

export const useHomeViewModel = (initialRandomCount: number = 8): UseHomeViewModelReturn => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  const loadFavorites = useCallback(async () => {
    try {
      const favs = await getFavorites(DEFAULT_USER_ID);
      const ids = new Set(favs.map((f) => f.id));
      setFavoriteIds(ids);
    } catch (err) {
      console.error('Failed to load favorites', err);
    }
  }, []);

  const loadRandomRecipes = useCallback(async () => {
    try {
      const randomMeals = await getRandomMeals(initialRandomCount);
      setRecipes(randomMeals);
    } catch (err) {
      console.error('Failed to load random recipes', err);
    }
  }, [initialRandomCount]);

  useEffect(() => {
    loadRandomRecipes();
    loadFavorites();
  }, [loadRandomRecipes, loadFavorites]);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    const trimmed = searchQuery.trim();
    if (!trimmed) {
      await loadRandomRecipes();
      return;
    }
    try {
      const searchResults = await searchMeals(trimmed);
      setRecipes(searchResults);
    } catch (err) {
      console.error('Failed to search meals', err);
    }
  };

  const resetToRandom = async () => {
    setSearchQuery('');
    await loadRandomRecipes();
  };

  const toggleFavorite = async (recipe: Recipe) => {
    const isFav = favoriteIds.has(recipe.id);
    try {
      if (isFav) {
        await removeFavorite(DEFAULT_USER_ID, recipe.id);
        setFavoriteIds((prev) => {
          const next = new Set(prev);
          next.delete(recipe.id);
          return next;
        });
      } else {
        const favorite: UserFavorite = {
          id: recipe.id,
          name: recipe.name,
          thumbnail: recipe.thumbnail,
        };
        await addFavorite(DEFAULT_USER_ID, favorite);
        setFavoriteIds((prev) => new Set(prev).add(recipe.id));
      }
    } catch (err) {
      console.error('Failed to toggle favorite', err);
    }
  };

  return {
    recipes,
    searchQuery,
    favoriteIds,
    setSearchQuery,
    handleSearch,
    resetToRandom,
    toggleFavorite,
  };
};
