import type { Note } from '../modules/notes/note.entity';

interface Props {
  initialData: Note;
}

export default function TitleInput({ initialData }: Props) {
  return (
    <div className="title-input-container">
      <textarea
        className="title-input"
        value={initialData.title ?? '無題'}
        readOnly
        aria-label="ノートのタイトル"
      />
    </div>
  );
}
