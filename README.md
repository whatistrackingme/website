# Whatistracking.me Website

A single-page static website built with Astro.

## Tech Stack

- **Astro** - Web Framework
- **Tailwind CSS v4** - Utility-first CSS (CSS-based config)
- **DaisyUI v5** - Component library

## Commands

All commands are run from the root of the project:

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Start local dev server at `localhost:4321`   |
| `npm run build`   | Build production site to `./dist/`           |
| `npm run preview` | Preview build locally before deploying       |
| `npm run lint`    | Run ESLint                                   |
| `npm run format`  | Run Prettier                                 |
| `npm run check`   | Run Astro check and TypeScript type checking |
| `npm run knip`    | Find unused exports/dependencies             |

## Deployment

This project deploys to GitHub Pages via a GitHub Actions workflow. Pushes to `main` trigger an automatic build and deploy.

### Configuration

Set these environment variables to configure the deployment URL (e.g., in `.env.production` or as GitHub Actions secrets/variables):

| Variable    | Description                            | Example                              |
| :---------- | :------------------------------------- | :----------------------------------- |
| `SITE_URL`  | Full URL of the deployed site          | `https://whatistrackingme.github.io` |
| `BASE_PATH` | Base path prefix (for subpath hosting) | `/website`                           |

- **GitHub Pages with default domain**: set `SITE_URL=https://<org>.github.io` and `BASE_PATH=/<repo>`
- **Custom domain**: set `SITE_URL=https://yourdomain.com` (no `BASE_PATH` needed)
- **Neither set**: the site builds with root-relative paths, suitable for local preview
