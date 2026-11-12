# Changelog

## 2026-11-11

### Added

- Create a child note from each sidebar note’s plus control, await the API result before adding it to shared state, and show an alert on failure.

### Changed

- Link TIL questions and explanations to their source files or document sections, with a navigable summary and explicit unknown or unanswered items.

## 2026-11-08

### Added

- Render notes from shared state in the sidebar, showing each note title and falling back to an untitled label when the title is null or undefined.

## 2026-11-07

### Added

- Fetch notes when the authenticated layout mounts, merge results into shared state, and show loading and failure feedback while ignoring stale Effect results. Keep the store update function stable to avoid repeated requests after renders. Rendering the fetched list remains pending.

### Changed

- Place original learning notes after Udemy progress as the final section of generated and re-reviewed TILs. Publish the til-review instructions and output template; other local tooling and private settings remain excluded.

## 2026-11-06

### Changed

- Document the repository-specific learning-work publication workflow, preservation of unrelated edits, and reconciliation of the original working directory; skills and agent configuration remain local.

## 2026-11-04

### Added

- Create notes from the home form, disable submission while pending, and merge returned notes into shared Jotai state by ID.

### Changed

- Prefer single quotes for JavaScript and TypeScript strings with a project Prettier configuration; JSX attribute quotes keep the default style.
- Document autonomous ADR selection, recording timing, explicit requests for undecided topics, and partial policy replacement; agent configuration remains local.

## 2026-11-03

### Added

- Add a note entity that converts response timestamps to `Date` objects and a repository method to POST optional `title` and `parentId` values to `/notes`; UI integration is pending.

## 2026-11-02

### Added

- Restore current-user state on startup, gate routes behind a loading view, and ignore stale Effect results.

- Attach stored Bearer tokens through a request interceptor and add GET `/auth/me` with User conversion.

- Persist access tokens from sign-up and sign-in in localStorage; show failure alerts and disable repeat submissions while pending.

### Changed

- Enable simple-import-sort for TypeScript imports and exports; disable automatic unused-import removal while retaining diagnostics.

## 2026-11-01

### Added

- Publish the ADR history and record authentication, lint, PR separation, and ADR publication decisions; generator skills remain local.
- Record the Udemy course and its 53-video total, daily progress, and dated learning history.
- Preserve the original TIL in `_TIL/_draft/` alongside versioned reviews, structured progress data, and the verified save-operation record. The generator skill remains local and is not distributed in this repository.
- A sign-in repository method that posts email and password to `/auth/signin` and returns a User entity and token.
- A sign-in form that sends email and password through the repository, with the button disabled while either field is empty.
- Jotai-based current-user state shared by sign-up, sign-in, and the layout. Successful authentication redirects to home; the layout redirects users without current-user state to sign-in. State is in memory and is not restored after a reload.

### Changed

- Restore source archiving on the first TIL review; keep regeneration separate from archiving and do not restore previously deleted notes.
- Remove the remaining November 1 review copies and archived source; retain the completed daily note and Git history.
- Consolidate the November 1 review into its date-named file and remove redundant v3/v4 reviews, progress JSON, and save journals.
- Require Node.js 22.12 or newer for the Jotai 3 dependency.
- Enable ESLint errors for console calls and opt into automatic removal of unused imports with `npm run lint -- --fix`. Import sorting is not enabled.

### Fixed

- Remove unused note-item icon imports that prevented the TypeScript build.

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
