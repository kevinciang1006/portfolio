# kevinciang.com — Portfolio

Single-page portfolio. React + Vite + TypeScript, plain CSS (no UI framework).

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build locally
```

## Editing content

All content lives in plain arrays at the top of `src/App.tsx`:

- `PROFILE` — name, role, headline, email, social links, résumé path
- `EXPERIENCE` — work history (check the date ranges)
- `PROJECTS` — the demo cards (blurbs are placeholders — replace them)
- `SKILLS` — grouped skill tags

Drop a `resume.pdf` into `public/` and it will be served at `/resume.pdf`.

## Deploy to Vercel + kevinciang.com

1. Push this folder to a new GitHub repo:

   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin git@github.com:<your-username>/kevinciang-portfolio.git
   git push -u origin main
   ```

2. In Vercel: **Add New → Project → Import** the repo.
   Vercel auto-detects Vite. Defaults are correct:
   - Build command: `npm run build`
   - Output directory: `dist`
   Click **Deploy**.

3. Attach the domain — **Project → Settings → Domains**, add:
   - `kevinciang.com`
   - `www.kevinciang.com`

   You already pointed the apex `A` records and the `www` CNAME at Vercel in
   Hostinger, so this should verify immediately. If the apex was attached to a
   different Vercel project before, remove it there first (a domain can only be
   on one project at a time).

That's it. Vercel handles SSL automatically, and every push to `main` redeploys.
