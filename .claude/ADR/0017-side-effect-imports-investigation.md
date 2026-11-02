# ADR 0017: 副作用 import と自動修正の扱い（調査・仮案）

- 日付: 2026-11-02
- 状態: 提案中（仮 ADR）
- 関連: [ADR 0016](0016-simple-import-sort.md)

## 背景

未使用の束縛を削除できても、読み込んだモジュールの初期化まで不要とは限らない。CSS、polyfill、プラグイン登録などの副作用を、自動削除・ソート・ビルド最適化の各段階でどう維持するか調査した。

## 調査結果

### 未使用 import の削除

typescript-eslint の enableAutofixRemoval.imports は、全指定子が未使用なら import 文全体を削除する。モジュールの副作用の必要性は判断しない。公式は import の副作用に依存する場合、このオプションを false に保つよう案内している。

本リポジトリで設定変更前の ESLint を使い、lintText と fix: true によるメモリ上の修正を確認した。

| 入力 | 結果 |
| --- | --- |
| `import "./styles/layout.css";` | 残る |
| `import { unused } from "./setup";` | 未使用なら文全体が削除される |
| `import "./setup";` と未使用の名前付き import | 副作用 import は残る |

自動削除設定のコメント化後は、未使用 import と通常の未使用変数が残り、エラーとして報告されることを確認した。元の自動削除設定も import のみが対象で、通常の変数の自動削除は有効になっていなかった。

### ソートと評価順序

simple-import-sort は副作用 import 同士の順序を維持するが、標準設定では通常の import より前のグループへ移動する。通常の import との相対順序は保証しない。値の提供とトップレベルの初期化を兼ねるモジュールや re-export の副作用に依存すると、ソートで挙動が変わり得る。

### TypeScript・bundler

- `import type` は型だけの依存を明示する。実行時の初期化を目的に使わない。
- `verbatimModuleSyntax` は本リポジトリで有効だが、ESLint に削除された import は保護しない。
- `noUncheckedSideEffectImports` は解決できない副作用 import の検出を補助する。必要性や評価順序は検証しない。CSS のワイルドカード型宣言では個々のファイルの実在確認に限界がある。
- package.json の `sideEffects` は bundler の最適化に関する指定で、ESLint の削除を制御しない。webpack 公式には、誤った `sideEffects: false` により CSS が失われる例がある。本リポジトリの Vite で同じ事象を再現したという意味ではない。

## 決定案

以下は運用の仮案であり、全モジュールの設計変更を承認・実施した記録ではない。ソートの導入と未使用 import 自動削除の無効化という実施済み設定は ADR 0016 を参照する。

1. CSS・polyfill・登録処理は `import "./setup";` のように副作用の目的を明示する。未使用 import を無条件でこの形式に置換せず、実行が必要かを確認する。
2. 自作の初期化は、可能なら `initializePlugins()` のような明示的な関数にし、呼び出し箇所を集約する。
3. 静的 import 先の評価は呼び出し元の関数実行より先になる。他モジュールの評価前に初期化が必要なら、初期化専用モジュールや初期化後の動的 import を検討する。
4. 順序に依存する箇所は理由をコメントし、依存構造を見直す。解消できない場合は局所的にソート対象外にする。
5. CSS の読み込み順序や初期化を変更した際は、ビルドに加えて関連画面・動作を確認する。

## 代替案

- 自動削除を維持する: 保存時の利便性は高いが、隠れた副作用の削除リスクがある。
- 自動削除を無効化する: 手動確認が増えるが、意図しない初期化の削除を避けやすい。現在の設定として採用済み。
- 初期化を明示する設計へ整理してから自動削除を再検討する: 保守性を高められるが、依存モジュールの調査が必要。

## 結果・今後の確認

自動修正が安全性を保証する範囲と、人が判断する範囲を区別できる。初期化処理の全件調査、noUncheckedSideEffectImports の導入、ソート除外の追加、自動削除の再有効化は、この調査では実施・決定していない。

## 参照資料

- [typescript-eslint: no-unused-vars](https://typescript-eslint.io/rules/no-unused-vars/)
- [simple-import-sort: ソートの安全性](https://github.com/lydell/eslint-plugin-simple-import-sort#is-sorting-importsexports-safe)
- [Vite: CSS](https://vite.dev/guide/features.html#css)
- [TypeScript: verbatimModuleSyntax](https://www.typescriptlang.org/tsconfig/verbatimModuleSyntax.html)
- [TypeScript: noUncheckedSideEffectImports](https://www.typescriptlang.org/tsconfig/noUncheckedSideEffectImports.html)
- [webpack: Tree Shaking](https://webpack.js.org/guides/tree-shaking/)
