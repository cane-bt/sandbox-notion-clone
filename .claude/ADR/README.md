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

## 決定にしていない話題

Fetch への置換、import ソート・保存時自動修正、認証切れと権限不足に応じた一覧・トースト表示、トークン永続化は未採用または未実装の検討事項。Outline の設計意図は推測であり本リポジトリの決定根拠にしない。VS Code ミニマップの非表示は個人の表示設定でありプロジェクトの構成決定ではない。11月1日の18〜21完了などの受講実績は TIL データに保存し、ADR は記録方法を扱う。
