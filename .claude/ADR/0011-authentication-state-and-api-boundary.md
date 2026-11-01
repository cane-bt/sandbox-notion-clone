# ADR 0011: 認証 API とメモリ上のユーザー状態を分離する

- 日付: 2026-11-01
- 状態: 採用
- 適用範囲: sandbox-notion-clone

## 背景

ログイン API、フォーム、複数画面のユーザー情報の共有を Udemy 18〜21に沿って実装する。Axios と Fetch、useState・useReducer・Context の比較は学習上の検討であり、すべてを導入するものではない。

## 決定

- 既存の Axios インスタンスで baseURL を共通化し、authRepository が API 通信と User エンティティへの変換を担当する。Fetch への置換は行わない。
- フォームの入力値は useState、登録・ログイン・Layout が共有するユーザー情報は Jotai の currentUserAtom で管理する。
- 成功時はホームへ、ユーザー状態がない保護対象レイアウトではサインインへ Navigate の replace を用いて遷移する。replace をすべての通常遷移へ適用する方針ではない。
- Repository は user と token を返すが、現段階の呼び出し側は user のみ取り出す。未使用 token と認証情報の console 出力を削除する。
- Jotai 3 の依存条件に合わせ Node.js 22.12+ を前提とする。
- トークン保存・API への付与、再読み込み時の復元、エラー表示、権限別ルーティングは未実装と明記する。クライアントの画面制御をサーバーの認証・認可の代替にしない。

## 代替案

Fetch の共通ラッパーも可能だが、移行の決定はしていない。Context と useReducer も共有・更新の選択肢だが、この実装では Jotai を採用する。権限不足時に一覧へ戻しトーストを出す案は、認証切れとは別の設計候補として保留する。

## 結果

入力状態と共有状態の責務を分けられる。ログイン状態は再読み込みで失われる。学習段階の仕様であり、永続セッションや権限管理が完成したとは扱わない。実装は [PR #8](https://github.com/cane-bt/sandbox-notion-clone/pull/8)。
