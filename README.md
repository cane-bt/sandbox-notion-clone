# sandbox-notion-clone

A React + TypeScript + Vite sandbox for a Notion-style application. It includes sign-in (`/signin`), sign-up (`/signup`), home (`/`), and note detail (`/notes/:id`) screens, with a shared sidebar and search dialog. The sign-up form sends registration data to the backend. Sign-in, session persistence, note creation, editing, and persistence are not implemented yet.

## Development

Requires Node.js 20.19+ on the 20.x line, or Node.js 22.12+ (as required by Vite), and npm.

```sh
npm ci
npm run dev
```

The shared Axios client in `src/lib/api/index.ts` reads its base URL from `VITE_API_URL`. Set it in a local `.env` file when configuring a backend. `VITE_` variables are exposed to the browser; use public configuration values only. The sign-up screen uses `authRepository` to POST to `/auth/signup`, expecting a response containing `user` and `token`. Registration currently logs the response to the browser console; error feedback, session persistence, and post-registration navigation are not implemented yet. Use test accounts while working on this learning implementation.

## Validation and build

```sh
npm run lint
npm run build
npm run preview
```

The production build is written to `dist/`. `preview` serves that build locally.

See [CHANGELOG.md](CHANGELOG.md) and [CHANGELOG_ja.md](CHANGELOG_ja.md) for changes.

## 学習用の教材

[【実務レベルの開発を学びたい方へ】React + Typescriptで超本格的なNotionクローンを作ろう](https://www.udemy.com/course/react-notion-clone/?couponCode=26BBPAA2MX)

- 総動画数: 53
- 動画数の記録確認日: 2026-11-01（本人が記載した値。Udemy 上での再確認は未実施）
- 日々の受講記録: [_TIL](_TIL/)。`til-review` で作る復習版の末尾に、対象日までの累積進捗と新しい日付順の受講履歴を表示する。

`til-review` は初回保存時に原本を `_TIL/_draft/` へ内容を保持して退避し、復習版を `_TIL/` 直下へ版番号付きで保存します。受講データは `_TIL/_data/`、再実行・中断復旧の記録は `_TIL/.review-state/` に保存します。原本・復習版・受講データの一式を照合した処理だけを集計に利用します。保存原本は直接編集せず、改訂時は直下へ同名の新しい原本を用意します。コミット・公開は自動では行いません。

`til-review` のスキル本体と ADR はローカル管理で、Git の追跡対象には含めていません。このリポジトリの clone だけでは自動生成コマンドは利用できません。保存済みの学習記録・受講データ・処理記録は参照できます。
