import '../styles/pages/note-detail.css';

import { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import TitleInput from '../components/TitleInput';
import { noteRepository } from '../modules/notes/note.repository';
import { useNoteStore } from '../modules/notes/notes.state';

export default function NoteDetail() {
  const { id: paramId } = useParams();
  const id = Number(paramId);

  if (!Number.isSafeInteger(id) || id <= 0) {
    return <div role="alert">ノートが見つかりません</div>;
  }

  // ID が変わったら読み込み状態を初期化し、前のノートを表示しない。
  return <NoteDetailContent key={id} id={id} />;
}

function NoteDetailContent({ id }: { id: number }) {
  const { getOne, set: setNotes } = useNoteStore();
  const note = getOne(id);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    const fetchOne = async () => {
      try {
        const result = await noteRepository.findOne(id);
        if (!ignore) setNotes([result]);
      } catch (error) {
        if (!ignore) {
          setErrorMessage(
            isAxiosError(error) && error.response?.status === 404
              ? 'ノートが見つかりません'
              : 'ノートの取得に失敗しました',
          );
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };

    void fetchOne();
    return () => {
      ignore = true;
    };
  }, [id, setNotes]);

  if (isLoading) return <div role="status">読み込み中...</div>;
  if (errorMessage) return <div role="alert">{errorMessage}</div>;
  if (!note) return <div role="alert">ノートが見つかりません</div>;

  return (
    <div className="note-detail-container">
      <div className="note-detail-content">
        <TitleInput initialData={note} />
      </div>
    </div>
  );
}
