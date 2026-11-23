import { ja } from '@blocknote/core/locales';
import { BlockNoteView } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';
import '@blocknote/mantine/style.css';

export function Editor() {
  const editor = useCreateBlockNote({ dictionary: ja });
  return (
    <div>
      <BlockNoteView editor={editor} theme="light" />
    </div>
  );
}
