# Changelog

## 2026-10-26

### Added

- A sign-up repository and User entity, with the sign-up screen sending name, email, and password to `/auth/signup`. The register button is disabled while any field is empty. Session persistence and post-registration navigation are not implemented yet.
- Learning notes and a TIL template covering API communication, user entities, and React form state.

## 2026-10-25

### Added

- A shared JSON Axios client configured by `VITE_API_URL`, with local `.env` files excluded from Git.
- Axios ^1.20.0 as a runtime dependency, with its dependencies recorded in the lockfile.
- Sign-in, sign-up, home, and note detail screens with nested routing, a sidebar, search dialog, and shared UI styles. Authentication and note persistence are not implemented yet.
- React, TypeScript, and Vite starter displaying `hello world`, with ESLint and build configuration.

### Changed

- Include `.vscode/` in Git tracking by removing its ignore rule.
