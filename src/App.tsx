import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./Layout";
import { authRepository } from "./modules/auth/auth.repository";
import { currentUserAtom } from "./modules/auth/current-user.state";
import Home from "./pages/Home";
import NoteDetail from "./pages/NoteDetail";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const setCurrentUser = useSetAtom(currentUserAtom);

  // 以前のコード（比較用に保存。実行しない）
  /*
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const user = await authRepository.getCurrentUser();
      setCurrentUser(user);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  */

  // この行では処理を React に渡すだけで、中の通信は DOM への反映後に始まる。
  useEffect(() => {
    // 元のコードには、不要になった通信の結果を反映しないための対策がなかった。
    // この Effect の実行ごとにフラグを用意し、cleanup 後の状態更新を防ぐ。
    let ignore = false;

    // 元は App 内の別の場所に定義した関数を、依存配列 [] から呼んでいた。
    // その関数は再描画ごとに作り直されるため、依存に追加するだけでは
    // 通信が繰り返され得る。ここでしか使わない関数は Effect 内に定義する。
    // Effect 自体を async にすると Promise を返してしまうため、中の関数を async にする。
    const fetchCurrentUser = async () => {
      try {
        const user = await authRepository.getCurrentUser();
        if (!ignore) {
          setCurrentUser(user);
        }
      } catch {
        if (!ignore) {
          setCurrentUser(undefined);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    void fetchCurrentUser();

    // React は Effect の再実行前や App が画面から外れるときに cleanup を呼ぶ。
    // 開発時の StrictMode の追加実行でも、古い処理の結果を採用しない。
    // これは結果を無視する対策であり、通信の中止やリクエストの重複排除ではない。
    return () => {
      ignore = true;
    };
    // 外側から使う setCurrentUser を依存に含め、変わった場合は同期をやり直す。
    // setIsLoading は React が参照の安定性を保証するため、依存から省略できる。
  }, [setCurrentUser]);

  if (isLoading) {
    return <div>読み込み中...</div>;
  }

  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/notes/:id" element={<NoteDetail />} />
          </Route>
        </Routes>
      </div>
      <div className="app-container"></div>
    </BrowserRouter>
  );
}

export default App;
