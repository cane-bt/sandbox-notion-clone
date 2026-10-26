---
source_sha256: 646efa66f1c64af532bb8c03895a848b90bea294aaf9b53353ed1aef8913ef09
translated_at: 2026-10-26
---

# 変更履歴

## 2026-10-26

### Added

- サインアップ用 repository と User エンティティを追加し、サインアップ画面から名前・メールアドレス・パスワードを `/auth/signup` に送信。空欄がある間は登録ボタンを無効化。セッションの永続化と登録後の画面遷移は未実装。
- API 通信・ユーザーエンティティ・React のフォーム状態を扱う学習メモと TIL テンプレートを追加。

## 2026-10-25

### Added

- `VITE_API_URL` で接続先を設定する共通 JSON Axios クライアントを追加し、ローカルの `.env` を Git 管理から除外。
- Axios ^1.20.0 を実行時依存関係に追加し、関連する依存関係を lockfile に記録。
- サインイン・サインアップ・ホーム・ノート詳細の画面、ネストしたルーティング、サイドバー、検索ダイアログ、共通 UI スタイルを追加。認証とノートの永続化は未実装。
- `hello world` を表示する React・TypeScript・Vite の初期構成と ESLint・build 設定を追加。

### Changed

- `.vscode/` の除外設定を解除し、Git 管理対象に変更。
