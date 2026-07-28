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
