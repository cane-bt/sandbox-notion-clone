import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';

import type { Note } from './note.entity';

const notesAtom = atom<Note[]>([]);

export const useNoteStore = () => {
  const [notes, setNotes] = useAtom(notesAtom);

  const getAll = () => notes;

  const set = useCallback(
    (newNotes: Note[]) => {
      setNotes((oldNotes) => {
        const combineNotes = [...oldNotes, ...newNotes];
        const uniqueNotes: { [key: number]: Note } = {};

        for (const note of combineNotes) {
          uniqueNotes[note.id] = note;
        }

        return Object.values(uniqueNotes);
      });
    },
    [setNotes],
  );

  return { getAll, set };
};
