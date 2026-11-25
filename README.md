# sandbox-notion-clone

A React + TypeScript + Vite sandbox for a Notion-style application. It includes sign-in (`/signin`), sign-up (`/signup`), home (`/`), and note detail (`/notes/:id`) screens, with a shared sidebar and search dialog. The sign-up and sign-in forms send registration and login data to the backend. Current-user state is shared with Jotai: sign-up and sign-in redirect to home, while home and note detail redirect to sign-in when no current user is set. The app restores current-user state from the backend on startup using a stored token. A note repository can POST optional `title` and `parentId` values to `/notes` and convert the response into a `Note` with a `Date`-valued `createdAt`. The home form calls this repository, disables submission while pending, clears the title on success, and shows an alert on failure. Returned notes are merged by ID into shared Jotai state. The repository’s `find({ parentId })` method can send a parent ID as a query parameter; `find()` omits it. Clicking a sidebar note icon now calls `find({ parentId: note.id })`, merges returned children into shared state, and alerts on failure. Collapsed notes show a right chevron on hover; expanded notes show a down chevron. Backend filtering semantics remain unverified. The authenticated layout also fetches `/notes`, converts the results to `Note` entities, and merges them into this state. It hides the sidebar while loading, displays a loading status or fetch error, and ignores stale Effect results. The store update function is memoized to avoid refetching on every render. The sidebar renders notes from shared state, displaying each title or an untitled label when the title is null or undefined. Each sidebar note’s plus control creates a child using that note’s ID as `parentId`, waits for the response before merging it into shared state, and alerts on failure. Notes are rendered recursively by parent ID, with root notes at the top level and children indented by 12 pixels per level. Each list tracks expansion by note ID in local state. Child lists start hidden; a successful child fetch toggles visibility, including fetching again when collapsing. Creating a child expands its parent. Collapsing a parent unmounts its child list, so descendant expansion resets when reopened. Only notes present in shared state can be rendered. The home page does not yet render the fetched list. Browser component checks cover an empty list, multiple notes, missing titles, and title updates through the store. State is in memory and is fetched again when the layout mounts. Mock-API browser checks cover loading, success, failure, unauthenticated navigation, and request counts. Browser checks with a mocked Axios adapter also cover child-note parent IDs, delayed responses, successful insertion without key warnings, and failure alerts without list changes; real-backend integration remains unverified. Mock-adapter browser checks also cover child fetching by parent ID, insertion, repeated-fetch deduplication, hover icons, and failure alerts that preserve the list. Isolated browser component checks cover recursive parent/child/grandchild rendering, null and undefined root parent IDs, leaf notes, depth-based indentation, and fetched or newly created children appearing under their parent.


Note details now fetch `/notes/:id`, merge the response into shared state, and show an editable title with an untitled placeholder. Invalid IDs and 404 responses show a not-found message; other failures show an error. Switching IDs resets loading and ignores stale responses. Sidebar rows open details, and successful creation from home, the sidebar root control, or a child control opens the new note. Expansion and menu actions stop click propagation so they do not open the parent note. Leaving the title field saves a changed draft via PATCH to `/notes/:id`. The field is disabled during saving. A failed save preserves the draft and offers a retry.

The block editor initializes from the saved JSON body and sends body edits via PATCH. A failed body save displays an alert until a subsequent body save succeeds.

Mock-adapter browser checks cover detail navigation, title switching and fallback, loading, stale responses, 404 and server errors, invalid IDs, expansion/menu isolation, child-creation failure, and successful home/sidebar/child creation navigation. Real-backend integration remains unverified.

## Development

Requires Node.js 22.12+ and npm. Jotai 3 requires Node.js 22.12 or newer.

```sh
npm ci
npm run dev
```

The shared Axios client in `src/lib/api/index.ts` reads its base URL from `VITE_API_URL`. Set it in a local `.env` file when configuring a backend. `VITE_` variables are exposed to the browser; use public configuration values only. The sign-up screen uses `authRepository` to POST to `/auth/signup`, expecting a response containing `user` and `token`. The repository also provides `signin(email, password)` for `/auth/signin`, with the same response shape; the sign-in screen now calls this method with its email and password inputs. Both forms store the returned user in an in-memory Jotai atom and redirect to home. Both forms persist the access token under the localStorage key `token`, show an error alert on failure, and disable submission while pending. A request interceptor attaches `Authorization: Bearer <token>` when a stored token exists, to every request made with the shared client (including auth endpoints). `getCurrentUser()` calls GET `/auth/me`, expecting a user object directly in the response body, or no user data. On startup, App calls getCurrentUser(), shows a loading view until it settles, and restores the shared user on success. Failures clear the user state and finish loading; network errors and unauthenticated responses are not shown separately. Cleanup ignores stale results but does not cancel the request. localStorage is readable by JavaScript, so this learning implementation does not provide HttpOnly-cookie protection. The layout check controls client-side navigation; backend authentication and authorization remain necessary. Use test accounts while working on this learning implementation.

## Formatting

The project Prettier configuration prefers single quotes for JavaScript and TypeScript strings. JSX attribute quotes retain the default double quotes. Use the Prettier VS Code extension as the formatter; no Prettier CLI dependency or format script is installed by this change.

