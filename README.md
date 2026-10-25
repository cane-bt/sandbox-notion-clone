# sandbox-notion-clone

A React + TypeScript + Vite sandbox for a Notion-style application. It includes sign-in (`/signin`), sign-up (`/signup`), home (`/`), and note detail (`/notes/:id`) screens, with a shared sidebar and search dialog. Authentication, note creation, editing, and persistence are not implemented yet.

## Development

Requires Node.js 20.19+ on the 20.x line, or Node.js 22.12+ (as required by Vite), and npm.

```sh
npm ci
npm run dev
```

The shared Axios client in `src/lib/api/index.ts` reads its base URL from `VITE_API_URL`. Set it in a local `.env` file when configuring a backend. `VITE_` variables are exposed to the browser; use public configuration values only. The client is not yet connected to the screens.

## Validation and build

```sh
npm run lint
npm run build
npm run preview
```

The production build is written to `dist/`. `preview` serves that build locally.

See [CHANGELOG.md](CHANGELOG.md) and [CHANGELOG_ja.md](CHANGELOG_ja.md) for changes.
