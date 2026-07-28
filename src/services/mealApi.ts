import type { Recipe } from '../models';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export interface RawMealDBRecipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strMealThumb: string;
  strInstructions: string;
  [key: string]: unknown;
}

/**
 * Maps raw TheMealDB API response to our application Recipe model.
 */
export const mapRawToRecipe = (raw: RawMealDBRecipe): Recipe => {
  return {
    id: raw.idMeal || '',
    name: raw.strMeal || '',
    category: raw.strCategory || 'Unknown',
    area: raw.strArea || 'Unknown',
    thumbnail: raw.strMealThumb || '',
    instructions: raw.strInstructions || '',
  };
};

/**
 * Search recipes by query string via search.php endpoint.
 */
export const searchMeals = async (query: string): Promise<Recipe[]> => {
  const response = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch recipes: ${response.statusText}`);
  }
  const data = await response.json();
  if (!data.meals || !Array.isArray(data.meals)) {
    return [];
  }
  return data.meals.map(mapRawToRecipe);
};

/**
 * Fetch a specified number of random meals by querying random.php endpoint multiple times.
 */
export const getRandomMeals = async (count: number): Promise<Recipe[]> => {
  const requests = Array.from({ length: count }, () =>
    fetch(`${BASE_URL}/random.php`).then(async (res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch random meal: ${res.statusText}`);
      }
      return res.json();
    })
  );

  const results = await Promise.all(requests);
  const recipes: Recipe[] = [];
  const seenIds = new Set<string>();

  for (const data of results) {
    if (data.meals && data.meals.length > 0) {
      const recipe = mapRawToRecipe(data.meals[0]);
      if (!seenIds.has(recipe.id)) {
        seenIds.add(recipe.id);
        recipes.push(recipe);
      }
    }
  }

  return recipes;
};
