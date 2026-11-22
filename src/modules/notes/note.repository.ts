import api from '../../lib/api';
import { Note } from './note.entity';

export const noteRepository = {
  async find(options?: { parentId: number }): Promise<Note[]> {
    const result = await api.get('/notes', {
      params: { parentId: options?.parentId },
    });
    return result.data.notes.map((data: Note) => new Note(data));
  },
  async create(params: { title?: string; parentId?: number }): Promise<Note> {
    const result = await api.post('/notes', {
      title: params.title,
      parentId: params.parentId,
    });
    return new Note(result.data);
  },
  async findOne(id: number): Promise<Note> {
    const result = await api.get(`/notes/${id}`);
    return new Note(result.data);
  },
  async update(
    id: number,
    note: { title?: string; content?: string },
  ): Promise<Note> {
    const result = await api.patch(`/notes/${id}`, note);
    return new Note(result.data);
  },
};
