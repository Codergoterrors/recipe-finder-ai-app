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

---

## Prompt 4: Home ViewModel & View

**Prompt Text:**
> Create a HomeViewModel (as a custom hook in src/viewmodels/) that on 
> mount loads a set of random recipes using getRandomMeals from the 
> service layer, and exposes a search function that replaces the 
> current results with matches from searchMeals. Then create the Home 
> view (src/views/pages/HomePage.tsx) that renders a grid of recipe 
> cards (thumbnail, name, category) using this view-model's state, plus 
> a search input tied to the search function.
> 
> Constraint: HomePage should only render UI — no fetch calls, no 
> business logic directly inside the component. All state and logic 
> lives in the view-model.

**Summary of Output:**
Created `useHomeViewModel` custom hook in `src/viewmodels/useHomeViewModel.ts` to manage initial random recipes loading and query searches. Connected `HomePage.tsx` view to render a search input bar and responsive recipe cards grid using plain CSS (`HomePage.css`).

---

## Prompt 5: Firebase Setup & Favorites Service

**Prompt Text:**
> Set up Firebase in this project. Initialize it in src/services/firebase.ts, 
> reading all config values from Vite environment variables 
> (import.meta.env.VITE_FIREBASE_*) — do not hardcode any config values.
> 
> Create a favoritesService in src/services/ with:
> - addFavorite(userId: string, favorite: UserFavorite)
> - removeFavorite(userId: string, recipeId: string)
> - getFavorites(userId: string): returns UserFavorite[]
> 
> These should read/write to the Realtime Database, keyed under each 
> user's ID, using the UserFavorite model from src/models/.
> 
> Add a favorite toggle (heart icon or button) on each recipe card in 
> the Home view. Build out the Favorites view-model and FavoritesPage 
> to display the current user's saved recipes by calling getFavorites.
> 
> Constraint: since authentication isn't implemented yet, use a fixed 
> placeholder user ID string (e.g. "test-user-1") for now — this will 
> be replaced with the real logged-in user's ID in the next step.

**Summary of Output:**
Initialized Firebase Realtime Database in `src/services/firebase.ts` reading Vite env vars. Built `favoritesService.ts` for Firebase RTDB CRUD operations under `favorites/${userId}`. Added favorite toggle (heart button) on Home recipe cards via `useHomeViewModel`, and implemented `useFavoritesViewModel` hook with `FavoritesPage.tsx` view.
