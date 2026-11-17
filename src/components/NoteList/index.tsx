import type { Note } from '../../modules/notes/note.entity';
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

  const fetchChildren = async (e: React.MouseEvent, note: Note) => {
    e.preventDefault();

    try {
      const children = await noteRepository.find({ parentId: note.id });
      if (children == null) return;
      noteStore.set(children);
    } catch {
      alert('子ノートの取得に失敗しました');
    }
  };

  return (
    <>
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onCreate={(e) => createChild(e, note.id)}
          onExpand={(e) => fetchChildren(e, note)}
        />
      ))}
    </>
  );
}
