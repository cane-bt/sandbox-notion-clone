import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL; // React.jsで環境変数の値を取得するためのコードの書き方
const api = axios.create({ baseURL });
// React.jsからバックエンドへ送出するデータは主に2つ
//  ヘッダー
//      主にリクエストや認証情報を入れる部分
//  ボディ
//      実際にバックエンドに渡したいデータを入れる。

// Content-Type: ボディ部分でどのようなデータ形式でデータを送るかを決定するための設定
api.defaults.headers.common["Content-Type"] = "application/json";

export default api;
