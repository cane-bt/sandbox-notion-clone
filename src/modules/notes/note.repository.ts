import api from '../../lib/api';
import { Note } from './note.entity';

export const noteRepository = {
  async find(): Promise<Note[]> {
    const result = await api.get('/notes');
    return result.data.notes.map((data: Note) => new Note(data));
  },
  async create(params: { title?: string; parentId?: number }): Promise<Note> {
    const result = await api.post('/notes', {
      title: params.title,
      parentId: params.parentId,
    });
    return new Note(result.data);
  },
};
