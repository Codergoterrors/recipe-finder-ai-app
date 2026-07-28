import { useState, useEffect, useCallback } from 'react';
import type { Recipe } from '../models';
import { getRandomMeals, searchMeals } from '../services';

export interface UseHomeViewModelReturn {
  recipes: Recipe[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e?: React.FormEvent) => Promise<void>;
  resetToRandom: () => Promise<void>;
}

export const useHomeViewModel = (initialRandomCount: number = 8): UseHomeViewModelReturn => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

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
  }, [loadRandomRecipes]);

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

  return {
    recipes,
    searchQuery,
    setSearchQuery,
    handleSearch,
    resetToRandom,
  };
};
