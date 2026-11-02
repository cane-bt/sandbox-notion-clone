# ADR 0016: ESLint で import と export の順序を統一する

- 日付: 2026-11-02
- 状態: 採用

## 背景

simple-import-sort をインストール済みで、既存の未使用 import 削除と合わせて利用したい。

## 決定

- TypeScript / TSX に simple-import-sort/imports と exports を error で有効にする。
- 独自 groups は設けず標準のグループ分けを使い、副作用 import 同士の順序を維持する。
- VSCode の明示的な保存時に source.fixAll.eslint を実行する。ESLint 拡張が必要。現在 .vscode は Git 管理対象外のため、この保存時設定と拡張推奨はローカルに適用する。
- source.organizeImports は never にして、TypeScript 側のソートとの競合を避ける。
- CLI は npm run lint で検出し、npm run lint -- --fix で修正する。
- 未使用 import・変数は @typescript-eslint/no-unused-vars で検出し、削除は手動で判断する。enableAutofixRemoval はコメント化し、既定の自動削除無効を使う。
- CSS・登録処理などの副作用が必要な読み込みは import "./setup" の形式で明示する。自作の初期化処理は可能なら明示的な関数呼び出しにする。
- 副作用 import 同士の順序は維持されるが、通常の import との前後関係は変わり得る。評価順序に依存する箇所は設計を見直すか、理由を記して局所的にソート対象外にする。

## 代替案

VSCode organizeImports はエディターに依存する。sort-imports との併用や独自グループは競合と設定の複雑化を避けるため採用しない。

未使用 import の自動削除を維持する案は、未使用の束縛と一緒に必要なモジュール初期化まで削除する可能性があるため採用しない。

## 結果

保存時と CLI で同じ順序に整えられる。Prettier は引き続き整形を担当する。既存の lint 問題の修正はこの決定に含めない。
