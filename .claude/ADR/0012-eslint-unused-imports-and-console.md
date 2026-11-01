# ADR 0012: ESLint で console と未使用 import を扱う

- 日付: 2026-11-01
- 状態: 採用
- 適用範囲: sandbox-notion-clone

## 背景

未使用の useState import の削除を自動化したいという要望と、console の検出・import ソートに関する検討があった。

## 決定

- no-console を error に設定する。
- TypeScript 対象では標準 no-unused-vars を無効にし、@typescript-eslint/no-unused-vars と enableAutofixRemoval.imports を有効にする。
- npm run lint は検査、npm run lint -- --fix は対応する自動修正として使う。
- ビルドを妨げる NoteItem の未使用アイコン import を削除する。
- import のソート、VS Code の保存時修正は未導入と明記する。未使用 token の分割代入削除は import 自動修正と区別する。

## 代替案

TypeScript の noUnusedLocals は検出に使えるが自動削除ではない。simple-import-sort または VS Code の organizeImports は候補で、両方を未調整で併用する決定はしない。Prettier を未使用コード削除の担当にはしない。

## 結果

未使用 import は自動修正できるが、console は検出のみで自動削除されない。副作用目的の読み込みは区別する。既存 UI の lint 問題は別途残る。設定と最小の修正は [PR #9](https://github.com/cane-bt/sandbox-notion-clone/pull/9)。
