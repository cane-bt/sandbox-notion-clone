# ADR 一覧

採用・置換の状態は各文書を参照。過去の決定も経緯として保持する。

- [ADR 0001: 作業用ブランチで変更とコミットを行う](0001-work-on-topic-branches.md)
- [ADR 0002: ADR の保存先を .claude/ADR に統一する](0002-store-adrs-in-claude.md)
- [ADR 0003: 公開 TIL は質問の原文ではなく理解を整理して記録する](0003-public-til-writing-style.md)
- [ADR 0004: 本人の言葉を残し、AI の補足を分けて TIL を整理する](0004-preserve-author-voice-in-til.md)
- [ADR 0005: テンプレートとセッション照合を備えた til-review-v2 を追加する](0005-add-template-based-til-review-v2.md)
- [ADR 0006: 改善版を正式な til-review として採用し、入力用 TIL テンプレートを用意する](0006-adopt-til-review-and-input-template.md)
- [ADR 0007: TIL 復習版の目次をスクリプトで生成する](0007-generate-til-review-toc.md)
- [ADR 0008: TIL 復習版に日付ごとの Udemy 受講進捗を残す](0008-preserve-udemy-daily-progress.md)
- [ADR 0009: Udemy の累積進捗と受講履歴を復習版の末尾に表示する](0009-show-cumulative-udemy-progress.md)
- [ADR 0010: TIL の原本退避・固定プレビュー・集計と再開可能な一式保存](0010-transactional-til-review-storage.md)
- [ADR 0011: 認証 API とメモリ上のユーザー状態を分離する](0011-authentication-state-and-api-boundary.md)
- [ADR 0012: ESLint で console と未使用 import を扱う](0012-eslint-unused-imports-and-console.md)
- [ADR 0013: 機能・開発設定・学習記録を別 PR に分ける](0013-topic-pull-requests-and-validation.md)
- [ADR 0014: ADR を Git で公開し、スキルはローカル管理を続ける](0014-publish-adrs-preserve-local-skills.md)

- [ADR 0015: TIL の完成版を日付名に統合する](0015-simplify-til-storage.md)

- [ADR 0016: ESLint で import と export の順序を統一する](0016-simple-import-sort.md)

- [ADR 0019: token の保存・送信と起動時のユーザー復元](0019-token-and-session-restoration.md)

- [ADR 0020: ドキュメントのコード表記を共通化する](0020-document-code-formatting.md)

- [ADR 0021: ADR の記録対象を自律的に選び追加・更新する](0021-automatic-adr-recording.md)

- [ADR 0022: 学習作業の公開と元ディレクトリの整理を専用スキルで扱う](0022-publish-learning-work.md)

## 決定にしていない話題

- [ADR 0023: 関数のアルファベット順整列を今後の導入候補にする（提案中）](0023-consider-alphabetical-function-sorting.md)

- [ADR 0018: Sort JSON の導入を保留し upstream Issue・PR を準備する](0018-defer-sort-json-and-plan-upstream-fixes.md)

- [ADR 0017: 副作用 import と自動修正の扱い（調査・仮案、提案中）](0017-side-effect-imports-investigation.md)

Fetch への置換、認証切れと権限不足に応じた一覧・トースト表示は未採用または未実装の検討事項。Outline の設計意図は推測であり本リポジトリの決定根拠にしない。VS Code ミニマップの非表示は個人の表示設定でありプロジェクトの構成決定ではない。11月1日の18〜21完了などの受講実績は TIL データに保存し、ADR は記録方法を扱う。