## Validation and build

```sh
npm run lint
npm run build
npm run preview
```

This learning repository tolerates all lint errors and warnings, including new findings, while still running and reporting lint. Build failures, functional defects, and required GitHub conditions are evaluated separately. See [ADR 0028](.claude/ADR/0028-allow-learning-lint-findings.md).

`npm run lint` reports console calls as errors. Run `npm run lint -- --fix` to sort imports and exports. Unused imports and variables remain errors, but automatic import removal is disabled to preserve module side effects. Side-effect imports keep their relative order; their position relative to value imports can change. Local VS Code settings enable ESLint fixes on explicit save and disable organizeImports; these editor settings are not tracked.

The production build is written to `dist/`. `preview` serves that build locally.

See [CHANGELOG.md](CHANGELOG.md) and [CHANGELOG_ja.md](CHANGELOG_ja.md) for changes.

## 設計・運用の決定記録

Open PR の順次マージにはローカルスキル `$merge-open-prs` を使います。最初のマージ・予約前に対象全件をレビューし、問題が見つかった場合は ADR に記録します。英日変更履歴の独立した追記が競合した場合は、[ADR 0038](.claude/ADR/0038-changelog-conflict-resolution.md) の条件で解消し、更新した PR を再検証します。各 PR は依存関係・検証・必須条件を個別に確認して進めます。詳細は [ADR 0036](.claude/ADR/0036-record-merge-review-findings.md) を参照してください。対象を依存関係から並べ、各 PR の最新状態とマージ完了を確認します。マージ後はローカル `main` も fast-forward し、開ける場所または同期保留の理由を報告します。「順序だけ」と指定すれば分析のみです。PR 公開は引き続き `publish-learning-work` / `quick-pr` の担当で、公開だけではマージしません。スキル本文と確認ケースはリポジトリに含めます。実行には GitHub へのアクセス権と利用可能な操作ツールが必要です。方針は [ADR 0027](.claude/ADR/0027-merge-open-prs.md) を参照してください。

[ADR 一覧](.claude/ADR/README.md) に設計と運用の決定・代替案・経緯を記録します。ADR は Git で公開します。生成スキルは原則ローカル管理ですが、`til-review` の生成指示と出力テンプレート、および `merge-open-prs` の本文と確認ケースは明示依頼により公開します。個人設定やその他のスキルはローカル管理を維持します。`.claude/` 全体は除外しているため、新規 ADR は対象ファイルを明示して `git add -f .claude/ADR/<ファイル名>` で追加します。

## 学習用の教材

[【実務レベルの開発を学びたい方へ】React + Typescriptで超本格的なNotionクローンを作ろう](https://www.udemy.com/course/react-notion-clone/?couponCode=26BBPAA2MX)

- 総動画数: 53
- 動画数の記録確認日: 2026-11-01（本人が記載した値。Udemy 上での再確認は未実施）
- 日々の受講記録: [_TIL](_TIL/)。`til-review` で作る復習版の参考資料の後に、対象日までの累積進捗と新しい日付順の受講履歴を表示する。その後の最終節に「元の学習メモ」を置く。

`til-review` の完成版は `_TIL/YYYY-MM-DD(曜日).md` に保存します。同日の更新はこの完成版へ反映し、変更履歴は Git で管理します。初回は本人の原本を `_TIL/_draft/` へ内容を保持して退避します。再レビューでは退避済み原本と完成版を読み、原本を上書きせず完成版を更新します。本人の文章と AI の補足は区別します。受講実績と出所は「元の学習メモ」の直前に記録し、JSON データや保存処理記録は作成しません。既に原本を削除した日は、完成版を原本として退避し直さず、完成版と本人の追記を基に更新します。

`til-review` の[生成指示](.codex/skills/til-review/SKILL.md)と[出力テンプレート](.codex/skills/til-review/assets/til-review-template.md)を公開します。関連スクリプトやエージェント設定はローカル管理のため、clone だけで生成環境一式が揃うわけではありません。完成版の最終節は「元の学習メモ」とし、その後へ別の節を追加しません。この配置は今後の生成・再レビューに適用し、対象外の過去 TIL や退避原本は変更しません。

今後の TIL では、対象ファイル・関数名や文書の節名、疑問、解説内容を対応付けて記録します。目次の後に「疑問と解説の一覧」を置き、本文の解説へリンクします。対象不明・一般論・未回答を区別し、行番号は質問時点の補助情報として扱います。過去の TIL は一括更新しません。方針は [ADR 0025](.claude/ADR/0025-trace-til-questions-to-files.md) を参照してください。

日付付き TIL の受講進捗欄にある完了記録は、別日や累積記録の明示がなければ TIL の対象日の申告として扱います。受講日欄の空欄や教材表示の貼り付け形式だけでは再質問せず、明示された受講日を優先します。詳細は [ADR 0026](.claude/ADR/0026-default-udemy-completion-date.md) を参照してください。

Mock-adapter browser checks for note expansion cover initially hidden children, expand/collapse, automatic expansion on child creation, the expanded down-chevron icon, and fetch failures preserving the displayed tree. Real-backend integration remains unverified.
