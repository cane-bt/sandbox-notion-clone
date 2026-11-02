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

  useEffect(() => {
    let ignore = false;

    const fetchCurrentUser = async () => {
      try {
        const user = await authRepository.getCurrentUser();
        if (!ignore) setCurrentUser(user);
      } catch {
        if (!ignore) setCurrentUser(undefined);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };

    void fetchCurrentUser();

    return () => {
      ignore = true;
    };
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
