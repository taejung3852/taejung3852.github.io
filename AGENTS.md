## Development

Run the Vite dev server:

```bash
npm run dev
```

Build the production bundle and prepare static routes:

```bash
npm run build
```

Preview the built production bundle:

```bash
npm run preview
```

## Architecture

- **Framework**: React 19 SPA with `react-router-dom` and Vite.
- **Styling**: Vanilla CSS tokens and modular stylesheets (`src/home/styles/`).
- **Entry Point**: `index.html` -> `src/home/main.jsx`.
- **Data Source**: `src/content/portfolio.ts` & `src/home/content/`.
- **Routes & Deployment**: `scripts/prepare-routes.mjs` generates static route fallbacks in `dist/` for GitHub Pages.

