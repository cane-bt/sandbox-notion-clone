import { useNoteStore } from '../../modules/notes/notes.state';
import NoteItem from './NoteItem';

export default function NoteList() {
  const noteStore = useNoteStore();
  const notes = noteStore.getAll();

  return (
    <>
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </>
  );
}
