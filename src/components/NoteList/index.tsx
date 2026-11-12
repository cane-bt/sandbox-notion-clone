import { noteRepository } from '../../modules/notes/note.repository';
import { useNoteStore } from '../../modules/notes/notes.state';
import NoteItem from './NoteItem';

export default function NoteList() {
  const noteStore = useNoteStore();
  const notes = noteStore.getAll();

  const createChild = async (e: React.MouseEvent, parentId: number) => {
    e.preventDefault();
    try {
      const newNote = await noteRepository.create({ parentId });
      noteStore.set([newNote]);
    } catch {
      alert('ノートの作成に失敗しました');
    }
  };

  return (
    <>
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onCreate={(e) => createChild(e, note.id)}
        />
      ))}
    </>
  );
}
