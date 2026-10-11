# kevinciang.com — Portfolio

Single-page portfolio. React + Vite + TypeScript, plain CSS (no UI framework).

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check, production build into dist/, then pre-render the page into dist/index.html
npm run preview  # serve the production build locally
```

## Editing content

- `src/data/projects.ts` — every project card and index entry. Add one entry to add a project. Screenshots go in `public/projects/{slug}.webp`; a missing one falls back to a generated cover.
- `src/data/profile.ts` — profile, experience and skills.
- `public/og.png` — the 1200×630 link-preview image.

## Deploy

Hosted on Vercel at https://kevinciang.com. Every push to `main` deploys production; other branches get a preview URL.
