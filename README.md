# Whatistracking.me Website

A single-page static website built with Astro.

## Tech Stack

- **Astro** - Web Framework
- **Tailwind CSS v4** - Utility-first CSS (CSS-based config)
- **DaisyUI v5** - Component library

## Commands

All commands are run from the root of the project:

| Command          | Action                                      |
| :--------------- | :------------------------------------------ |
| `npm install`    | Install dependencies                        |
| `npm run dev`    | Start local dev server at `localhost:4321`   |
| `npm run build`  | Build production site to `./dist/`           |
| `npm run preview`| Preview build locally before deploying       |
| `npm run lint`   | Run ESLint                                   |
| `npm run format` | Run Prettier                                 |
| `npm run check`  | Run Astro check and TypeScript type checking |
| `npm run knip`   | Find unused exports/dependencies             |

## Deployment

This project deploys to GitHub Pages via a GitHub Actions workflow. Pushes to `main` trigger an automatic build and deploy.
