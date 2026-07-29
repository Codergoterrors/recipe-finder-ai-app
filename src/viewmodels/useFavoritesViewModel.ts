import { useState, useEffect, useCallback } from 'react';
import type { UserFavorite } from '../models';
import { getFavorites, removeFavorite } from '../services';
import { useAuth } from './useAuth';

export interface UseFavoritesViewModelReturn {
  favorites: UserFavorite[];
  handleRemoveFavorite: (recipeId: string) => Promise<void>;
  refreshFavorites: () => Promise<void>;
}

export const useFavoritesViewModel = (): UseFavoritesViewModelReturn => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<UserFavorite[]>([]);

  const loadFavorites = useCallback(async () => {
    if (!user?.uid) {
      setFavorites([]);
      return;
    }
    try {
      const favList = await getFavorites(user.uid);
      setFavorites(favList);
    } catch (err) {
      console.error('Failed to load user favorites', err);
    }
  }, [user?.uid]);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const handleRemoveFavorite = async (recipeId: string) => {
    if (!user?.uid) return;
    try {
      await removeFavorite(user.uid, recipeId);
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
