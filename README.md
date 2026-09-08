# Shape9 — website

The Shape9 marketing site. React + Vite + Tailwind, deployed on Vercel from `main`.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # -> dist/
npm run lint     # tsc --noEmit
```

**Vercel settings:** framework Vite · build `npm run build` · output `dist`. `vercel.json` rewrites every path to `index.html` so the client-side routes work on refresh.

## Layout

- `src/pages/` — one file per route: home, the four product pages (Pulse, Atlas, Sonar, Libra), custom work, the three case studies, about, privacy
- `src/components/ui/` — shadcn components plus `scroll-locked-video-hero.tsx`, the pinned full-screen video hero the product pages open with
- `public/video/` — the four launch films, two cuts each

## The hero videos

Each product page opens with its launch film, pinned full screen while the page scrolls under it.

| file | what it is |
|---|---|
| `<product>-land.mp4` | 1920x1080, no outro — the desktop hero, loops |
| `<product>-port.mp4` | 1080x2340, no outro — the mobile hero, loops |
| `<product>-land-full.mp4` | 1920x1080, whole film including the Shape9 outro — not used by the site, kept here for decks and social |
| `<product>-{land,port}.webp` | frame 0, half size — the `<video>` poster, and the page's LCP element |

The heroes have no outro because they loop; a closing logo card mid-loop reads as the film ending and restarting. The portrait cut is a re-layout of the same composition, not a crop — larger type, headlines wrapped across two or more lines, icon fields pulled in to match.

They are rendered from the Remotion project at `Claude/Projects/Shape9/_Kod/launch-video/` (`render-heroes.mjs`, `render-posters.mjs`) and copied into `public/video/`. That project is the source of truth for anything about the films; see `50_Marketing/Video/Shape9_Launch_Video_System.md`.
