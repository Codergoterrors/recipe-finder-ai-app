// MVVM Model Layer
// Holds data contracts, types, and core business logic schemas.

export interface Recipe {
  id: string;
  title: string;
  imageUrl?: string;
  summary?: string;
  readyInMinutes?: number;
  servings?: number;
}
