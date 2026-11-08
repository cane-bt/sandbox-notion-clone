import './styles/layout.css';

import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import SearchModal from './components/SearchModal';
import SideBar from './components/SideBar';
import { currentUserAtom } from './modules/auth/current-user.state';
import { noteRepository } from './modules/notes/note.repository';
import { useNoteStore } from './modules/notes/notes.state';

export default function Layout() {
  const currentUser = useAtomValue(currentUserAtom);
  const [isLoading, setIsLoading] = useState(true);
  // const noteStore = useNoteStore();
  // set       ：取り出したいプロパティの名前
  // setNotes  ：取り出したものに付ける変数
  const { set: setNotes } = useNoteStore();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // useEffect(() => {
  //   fetchNotes();
  // }, []);

  // const fetchNotes = async () => {
  //   setIsLoading(true);
  //   const notes = await noteRepository.find();
  //   noteStore.set(notes);
  //   setIsLoading(false);
  // };

  useEffect(() => {
    if (!currentUser) return;

    let ignore = false;

    const fetchNotes = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const notes = await noteRepository.find();
        if (!ignore) {
          setNotes(notes);
        }
      } catch {
        if (!ignore) {
          setErrorMessage('ノートの取得に失敗しました');
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    void fetchNotes();

    return () => {
      ignore = true;
    };
    // noteStore 全体ではなく、useCallback で安定した set 関数を依存にする
    // }, [currentUser, noteStore.set]);
    // noteStore.set と、分割代入した setNotes は同じ関数を指す
  }, [currentUser, setNotes]);

  if (!currentUser) return <Navigate to="/signin" replace />;

  return (
    <div className="layout-container">
      {!isLoading && <SideBar />}

      <main className="layout-main">
        {isLoading && <p role="status">読み込み中...</p>}
        {errorMessage && <p role="alert">{errorMessage}</p>}
        <Outlet />
      </main>
      <SearchModal />
    </div>
  );
}
