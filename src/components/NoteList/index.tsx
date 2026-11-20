import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { Note } from '../../modules/notes/note.entity';
import { noteRepository } from '../../modules/notes/note.repository';
import { useNoteStore } from '../../modules/notes/notes.state';
import NoteItem from './NoteItem';

interface Props {
  layer?: number;
  parentId?: number;
}

export default function NoteList({ layer = 0, parentId }: Props) {
  const noteStore = useNoteStore();
  const notes = noteStore.getAll();
  const [expanded, setExpanded] = useState<Map<number, boolean>>(new Map());
  const navigate = useNavigate();

  const createChild = async (e: React.MouseEvent, parentId: number) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const newNote = await noteRepository.create({ parentId });
      noteStore.set([newNote]);
      setExpanded((prev) => {
        const newExpanded = new Map(prev);
        newExpanded.set(parentId, true);
        return newExpanded;
      });
      moveToDetail(newNote.id);
    } catch {
      alert('ノートの作成に失敗しました');
    }
  };

  const fetchChildren = async (e: React.MouseEvent, note: Note) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const children = await noteRepository.find({ parentId: note.id });
      if (children == null) return;
      noteStore.set(children);
      setExpanded((prev) => {
        const newExpanded = new Map(prev);
        newExpanded.set(note.id, !prev.get(note.id));
        return newExpanded;
      });
    } catch {
      alert('子ノートの取得に失敗しました');
    }
  };

  const moveToDetail = (noteId: number) => {
    navigate(`/notes/${noteId}`);
  };

  return (
    <>
      {notes
        .filter((note) => note.parentId == parentId)
        .map((note) => (
          <div key={note.id}>
            <NoteItem
              key={note.id}
              layer={layer}
              note={note}
              onClick={() => moveToDetail(note.id)}
              onCreate={(e) => createChild(e, note.id)}
              onExpand={(e) => fetchChildren(e, note)}
              expanded={expanded.get(note.id)}
            />
            {expanded.get(note.id) && (
              <NoteList layer={layer + 1} parentId={note.id} />
            )}
          </div>
        ))}
    </>
  );
}
