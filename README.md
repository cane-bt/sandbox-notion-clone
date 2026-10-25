# sandbox-notion-clone

A React + TypeScript + Vite sandbox for a Notion-style application. It includes sign-in (`/signin`), sign-up (`/signup`), home (`/`), and note detail (`/notes/:id`) screens, with a shared sidebar and search dialog. Authentication, note creation, editing, and persistence are not implemented yet.

## Development

Requires Node.js 20.19+ on the 20.x line, or Node.js 22.12+ (as required by Vite), and npm.

```sh
npm ci
npm run dev
```

## Validation and build

```sh
npm run lint
npm run build
npm run preview
```

The production build is written to `dist/`. `preview` serves that build locally.

See [CHANGELOG.md](CHANGELOG.md) and [CHANGELOG_ja.md](CHANGELOG_ja.md) for changes.
