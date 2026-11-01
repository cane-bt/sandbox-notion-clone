# 2026-11-01: 状態管理・API 通信・画面遷移と学習進捗の記録

元の学習メモを残し、関連するセッションの説明を補足として整理した復習用記録。

- 元ファイル: [2026-11-01(Sun).md](<_draft/2026-11-01(Sun).md>)
- 学習対象日: 2026-11-01（原本のファイル名による）
- 整理日: 2026-11-01（Asia/Tokyo）
- 会話の参照範囲: 参照可能な現セッション（日付の区切り未確認）。v2 の関連説明を引き継ぎ、PR・コミットの分割、Udemy の日別・累積進捗、レビューで確認した集計条件と今回の運用更新を追加。さらに本人の「今日行った内容は18から21のすべて」という申告を反映。別セッションは参照していない。
- 引き継ぎ元: [2026-11-01(Sun)-review-v3.md](<2026-11-01(Sun)-review-v3.md>)。原本と既存版は変更せず、本人による当日の受講範囲の確定を反映した。
- 技術説明の参照: v2 の説明・参考リンクを継承。今回、外部資料の再調査は行っていない。追加した進捗の説明は README・TIL・更新後のスキルと現セッションを根拠にする。
- 実装の参照範囲: 整理時点の未コミット差分を含む作業ツリー。コードの存在を確認したもので、アプリの動作確認済みという意味ではない。

<!-- TOC:START -->

## 目次

