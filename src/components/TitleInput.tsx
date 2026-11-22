import { useState } from 'react';

interface Props {
  initialTitle: string;
  isSaving: boolean;
  saveFailed: boolean;
  onSave: (title: string) => Promise<void>;
}

export default function TitleInput({ initialTitle, isSaving, saveFailed, onSave }: Props) {
  const [value, setValue] = useState(initialTitle);

  return (
    <div className="title-input-container">
      <textarea
        className="title-input"
        value={value}
        placeholder="無題"
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => void onSave(value)}
        disabled={isSaving}
        aria-label="ノートのタイトル"
      />
      {isSaving && <span role="status">保存中...</span>}
      {saveFailed && value !== initialTitle && (
        <div role="alert">
          タイトルを保存できませんでした。
          <button type="button" onClick={() => void onSave(value)}>再試行</button>
        </div>
      )}
    </div>
  );
}
