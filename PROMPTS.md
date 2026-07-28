# Prompt History & Log

## Prompt 1: Initial Setup & MVVM Routing

**Prompt Text:**
> This is a React + TypeScript + Vite project called Recipe Finder. 
> We're following the MVVM (Model-View-ViewModel) pattern throughout: 
> models hold data shape/business logic, view-models hold React state 
> and side effects, views only render UI and receive data via props/hooks.
> 
> Set up react-router-dom with two routes: "/" (Home) and "/favorites" 
> (Favorites). Create a Header component with navigation links to both.
> 
> Constraints:
> - Do not install any UI library (no Tailwind, no shadcn, no MUI). 
>   Use plain CSS.
> - Do not create any components beyond Header and empty placeholder 
>   pages for Home and Favorites right now.
> - Do not add loading or error state yet — that comes later.

**Summary of Output:**
Established MVVM directory structure (`src/models`, `src/viewmodels`, `src/views`), configured `react-router-dom` with routes for Home (`/`) and Favorites (`/favorites`), created sticky glassmorphic Header navigation with active link highlighting, and added base plain CSS styles.

---

## Prompt 2: Data Models (TypeScript Interfaces)

**Prompt Text:**
> Create the data models for this app in a models/ folder (or add to 
> the existing src/models/index.ts): 
> - Recipe model: id, name, category, area, thumbnail image URL, 
>   instructions
> - User favorite model: recipe id, name, thumbnail (only what's 
>   needed to render a favorites list card)
> 
> These are just TypeScript interfaces/types — no logic, no fetching, 
> no components yet.

**Summary of Output:**
Defined TypeScript interfaces `Recipe` and `UserFavorite` in `src/models/Recipe.ts` and `src/models/Favorite.ts`, re-exported via `src/models/index.ts`.

---

## Prompt 3: API Service Layer

**Prompt Text:**
> Create a service layer in a services/ folder that talks to 
> TheMealDB API (https://www.themealdb.com/api/json/v1/1/). Implement:
> - searchMeals(query: string) — calls the search.php endpoint
> - getRandomMeals(count: number) — calls random.php the given number 
>   of times
> Map the raw API response shape to our Recipe model from src/models/.
> 
> Constraints:
> - Do not call fetch directly from any component or view-model — all 
>   network calls go through this service.
> - Do not manage loading or error state here — just return data or 
>   throw on failure.

**Summary of Output:**
Created API service layer in `src/services/mealApi.ts` implementing `searchMeals(query)` and `getRandomMeals(count)`, mapping raw TheMealDB JSON to the `Recipe` model without managing loading/error states inside the service.