- [元の学習メモ](#元の学習メモ)
  - [AI による補足：元のメモとの対応](#ai-による補足元のメモとの対応)
- [確認したこと・理解の整理](#確認したこと理解の整理)
  - [ローカル state と共有 state の使い分け](#ローカル-state-と共有-state-の使い分け)
  - [useState・useReducer・Context は二つの軸で選ぶ](#usestateusereducercontext-は二つの軸で選ぶ)
  - [このリポジトリの Jotai によるユーザー情報の共有](#このリポジトリの-jotai-によるユーザー情報の共有)
- [セッションで追加確認したテーマ（AI による補足）](#セッションで追加確認したテーマai-による補足)
  - [Axios の共通インスタンス](#axios-の共通インスタンス)
  - [Fetch API と Axios の違い、共通ラッパー](#fetch-api-と-axios-の違い共通ラッパー)
  - [console 出力を検出する ESLint の設定](#console-出力を検出する-eslint-の設定)
  - [Navigate の replace とブラウザの履歴](#navigate-の-replace-とブラウザの履歴)
  - [replace を使う例と履歴を残す例](#replace-を使う例と履歴を残す例)
  - [認証と認可、失敗時に戻す画面](#認証と認可失敗時に戻す画面)
  - [未使用 import の自動削除と import のソート](#未使用-import-の自動削除と-import-のソート)
  - [分割代入で取り出した未使用の token](#分割代入で取り出した未使用の-token)
  - [VS Code のミニマップをユーザー単位で非表示にする](#vs-code-のミニマップをユーザー単位で非表示にする)
  - [PR とコミットを分ける考え方](#pr-とコミットを分ける考え方)
  - [日別の受講記録と累積進捗を分ける](#日別の受講記録と累積進捗を分ける)
- [残っている確認事項](#残っている確認事項)
- [次に確認する候補（AI からの提案）](#次に確認する候補ai-からの提案)
- [参考資料](#参考資料)
- [Udemy の学習進捗](#udemy-の学習進捗)
  - [当日の受講記録](#当日の受講記録)
  - [受講履歴（新しい日付順）](#受講履歴新しい日付順)

<!-- TOC:END -->

## 元の学習メモ

原本の「自分の言葉でまとめたこと」を保持する。技術的な訂正は次の補足に分ける。

グローバルステート(Store)はReact.js標準の中で言うとuseStateが挙げられる。useStateなどのグローバルステートを使用しない場合はコンポーネントがいくつか階層に深くなっていくほどに、その内容を読み取るために中継するpropsの中に不要な値を保持したり更新したりする必要がある。それをグローバルステートを使用すると、本来は関係ないpropsなどに隠す必要がなくなり、責務がしっかりと置かれる。そのため、コードなどもスッキリする。
ただし、グローバルステートを何でも使えばいいというわけではない。グローバルステートを乱用して使うデメリットとしては、どこからも変更できるため、コードのバグなどがある場合などその場所をどこか特定するのに時間がかかったり、他の問題に直面する可能性がある。

グローバルステートは本来は本当に必要な情報、例えばユーザー情報やログインに必要な情報などのみに絞るのがベターである。

### AI による補足：元のメモとの対応

原文の「useStateなどのグローバルステート」は、次のように区別すると正確になる。

- `useState` は React 標準の Hook で、呼び出したコンポーネントの state を管理する。関数や Hook を複数箇所から呼んでも、それだけで同じ state を共有するわけではない。
- 複数のコンポーネントで共有するには、共通の親へ state を持ち上げて props で渡す、Context を使う、Jotai などの store を使う、といった方法がある。
- 原文の「中継するprops」は prop drilling の問題に対応する。ただし、中間のコンポーネントが必ず state を保持・更新するのではなく、自分では使わない値や更新関数を次へ渡すだけの場合もある。
- 共有範囲を必要なところに絞るという着眼点は有用。フォーム入力のように一画面だけで使う値まで、必ず共有 state にする必要はない。
- 「どこからも変更できる」は設計次第。store に更新処理をまとめたり、読み取り専用の Hook を使ったりして、更新の入口を整理できる。

React 標準の説明は [useState](https://react.dev/reference/react/useState) と [Context によるデータ共有](https://react.dev/learn/passing-data-deeply-with-context) を参照。

## 確認したこと・理解の整理

### ローカル state と共有 state の使い分け

**確認の出発点**

原本では、グローバルステートの使い方・メリットと、React 標準以外のライブラリのメリットを確認したいと記録している。

**AI による補足**

今回のリポジトリでは、フォーム入力には `useState`、画面をまたぐ現在のユーザー情報には Jotai を使っている。

| 方法                                 | 主な役割                                               | メリットと検討点                                                                         |
| ------------------------------------ | ------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| `useState` と props                  | コンポーネントの状態を管理し、必要に応じて親子間で渡す | 小さい範囲では流れが見えやすい。深い階層への受け渡しは増えやすい                         |
| `useState` / `useReducer` と Context | 親の下にある複数のコンポーネントへ値を共有する         | 外部ライブラリなしで prop drilling を減らせる。共有値や Context の分け方は自分で設計する |
| Jotai                                | atom 単位で状態を共有し、Hook で読み書きする           | 小さい単位の共有状態を組み立てやすい。atom の分割や更新箇所を整理する必要がある          |

Context 自体が state を保存・更新する Hook なのではなく、値を下の階層へ届ける仕組み。Jotai は React 標準の代替としてアプリ全体の `useState` を置き換える必要はなく、ローカル state と併用できる。

### useState・useReducer・Context は二つの軸で選ぶ

**確認の出発点**

初回復習版の「`useState` / `useReducer` と Context」という表について、本人から役割と使い分けがイメージできないという質問があり、具体例で確認した。

**AI による補足**

三つを同じ役割の候補として比べると混乱しやすい。次の二つの軸に分ける。

1. 状態をどう保持・更新するか: `useState` または `useReducer`。
2. その値・更新手段を下の階層へどう届けるか: props で十分か、Context が必要か。

同じ状態について useState と useReducer のどちらかを選ぶという意味であり、アプリ内で両方の Hook を併用してはいけないという意味ではない。

| 場面 | 構成の例 | 選ぶ理由 |
| --- | --- | --- |
| メールアドレス入力のような、その画面だけの単純な状態 | `useState` | 入力に合わせて値を入れ替えればよい |
| 一画面内でも、複数の状態を決まった手順で更新する | `useReducer` | 更新ルールを reducer 関数にまとめられる |
| 比較的単純な状態を離れた子コンポーネントへ共有する | `useState` と Context | 状態を保持しつつ、途中の props の中継を減らす |
| 複雑な更新ルールを持つ状態を離れた子へ共有する | `useReducer` と Context | 更新ルールの整理と、値・dispatch の共有を組み合わせる |

`useReducer` の例として、ログイン処理の状態を考える。

```text
開始 → 処理中にする、前のエラーを消す
成功 → 処理中を解除する、ユーザー情報を設定する
失敗 → 処理中を解除する、エラーメッセージを設定する
```

`useState` でも実装できるが、useReducer なら現在の状態と action から次の状態を返すルールをまとめられる。

```tsx
// 説明用の呼び出し例。reducer と初期状態は別途定義する。
const [state, dispatch] = useReducer(reducer, initialState);
dispatch({ type: "loginStarted" });
dispatch({ type: "loginSucceeded", user });
dispatch({ type: "loginFailed", error: "ログインできませんでした" });
```

action の名前・内容と reducer は自分で定義する。dispatch がログイン通信を実行するわけではない。reducer は次の状態を計算する純粋な関数として書き、通信は別の処理で行う。[React: useReducer](https://react.dev/reference/react/useReducer)

Context の共有例は次の構成。これは説明用であり、現在の App がこの形でユーザー情報を保持しているという意味ではない。

```text
App：状態と更新手段を Provider で提供する
 ├ Header：ユーザー名を参照
 └ Layout
    └ SideBar
       └ UserItem：useContext でユーザー名を参照
```

Context は、途中のコンポーネントが一つずつ props を中継しなくても、対応する Provider の下のコンポーネントが値を参照できる仕組み。アプリ全体への共有に限定されず、小さい部品の内部だけにも使える。[React: Context](https://react.dev/learn/passing-data-deeply-with-context)

実際に整理時点の [dialog.tsx](../src/components/ui/dialog.tsx) には、useState による開閉状態と、開閉の値・更新関数を渡す `DialogContext.Provider` がある。`DialogTrigger` は useContext で受け取り、開く処理を呼ぶ。親から開閉状態を渡せる制御モードもあるため、常に内部の useState だけが状態の元になるわけではない。[dropdown-menu.tsx](../src/components/ui/dropdown-menu.tsx) も同様に Context を使っている。Context はリポジトリ内で既に使われているが、ユーザー情報の共有には Jotai を使っている。

### このリポジトリの Jotai によるユーザー情報の共有

**AI による補足**

整理時点の [current-user.state.ts](../src/modules/auth/current-user.state.ts) では、次の atom を定義している。

```ts
export const currentUserAtom = atom<User>();
```

[Signup.tsx](../src/pages/Signup.tsx)・[Signin.tsx](../src/pages/Signin.tsx) では値と更新関数を取得し、API から返されたユーザーを設定する。

```tsx
const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
// 登録・ログインの処理内
setCurrentUser(user);
```

[Layout.tsx](../src/Layout.tsx) は値の読み取りだけが必要なので、次の形になっている。

```tsx
const currentUser = useAtomValue(currentUserAtom);
if (!currentUser) return <Navigate to="/signin" replace />;
```

`useAtomValue()` の戻り値は `[値, 更新関数]` ではなく値そのもの。会話中の途中のコードには分割代入した形があったが、整理時点では上記の形に修正されている。`Layout.tsx` の未使用 `useState` import も整理時点では残っていない。

| Hook                 | 用途                     |
| -------------------- | ------------------------ |
| `useAtom(atom)`      | 値と更新関数の両方が必要 |
| `useAtomValue(atom)` | 値の読み取りだけが必要   |
| `useSetAtom(atom)`   | 更新関数だけが必要       |

現状は明示的な Jotai `Provider` を配置していない。Jotai は Provider がなければデフォルトの store を利用する仕組みがある。[Jotai の Hook](https://jotai.org/docs/core/use-atom)、[Provider](https://jotai.org/docs/core/provider)

ユーザー情報が state に入ることと、サーバーがリクエストを認証することは別。整理時点ではトークンの保存・送信、再読み込み時のセッション復元の実装は確認できていない。

## セッションで追加確認したテーマ（AI による補足）

### Axios の共通インスタンス

**確認の出発点**

このリポジトリ独自の共通設定の場所と、`axios.create({ baseURL })` の意味を確認した。

**AI による補足**

[src/lib/api/index.ts](../src/lib/api/index.ts) は、共通の接続先と JSON ヘッダーを持つ Axios インスタンスを作る場所。

```ts
const baseURL = import.meta.env.VITE_API_URL;
const api = axios.create({ baseURL });
api.defaults.headers.common["Content-Type"] = "application/json";
export default api;
```

`{ baseURL }` は `{ baseURL: baseURL }` の省略記法。`axios.create` は Axios 標準の機能で、`api` はこのアプリで付けた変数名。接続先を共通化すると、Repository では `api.post("/auth/signup", ...)` のようにパスを指定できる。

整理時点では認証トークンの自動付与、interceptor、共通エラー処理、timeout の独自設定はない。環境変数の実際の値は読んでいない。

### Fetch API と Axios の違い、共通ラッパー

**確認の出発点**

Axios の共通インスタンスと同じことが Web 標準の Fetch API でも可能か、書き方や扱いの違いを確認した。

**AI による補足**

HTTP 通信を行う目的は同じ。ブラウザ標準の fetch には `axios.create({ baseURL })` に対応する設定済みクライアントの生成機能はないが、自分の関数・オブジェクトに接続先や処理をまとめられる。

| 処理 | 現在の Axios 構成 | Fetch API を直接使う場合 |
| --- | --- | --- |
| 接続先の共通化 | インスタンスの baseURL に設定 | 自分で URL を組み立てる |
| JSON の送信 | オブジェクトを渡すと Axios が変換 | JSON.stringify で文字列にし、ヘッダーを指定する |
| JSON の受信 | レスポンスの `data` を参照 | `await response.json()` で読み取る |
| HTTP エラー | 既定では成功範囲外のステータスで Promise が reject される | 404・500 が返っただけでは reject されない。response.ok 等で判定する |

Fetch もネットワーク障害等では reject される。HTTP エラーレスポンスを受け取った場合との区別が必要。[MDN: Fetch の使用](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)、[Axios のエラー処理](https://axios-http.com/docs/handling_errors)

以下は、現在の API ファイルに置くとしたらどう書けるかを示す説明用のラッパー。実装を置き換えたものではない。

```ts
const baseURL = import.meta.env.VITE_API_URL;

const api = {
  async post(path: string, data: unknown) {
    const response = await fetch(`${baseURL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`通信に失敗しました: ${response.status}`);
    }

    return response.json();
  },
};

export default api;
```

Repository 側は、Axios の呼び出しに近い形にできる。

```ts
// 上記の Fetch ラッパーを導入した場合の説明用の例
const { user, token } = await api.post("/auth/signup", {
  name,
  email,
  password,
});
```

このラッパーは JSON の中身を直接返すので、現在の Axios 呼び出しにある `result.data` は使わない。同じ `api.post` という名前でも、戻り値の形はラッパーの設計次第。以前の回答で出た `postJson` も、自分で付ける関数名であり Fetch 標準の機能ではない。

例の前提・省略点は次のとおり。

- baseURL の末尾に `/` を付けず、path の先頭に `/` を付ける単純な連結を前提にしている。
- 成功時は JSON が返る API 用。204 のような本文のない成功レスポンスや、テキスト・ファイルの受信は別の扱いが必要。
- 戻り値の型・内容の検証、詳細なエラー内容、認証、キャンセル等の処理は省いている。TypeScript の型を付けるだけでサーバーの応答内容を実行時に検証できるわけではない。

現在の `src/lib/api/index.ts` は引き続き Axios を使用している。厳密には設定済みインスタンスの共通化で、Fetch の例は関数内に共通処理をまとめるラッパー。どちらも呼び出し側で繰り返しを書くことを減らせる。[Axios: インスタンスの作成](https://axios-http.com/docs/instance)

### console 出力を検出する ESLint の設定

**確認の出発点**

提示された console 出力に関する記事を踏まえ、このリポジトリの `no-console` の有無と設定場所を確認した。

**AI による補足**

会話の最初の確認では未設定だったが、整理時点の [eslint.config.js](../eslint.config.js) には次が追加されている。

```js
rules: {
  "no-console": "error",
}
```

このルールは `console.log` などの使用を検出する。console 呼び出しを本番ビルドから自動削除する設定ではない。`console.warn` と `console.error` だけ許可する場合は、次の設定に変更できるが、これは会話で提示した選択肢であって現在の設定ではない。

```js
"no-console": ["error", { allow: ["warn", "error"] }]
```

`npm run lint` で検査する。現状の `build` は `tsc -b && vite build` なので ESLint は含まれない。`vite.config.ts` にも console 削除の設定はない。[ESLint 公式](https://eslint.org/docs/latest/rules/no-console)

### Navigate の replace とブラウザの履歴

**確認の出発点**

Udemy 教材で紹介された `Navigate` と `replace` の意味、標準化された仕組みか、採用するメリット・デメリットを確認した。教材の具体的な動画・コード全体は参照していない。

**AI による補足**

```tsx
<Navigate to="/" replace />
```

`Navigate` は移動を行う React Router のコンポーネント。ここでの `replace` は関数ではなく prop で、`replace={true}` の省略形。`navigate("/", { replace: true })` は、`useNavigate()` で取得した関数を使う別の書き方。

- `replace` なし: 移動先を履歴に追加する。前の画面へ「戻る」で戻れる。
- `replace` あり: 現在の履歴を移動先で置き換える。置き換えた画面へ、その履歴を使って戻ることはできない。
- 過去の履歴全体を消す機能ではない。URL の直接入力による再アクセスも禁止しない。

例えば、履歴が「公開ページ → ログイン画面」の状態でログイン成功後の移動に `replace` を使うと、「公開ページ → ホーム画面」になる。

履歴の追加・置換はブラウザ標準の History API にもある。HTML の `<a>` に `replace` 属性を付ける機能ではない。

| ブラウザの API           | 役割                                                               |
| ------------------------ | ------------------------------------------------------------------ |
| `history.pushState()`    | 履歴を追加する。呼び出しだけで別ページの内容を読み込むものではない |
| `history.replaceState()` | 現在の履歴を置き換える。呼び出しだけで画面の内容を切り替えない     |
| `location.replace()`     | 指定先のページを読み込み、現在の履歴を置き換える                   |

React Router は履歴操作と画面表示の切り替えを組み合わせる。通常のノート一覧から詳細への移動なら履歴を残す利点があり、ログイン後の自動転送では役目を終えた画面を置き換える利点がある。[Navigate の公式説明](https://reactrouter.com/api/components/Navigate)

### replace を使う例と履歴を残す例

**AI による補足**

以下はセッションで調査した一次資料の整理。公式教材の例を、商用サービスの本番採用実績とは扱わない。採用しなかった経緯が公開されていない場合は、却下の事実を推測しない。

| 確認した資料・場面                  | 実装・説明                                                           | 得られる判断材料                                                                                   |
| ----------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| React Router 公式のログインサンプル | ログイン成功後に `navigate(from, { replace: true })`                 | 戻る操作でログイン画面へ戻さない意図がコメントに明記されている                                     |
| Outline の共同編集                  | 共同編集の認証情報の再取得に失敗すると `history.replace(homePath())` | 実際の OSS アプリで置換を使っている。ただし、この箇所に採用理由は明記されていない                  |
| Next.js 公式の検索教材              | 入力に応じた URL 更新に `replace()`                                  | 入力途中の履歴を増やさずに済む。これは実装から説明できる利点で、著者の明記した選定理由とは区別する |
| Next.js 公式の商品並べ替え例        | `pushState()` で履歴を追加する                                       | 前の状態へ戻れることを公式が説明している。`replace` の不採用決定の履歴まで公開しているわけではない |
| nuqs の URL 状態管理                | 既定は replace。タブ・モーダルなどでは push を選択できる             | 戻る操作を状態の復元に使うか、細かな履歴を増やさないかで使い分ける                                 |

同じ操作でも用途により選択は変わる。例えば検索入力途中は replace、検索を明示的に確定した時点は push にする設計も考えられる。これは AI の提案で、このリポジトリへの実装・採用決定ではない。

### 認証と認可、失敗時に戻す画面

**確認の出発点**

編集ページで認証がうまくいかなかった場合、まず一覧へ戻し、それも利用できない場合はログイン画面へ戻す方がよいのではないか、という疑問を確認した。

**セッション中の本人の整理**

> 個人的には、その認証がうまくいかなかった場合は、一覧ページに戻した方がユーザーとしても分かりやすいような気はします。そこでトーストなどのポップアップなどがあった場合。

本人はさらに、ユーザー A はマスター権限、ユーザー B は一般権限で、「1ページ目にはマスター権限だと入れるけど、2ページ目はマスター権限でも一般権限でも入れる」という例を挙げた。これは権限によって入れる画面を分ける設計例であり、このリポジトリに実装済みの権限仕様ではない。

**AI による補足**

| 失敗の種類 | 意味                                             | 対応の提案例                                               |
| ---------- | ------------------------------------------------ | ---------------------------------------------------------- |
| 認証の問題 | 有効なログインを確認できない。セッション切れなど | 再認証が必要と判明したならログイン画面へ直接案内する       |
| 認可の問題 | ログイン済みだが、その画面・操作の権限がない     | 利用できる一覧へ移動し、権限がないことをトースト等で伝える |
| 通信の問題 | 通信障害等で判定できない                         | 認証切れと決めつけず、再試行やエラー表示を検討する         |

一般ユーザーにマスター専用画面の権限がない場合、ログインし直しても通常は解消しない。一覧へ戻すという本人の案が適する。一方、ログイン切れで一覧も利用できないと分かっているなら、一覧を経由せずログインへ案内する方が不要な遷移を減らせる。

行き先の選択と replace は別の判断で、一覧への移動にも使える。

```tsx
// 説明用の例。現状のアプリに追加した処理ではない。
navigate("/notes", { replace: true });
```

Outline の例についての訂正: 対象は共同編集接続の認証失敗後、認証情報を再取得して接続を試み、その再取得も失敗した場合にホームへ移動する処理。`homePath()` は通常 `/home`、共有ルート用の設定がある場合は `/` を返す。アプリ全体の認証・認可の分岐や、一覧・トーストをなぜ選ばなかったかまでは、このコードだけから分からない。前の AI 回答にあった「利用できない編集画面を履歴に残さない意図」は推測として扱う。

### 未使用 import の自動削除と import のソート

**確認の出発点**

`Layout.tsx` に残った未使用の `import { useState } from "react"` を自動削除できるか、import の並び順も整理できるかを確認した。`useState` はコンポーネントではなく Hook。

**AI による補足**

整理時点では、ESLint に次の設定が追加されている。

```js
"no-unused-vars": "off",
"@typescript-eslint/no-unused-vars": [
  "error",
  {
    enableAutofixRemoval: {
      imports: true,
    },
  },
],
```

この設定は未使用 import を自動修正対象にする。`npm run lint` は検査、`npm run lint -- --fix` は修正可能な問題の自動修正も行う。TypeScript の `noUnusedLocals`・`noUnusedParameters` も有効だが、コンパイラーのこれらの設定自体がソースを自動削除するわけではない。

セッションでは、インストール済みの typescript-eslint 8.72.0 を用いたメモリ上のコード例で、未使用 `useState` import の自動削除を確認した。アプリ全体へ自動修正を実行したという意味ではない。[未使用 import の自動修正の公式説明](https://typescript-eslint.io/rules/no-unused-vars/#enableautofixremoval)

import のソートは `eslint-plugin-simple-import-sort` を候補として提示した。整理時点では依存関係・ESLint 設定に追加されていない。導入する場合の設定例は以下。

```sh
npm install -D eslint-plugin-simple-import-sort
```

```js
// eslint.config.js の先頭へ追加
import simpleImportSort from "eslint-plugin-simple-import-sort";

// 既存の TypeScript 対象の設定オブジェクトに追加
plugins: {
  "simple-import-sort": simpleImportSort,
},
// 既存の rules に追加
"simple-import-sort/imports": "error",
"simple-import-sort/exports": "error",
```

上記は追加箇所を抜き出した断片であり、ファイル全体としてそのまま貼るコードではない。設定後は `npm run lint -- --fix` でソートも行える。[公式 README](https://github.com/lydell/eslint-plugin-simple-import-sort#usage)

VS Code と ESLint 拡張機能を使う場合は、`.vscode/settings.json` で保存時の修正を設定できる。以下は会話で提示した案で、保存時の動作確認は行っていない。

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

VS Code 標準の `source.organizeImports` でも未使用 import の削除とソートができる。こちらを使うならソート担当を統一し、ESLint 側と異なる並びを要求しないようにする。`explicit` は明示的な保存時に実行する指定。[VS Code 公式](https://code.visualstudio.com/docs/typescript/typescript-refactoring#_organize-imports)

副作用のために読み込むモジュールは区別が必要。例えば `import "./styles/layout.css";` は値を使わなくてもスタイルを読み込む目的がある。未使用の束縛を含む import を自動削除する際、モジュールの初期化処理まで不要とは限らない。

### 分割代入で取り出した未使用の token

**確認の出発点**

登録処理の戻り値から `user` と `token` を取り出しているが、`user` だけを使っている場合をどう解釈するか確認した。

**AI による補足**

整理時点の `Signup.tsx` は次の形。`Signin.tsx` も同様。

```tsx
const { user, token } = await authRepository.signup(name, email, password);
setCurrentUser(user);
// console.log("token: ", token);
```

これはオブジェクトの分割代入で、`user` と `token` をそれぞれローカル変数として取り出す。コメント内の参照は使用に数えないため、現状の `token` は未使用。

呼び出し側で `user` だけ必要なら、次のように書ける。これは修正の提案で、今回アプリのコードを変更してはいない。

```tsx
const { user } = await authRepository.signup(name, email, password);
setCurrentUser(user);
```

Repository が `token` を返すことまでやめる必要はなく、呼び出し側が使う項目だけを取り出せばよい。ただし、後続リクエストの認証に token が必要かは別途確認する事項。

| 対象                           | 今回の ESLint 設定での扱い                        |
| ------------------------------ | ------------------------------------------------- |
| 未使用の `import { useState }` | 検出し、`--fix` で自動削除できる                  |
| 未使用の分割代入変数 `token`   | 検出するが、import 用の自動削除設定では削除しない |

### VS Code のミニマップをユーザー単位で非表示にする

**確認の出発点**

右側のミニマップを不要とし、プロジェクト単位ではなくユーザー単位に適用する方法を確認した。

**AI による補足**

コマンドパレットの `Preferences: Open User Settings (JSON)` でユーザー設定を開き、既存のオブジェクト内に次を追加する。以下は設定例で、今回ユーザー設定を変更したり、設定済みかを確認したりしてはいない。

```json
{
  "editor.minimap.enabled": false
}
```

設定画面なら `⌘ + ,` で開き、「ユーザー」を選んで `@id:editor.minimap.enabled` を検索し、チェックを外す。ユーザー設定はプロジェクトをまたいで適用されるが、ワークスペース側の指定等により上書きされる場合がある。[ミニマップの公式説明](https://code.visualstudio.com/docs/editing/getting-started/userinterface#_minimap)、[設定の適用範囲](https://code.visualstudio.com/docs/configure/settings)

### PR とコミットを分ける考え方

**確認の出発点**

本人は教材の番号と変更内容の対応を確認し、それぞれの PR を作る方針と、コミットの粒度を相談した。

**AI による補足**

講座番号とコード変更の対応は、視聴した日・完了した日とは別に扱う。今回の会話では、ログインとユーザー情報共有、ESLint の設定、TIL の整理を別の目的として分ける方針を扱った。PR はレビューする目的の単位、コミットはその目的に向けた意味のある変更の単位として考える。

例えばログイン関連は、API 呼び出し、フォームとの接続、共有状態と画面遷移に分けると変更の役割を追いやすい。これはコード整理の観点であり、コミット数から受講本数は計算しない。過去の PR 作成操作の経過は学習内容として転載せず、今回 GitHub 上の状態は再確認していない。

### 日別の受講記録と累積進捗を分ける

**セッション中の本人の整理**

> 今後はこの日にUdemyの何番から何番まで受講したという進捗記録を残していきたい

本人はモチベーションを維持するため、README に講座と総動画数を記録し、日々の復習版に進捗と新しい日付順の受講履歴を載せることを希望した。情報量が増えるため末尾へ置く方針を採用した。

**AI による補足**

今回更新した til-review は、README を講座の基本情報、日々の TIL を受講実績の根拠として使う。復習版の末尾に、当日の記録・対象日までの累積進捗・降順の履歴をまとめる。別の手入力台帳は作らない。

- 完了番号を重複なしで数え、途中や再視聴は累積完了数に追加しない。
- 日付不明の完了は、対象日以前の完了と確認できる場合だけ累積へ含める。後日初めて知った完了を過去日に算入しない。
- メモがないことを未受講とみなさない。情報不足は未確認とし、数字を作って0%と表示しない。
- 原本と最新復習版の当日の記録を照合する。生成済みの履歴表や累積値を再び足し込まない。
- 保存済みの復習版はその時点の記録として残し、後日の進捗や総数変更で書き換えない。

alt-review で指摘されたのは、日付不明の完了を過去日の累積に含める条件の曖昧さだった。対象日以前の完了を確認できる場合に限定して再レビューし、追加修正なしの案を本人が採用した。v3 で更新後のスキルを適用し、この v4 ではその後の本人の申告を反映した。

## 残っている確認事項

- 1〜14番および22番以降の完了状況、15〜17番の受講日、復習本数は未確認。11月1日の18〜21番の完了は本人の申告により確認済み。

- 実際のバックエンドで token をどう送信・保存し、再読み込み時にログイン状態をどう復元する想定か。現在のフロントエンドには対応処理を確認できていない。
- 登録・ログイン失敗、通信失敗時のユーザー向け表示。現状は各 API 呼び出しの周囲にエラー表示用の処理を確認できていない。
- マスター・一般ユーザーの権限分岐は設計例であり、実装済みの仕様ではない。どの画面を誰に許可するかは未決定。
- ソートの導入案は未適用。保存時の自動修正も実動作未確認。
- Outline 全体のエラー処理・画面誘導の設計意図や、トーストの採否の理由までは調査していない。

## 次に確認する候補（AI からの提案）

- `useState` のフォーム入力と `currentUserAtom` の共有値を比較し、どのコンポーネントが読み書きするか追う。部品内の共有例として `dialog.tsx` の useState と Context も追う。
- 未使用 `token` の取り出しをやめるか、教材の続きで必要になるか確認する。import の自動修正だけでは解消しないことも確認する。
- `no-console` と未使用 import 自動削除の設定は追加済みなので、次は lint の実行と、必要ならソート・保存時修正の動作を確認する。
- バックエンドのログイン仕様を確認した上で、再読み込み時の復元と、認証切れ・権限不足・通信障害の表示を分けて検討する。

- Fetch への移行は決まっていない。比較を試すなら、説明用ラッパーの戻り値と Axios の `result.data` の違いを確認し、成功 JSON・HTTP エラー・本文なし応答の扱いを検討する。

## 参考資料

- [React: useReducer](https://react.dev/reference/react/useReducer)
- [MDN: Fetch API の使用](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [Axios: インスタンスの作成](https://axios-http.com/docs/instance)
- [Axios: エラー処理](https://axios-http.com/docs/handling_errors)
- [VS Code: ミニマップ](https://code.visualstudio.com/docs/editing/getting-started/userinterface#_minimap)
- [VS Code: ユーザー設定とワークスペース設定](https://code.visualstudio.com/docs/configure/settings)

- [React: useState](https://react.dev/reference/react/useState)
- [React: Context によるデータ共有](https://react.dev/learn/passing-data-deeply-with-context)
- [Jotai: useAtom と用途別の Hook](https://jotai.org/docs/core/use-atom)
- [Jotai: Provider とデフォルト store](https://jotai.org/docs/core/provider)
- [React Router: Navigate](https://reactrouter.com/api/components/Navigate)
- [MDN: History.replaceState](https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState)
- [MDN: History.pushState](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState)
- [MDN: Location.replace](https://developer.mozilla.org/en-US/docs/Web/API/Location/replace)
- [React Router 公式のログインサンプル](https://github.com/remix-run/react-router-examples/blob/main/auth/src/App.tsx)
- [Outline: MultiplayerEditor](https://github.com/outline/outline/blob/main/app/scenes/Document/components/MultiplayerEditor.tsx)
- [Outline: homePath の定義](https://github.com/outline/outline/blob/main/app/utils/routeHelpers.ts)
- [Next.js: 検索とページネーションの教材](https://nextjs.org/learn/dashboard-app/adding-search-and-pagination)
- [Next.js: 並べ替えと History API の例](https://nextjs.org/docs/app/getting-started/linking-and-navigating#native-history-api)
- [nuqs: History オプション](https://nuqs.dev/docs/options#history)
- [ESLint: no-console](https://eslint.org/docs/latest/rules/no-console)
- [typescript-eslint: no-unused-vars の自動修正](https://typescript-eslint.io/rules/no-unused-vars/#enableautofixremoval)
- [simple-import-sort: 使用方法](https://github.com/lydell/eslint-plugin-simple-import-sort#usage)
- [VS Code: Organize Imports](https://code.visualstudio.com/docs/typescript/typescript-refactoring#_organize-imports)
- [会話で提示された記事: 本番 HTML の console.log と対策](https://digital-supporter.net/security/guide/html-console-log.php) — 質問の出発点として参照。設定の仕様は上記の公式資料で確認した。

## Udemy の学習進捗

- 集計対象日・整理日: 2026-11-01（Asia/Tokyo）
- 講座: [React + Typescriptで超本格的なNotionクローンを作ろう](https://www.udemy.com/course/react-notion-clone/)
- 総動画数: **53 本**（[README の記録](../README.md#学習用の教材)、記録確認日 2026-11-01。本人の記載値）
- 確認できた累積完了: **少なくとも 7 / 53 本（13.2%）**。確認済み番号は15〜21番。記録のない番号を未受講とは扱わない。
- 当日の完了: **18〜21番の4本**（本人の申告により今回確定）
- 当日の新規完了: **4本**（今日行った範囲の確定申告を当日の完了実績として記録）
- 復習・再視聴本数: 未確認。申告がないため0本とは断定しない。

### 当日の受講記録

本人の申告（現セッション、2026-11-01）:

> 教えてもらった内容から、今日行った内容は18から21のすべてであると確信できました。

直前の完了本数の確認に対する申告として、18〜21番のすべてを当日完了と記録する。v3 の当日範囲未確認と21番の完了未確認を更新した。

| 番号 | 内容 | 状態 |
| --- | --- | --- |
| 18 | ログインAPIを叩く処理を作ろう | 完了 |
| 19 | ログイン処理を呼び出してみよう | 完了 |
| 20 | ログインしてるユーザーをグローバルステートで管理しよう1 | 完了 |
| 21 | ログインしてるユーザーをグローバルステートで管理しよう2 | 完了 |

出所: この節に保存した本人の当日申告と、同セッションで提示された教材一覧。原本には受講範囲の追記をしていないため、次回はこの受講記録も引き継ぐ。

### 受講履歴（新しい日付順）

受講範囲が不明の日は、学習メモの存在と受講実績を区別する。

| 日付 | 講座 | 当日の受講内容 | その日までの確認済み累積 | 出所 |
| --- | --- | --- | --- | --- |
| 2026-11-01 | Notion クローン | 18〜21番の4本を完了 | 少なくとも7 / 53本（13.2%） | [当日の本人申告](#当日の受講記録) |
| 2026-10-26 | 講座との対応未確認 | コース16への質問あり。受講日・完了は未確認 | 未確認 | [メモ](<2026-10-26(Mon).md>) |
| 2026-10-25 | 講座との対応未確認 | React Router等の学習メモあり。受講範囲は未確認 | 未確認 | [メモ](2026-10-25.md) |

**受講日不明の完了記録**

15〜17番の3本は本人が提示した教材一覧の「完了済み」を根拠とする。今回の確認時点（2026-11-01）で既に完了している記録として累積に含めるが、受講日を10月26日などに割り当てない。

一覧の18〜20番と今回の18〜21番は重複しているため、6本と4本を足さず、番号の集合15〜21番の7本として数える。1〜14番と22番以降の完了状況は未確認であり、13.2%はこのセッションで裏付けられた分の割合である。
