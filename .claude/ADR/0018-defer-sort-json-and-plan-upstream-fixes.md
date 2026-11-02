# ADR 0018: Sort JSON の導入を保留し upstream Issue・PR を準備する

- 日付: 2026-11-02
- 状態: 導入保留（upstream 提案・修正は未着手）
- 対象: [R35007/sort-json-vscode-extension](https://github.com/R35007/sort-json-vscode-extension)

## 背景

VSCode の settings.json のキーを昇順で自動整列したい。Thinker.sort-json はコメント付き JSON と保存時ソートを提供するため候補にしたが、コード調査で信頼性・安全性の懸念を確認した。将来は利用したいため、upstream への Issue と修正 PR の作成につなげる記録を残す。

## 決定

- 現時点では拡張の導入・有効化・保存時ソート設定を行わない。
- 調査結果を Issue・PR の準備資料として保持する。本 ADR 作成時点では外部投稿、fork、修正 PR は行わない。
- upstream 作業を開始する際は最新コード、既存 Issue・PR、貢献ルールを再確認する。解決済みの問題を重複報告しない。
- 確認済みの不具合と、設計上の懸念・未検証の影響を分ける。任意コード実行機能を、そのまま無操作で発火する脆弱性と断定しない。新たに悪用可能な脆弱性を確認した場合は、公開前に SECURITY.md 等の報告方針を確認する。

## 調査対象と検証範囲

- 公開ソース: `c7e5d8d1e0c6754140422a46589c64a34ccd5f87`
- Marketplace 配布物: Thinker.sort-json 20.1.0
- VSIX SHA-256: `5028d42569c172a22a2d8af5b01367f88f2efda3a5d1195ec32c7a346ad6ff85`
- ライセンス: MIT
- 公開ソースを読み、配布 JavaScript を VSCode API の模擬環境で動かした。実際の VSCode Extension Host での統合試験は未実施。
- package.json は公開版と配布版が一致した。bundle 全体の再現ビルド照合はしていない。
- 拡張独自ソースに外部送信・Telemetry・シェル起動の処理は見つからなかった。依存ライブラリ全体の安全性を保証するものではない。

## Issue・PR の候補

### 1. Fix All が対象 document を無視し、activeTextEditor を直接編集する

- 対象: `src/SortJSON/CodeActions/FixAllProvider.ts`、`src/SortJSON/index.ts`、`src/utils.ts`
- 確認内容: provider の `_document` が使われず、コマンド経由で activeTextEditor を取得する。別 document を引数に渡した模擬試験でもアクティブな側への編集が発生した。編集実行後、provider は空配列を返した。
- 制限: 実際の保存操作で別ファイルが破壊されることまで再現したわけではない。
- Issue 案: `Fix All should return edits for the requested document without mutating the active editor`
- 修正案: 対象 document と選択範囲を明示的に受け取るソート処理を分離し、provider は対象 URI の WorkspaceEdit を持つ CodeAction を返す。候補の取得時に editor.edit を実行しない。手動コマンドは同じ変換処理を利用する。
- 検証: 非アクティブ document、複数ファイルの Save All、選択範囲あり、キャンセル、変更なしを確認する。Code Action の列挙だけでは document が変わらず、適用時に指定 document のみが変わることを確認する。

### 2. sortLevel: 0 が全階層ソートへ変わる

- 対象: `src/Settings.ts` の sortLevel getter
- 確認内容: `value || -1` により 0 が -1 になる。設定説明は 0 でソート禁止としているが、配布物の模擬試験では 0 でもキーが整列した。
- Issue 案: `sortLevel: 0 does not disable sorting as documented`
- 修正案: `value ?? -1` などで 0 を保持する。必要に応じ、書式変更も含めて無変更とする早期 return を検討する。
- 検証: 0 で無変更、1 で最上位だけ、-1 で全階層、未指定時は既定値。UI コマンド側も 0 を拒否しているため、仕様と整合させる。

### 3. カスタム比較文字列のコード実行と設定の信頼境界

- 対象: `src/utils.ts` の interpolateList / interpolateEntries、`src/SortJSON/getters.ts`、`src/Settings.ts`、`package.json`
- 確認内容: `Function(..., comparisonString)` で JavaScript を実行する。比較コードから模擬環境内のグローバル変数を書き換えられた。設定は workspace.getConfiguration から読み、ワークスペース設定も影響し得る。
- 到達条件: カスタムソートのコマンド等を実行する必要がある。通常の昇順・保存時ソートが defaultCustomSort を自動実行する挙動は確認していない。
- 提案案: 実行されるコードと設定元を利用者へ明示し、Workspace Trust、restrictedConfigurations、実行前確認などの方針を作者と協議する。宣言的な比較方式への置換も代替案。
- 検証: ユーザー設定と workspace 設定、信頼済み・未信頼 workspace、通常ソートとカスタムソートの実行経路を分けて確認する。Function の単純な置換だけで安全になったと判断しない。

### 4. 依存関係の更新

- 公開 lockfile に `npm audit --omit=dev --package-lock-only` を実行し、lodash 4.17.21 と nanoid 5.1.2 の 2 パッケージに high の報告があった。
- これは lockfile ベースの判定であり、配布 bundle の実際の悪用可能性を証明しない。nanoid の利用は固定サイズ 5 であり、ゼロ・負数サイズの警告に対応する呼び出しは確認していない。
- 修正案: 作業時点で advisory と修正版を再確認し、依存更新を他の修正とは分ける。型検査、ビルド、通常・カスタムソートを検証する。

## upstream 作業の順序

1. 最新版で再現確認し、最小再現コードと期待値・実際の結果を用意する。
2. 独立した不具合は Issue と PR を分ける。まず sortLevel と Fix All の不具合を優先する。
3. カスタムコードの信頼境界は、作者と方針を合意してから変更する。
4. 回帰テスト、コメント付き JSON、配列順序維持、最上位キーのみのソートを確認する。
5. リリースされた配布物を再確認し、settings.json のコピーで試してから導入を再判断する。

## 代替案

- 現版を手動ソート限定で使う: 自動保存の問題は避けやすいが、今回の希望には不足するため今は採用しない。
- 別拡張を使う: 選定・安全性確認が別途必要。
- 自作する: 対象を絞れるが、JSONC のコメント保持と保守の負担がある。

## 結果

既存設定は維持し、問題を認識したまま拡張を適用することを避ける。将来の Issue・PR 作業で調査を再利用できるが、最新状態の再調査と実 VSCode 上の検証は必要である。投稿先 URL、PR URL、修正リリース、導入判断は進捗に合わせて本 ADR に追記する。

## 参照

- [設定定義](https://github.com/R35007/sort-json-vscode-extension/blob/c7e5d8d1e0c6754140422a46589c64a34ccd5f87/package.json)
- [Settings.ts](https://github.com/R35007/sort-json-vscode-extension/blob/c7e5d8d1e0c6754140422a46589c64a34ccd5f87/src/Settings.ts)
- [FixAllProvider.ts](https://github.com/R35007/sort-json-vscode-extension/blob/c7e5d8d1e0c6754140422a46589c64a34ccd5f87/src/SortJSON/CodeActions/FixAllProvider.ts)
- [ソート処理](https://github.com/R35007/sort-json-vscode-extension/blob/c7e5d8d1e0c6754140422a46589c64a34ccd5f87/src/SortJSON/index.ts)
- [utils.ts](https://github.com/R35007/sort-json-vscode-extension/blob/c7e5d8d1e0c6754140422a46589c64a34ccd5f87/src/utils.ts)
