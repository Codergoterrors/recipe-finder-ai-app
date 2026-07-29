# Recipe Finder

A React + TypeScript app for discovering recipes, searching by name, saving favorites, and managing a personal account — built following an MVVM (Model-View-ViewModel) architecture with AI-assisted, prompt-driven development in Antigravity.

## Features

- Random recipe discovery on load, using TheMealDB API
- Search recipes by name
- Save/remove favorites, persisted per-user via Firebase Realtime Database
- Email/password registration and login via Firebase Authentication
- Protected `/favorites` route — redirects to login if not authenticated

## Tech Stack

- React + TypeScript + Vite
- react-router-dom
- Firebase (Realtime Database + Authentication)
- TheMealDB API
- Plain CSS (no UI framework)

## Architecture

The app follows MVVM:
- `src/models/` — data shape/type definitions (Recipe, UserFavorite)
- `src/viewmodels/` — hooks holding state, side effects, and business logic
- `src/views/` — presentation-only components and pages
- `src/services/` — API and Firebase access, isolated from components

## How AI Assisted

This project was built using Antigravity as an AI coding assistant, following an iterative, scoped-prompt workflow rather than one large generation request — modeled on the approach demonstrated in the team's mentor session (React + Cursor movie app walkthrough).

Each feature was requested as its own focused prompt with explicit constraints (e.g. "no UI library," "no fetch calls outside the service layer," "no loading state yet"), in this order:
1. Project setup + routing + Header
2. Data models
3. API service layer (TheMealDB)
4. Home view-model + view (random discovery + search)
5. Firebase setup + favorites service + heart toggle
6. Firebase Authentication + protected routes

Full prompt text and outcomes for each step are logged in `PROMPTS.md`.

## Manual Improvements After Reviewing AI Code

While the AI-generated code passed builds and worked correctly for the "happy path" in every step, manual review surfaced two real gaps that were fixed by hand rather than re-prompted:

1. **Duplicate recipes in random discovery** — `getRandomMeals` calls TheMealDB's `random.php` endpoint multiple times in parallel to get a batch of recipes. Since each call is independent, it was possible (and observed) for the same recipe to be returned more than once in a single batch. Added explicit deduplication by recipe ID in `src/services/mealApi.ts` before returning results.

2. **Unfriendly Firebase auth error messages** — Login/Register initially surfaced raw Firebase error codes directly to the user (e.g. `auth/invalid-credential`, `auth/email-already-in-use`). Replaced these with human-readable messages in `LoginPage.tsx` and `RegisterPage.tsx` so failed login/registration attempts give users clear, actionable feedback instead of internal error codes.

## Running Locally

```bash
npm install
npm run dev
```

Requires a `.env` file with Firebase config (see `.env.example` for variable template) — not committed to the repo.
