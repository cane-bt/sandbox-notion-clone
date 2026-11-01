# sandbox-notion-clone

A React + TypeScript + Vite sandbox for a Notion-style application. It includes sign-in (`/signin`), sign-up (`/signup`), home (`/`), and note detail (`/notes/:id`) screens, with a shared sidebar and search dialog. The sign-up and sign-in forms send registration and login data to the backend. Current-user state is shared with Jotai: sign-up and sign-in redirect to home, while home and note detail redirect to sign-in when no current user is set. Session persistence, note creation, editing, and persistence are not implemented yet.

## Development

Requires Node.js 22.12+ and npm. Jotai 3 requires Node.js 22.12 or newer.

```sh
npm ci
npm run dev
```

The shared Axios client in `src/lib/api/index.ts` reads its base URL from `VITE_API_URL`. Set it in a local `.env` file when configuring a backend. `VITE_` variables are exposed to the browser; use public configuration values only. The sign-up screen uses `authRepository` to POST to `/auth/signup`, expecting a response containing `user` and `token`. The repository also provides `signin(email, password)` for `/auth/signin`, with the same response shape; the sign-in screen now calls this method with its email and password inputs. Both forms store the returned user in an in-memory Jotai atom and redirect to home. The token is not persisted or attached to subsequent API requests, and current-user state is lost on reload. Error feedback and session restoration are not implemented yet. The layout check controls client-side navigation; backend authentication and authorization remain necessary. Use test accounts while working on this learning implementation.

## Validation and build

```sh
npm run lint
npm run build
npm run preview
```

`npm run lint` reports console calls as errors. Run `npm run lint -- --fix` to apply supported fixes, including unused-import removal; console calls are reported rather than automatically removed. Import sorting is not configured.

The production build is written to `dist/`. `preview` serves that build locally.

See [CHANGELOG.md](CHANGELOG.md) and [CHANGELOG_ja.md](CHANGELOG_ja.md) for changes.
