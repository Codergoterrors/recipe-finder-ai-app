import { useState, useEffect, useCallback } from 'react';
import type { UserFavorite } from '../models';
import { getFavorites, removeFavorite } from '../services';

const DEFAULT_USER_ID = 'test-user-1';

export interface UseFavoritesViewModelReturn {
  favorites: UserFavorite[];
  handleRemoveFavorite: (recipeId: string) => Promise<void>;
  refreshFavorites: () => Promise<void>;
}

export const useFavoritesViewModel = (): UseFavoritesViewModelReturn => {
  const [favorites, setFavorites] = useState<UserFavorite[]>([]);

  const loadFavorites = useCallback(async () => {
    try {
      const favList = await getFavorites(DEFAULT_USER_ID);
      setFavorites(favList);
    } catch (err) {
      console.error('Failed to load user favorites', err);
    }
  }, []);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const handleRemoveFavorite = async (recipeId: string) => {
    try {
      await removeFavorite(DEFAULT_USER_ID, recipeId);
      setFavorites((prev) => prev.filter((fav) => fav.id !== recipeId));
    } catch (err) {
      console.error('Failed to remove favorite', err);
    }
  };

  return {
    favorites,
    handleRemoveFavorite,
    refreshFavorites: loadFavorites,
  };
};
