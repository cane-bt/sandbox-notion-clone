# ADR 0016: ESLint で import と export の順序を統一する

- 日付: 2026-11-02
- 状態: 採用
- 補足日: 2026-11-16（保存時の実行条件と代替案を追記）

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

## 保存時の実行条件の補足（2026-11-16）

### 背景と維持する設定

`simple-import-sort/imports` のエラー指定と VS Code での表示の違い、および `editor.codeActionsOnSave` の選択肢を確認し、ユーザーから ADR への記録を依頼された。新しい設定値への変更指定はないため、既存の決定と現在の設定を維持する記録とする。

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never"
  },
  "files.autoSave": "onFocusChange"
}
```

- `source.fixAll.eslint` は `explicit` とし、明示的な保存時に ESLint の自動修正を実行する。
- フォーカス移動ではファイルを自動保存するが、その保存では上記の自動修正を実行しない。
- `source.organizeImports` は `never` を維持し、import の並べ替えは ESLint の `simple-import-sort` に任せる。未使用 import の削除は引き続き手動で判断する。
- エラー検出の重要度、自動修正の実行条件、Prettier による整形を区別する。`error` は VS Code の拡張機能の起動や診断表示を保証せず、`never` は Lint ルール自体を無効にしない。

### 比較した代替案

- `always`: 明示的な保存に加えて、フォーカス移動・ウィンドウ切り替えによる自動保存でも修正する選択肢。説明上の比較案であり、今回の設定変更としては採用していない。時間経過による `afterDelay` の自動保存まで含む指定ではない。
- `never`: 保存時の ESLint 自動修正を停止する選択肢。現在の明示的な保存時の修正を維持するため、変更しない。
- `source.fixAll`: ESLint 以外の対応する提供元も対象にする選択肢。既存の ESLint を指定した設定を維持する。

### 確認結果と範囲

- ローカルの `.vscode/settings.json` が上記の設定であることを確認した。設定変更は行っていない。
- CLI では `NoteItem.tsx` の `simple-import-sort/imports` エラーを確認した。VS Code 内で表示されない原因の特定や、保存操作による修正の実動作確認は行っていない。
- 講座の理解を優先してコード改善を保留するという会話上の選択と、既存の保存時設定を記録することを区別する。この追記ではアプリケーションコードを修正しない。

### 参考資料

- [VS Code: Code Actions on Save](https://code.visualstudio.com/docs/editing/refactoring#_code-actions-on-save)
- [VS Code ESLint 拡張機能](https://github.com/microsoft/vscode-eslint)
