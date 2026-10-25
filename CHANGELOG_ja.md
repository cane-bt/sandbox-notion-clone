---
source_sha256: d1e880d8a4b90630c18213ccccf9146ea6f7c45813c1e1dfb7380867589c5c60
translated_at: 2026-10-25
---

# 変更履歴

## 2026-10-25

### Added

- `VITE_API_URL` で接続先を設定する共通 JSON Axios クライアントを追加し、ローカルの `.env` を Git 管理から除外。
- Axios ^1.20.0 を実行時依存関係に追加し、関連する依存関係を lockfile に記録。
- サインイン・サインアップ・ホーム・ノート詳細の画面、ネストしたルーティング、サイドバー、検索ダイアログ、共通 UI スタイルを追加。認証とノートの永続化は未実装。
- `hello world` を表示する React・TypeScript・Vite の初期構成と ESLint・build 設定を追加。

### Changed

- `.vscode/` の除外設定を解除し、Git 管理対象に変更。
