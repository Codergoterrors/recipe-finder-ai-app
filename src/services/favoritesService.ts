import { ref, set, remove, get } from 'firebase/database';
import { db } from './firebase';
import type { UserFavorite } from '../models';

/**
 * Add a recipe to user's favorites in Firebase Realtime Database.
 */
export const addFavorite = async (userId: string, favorite: UserFavorite): Promise<void> => {
  const favoriteRef = ref(db, `favorites/${userId}/${favorite.id}`);
  await set(favoriteRef, favorite);
};

/**
 * Remove a recipe from user's favorites in Firebase Realtime Database.
 */
export const removeFavorite = async (userId: string, recipeId: string): Promise<void> => {
  const favoriteRef = ref(db, `favorites/${userId}/${recipeId}`);
  await remove(favoriteRef);
};

/**
 * Get all favorite recipes for a given user ID from Firebase Realtime Database.
 */
export const getFavorites = async (userId: string): Promise<UserFavorite[]> => {
  const userFavoritesRef = ref(db, `favorites/${userId}`);
  const snapshot = await get(userFavoritesRef);

  if (!snapshot.exists()) {
    return [];
  }

  const data = snapshot.val();
  if (typeof data !== 'object' || data === null) {
    return [];
  }

  return Object.values(data) as UserFavorite[];
};
