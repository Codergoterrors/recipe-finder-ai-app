/**
 * Recipe Model
 * Represents full recipe details.
 */
export interface Recipe {
  id: string;
  name: string;
  category: string;
  area: string;
  thumbnail: string;
  instructions: string;
}
