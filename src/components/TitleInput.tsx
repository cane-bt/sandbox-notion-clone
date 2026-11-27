import { useLayoutEffect, useRef, useState } from 'react';

interface Props {
  initialTitle: string;
  isSaving: boolean;
  saveFailed: boolean;
  onTitleChange: (title: string) => void;
  onRetry: (title: string) => Promise<void>;
}

export default function TitleInput({
  initialTitle,
  isSaving,
  saveFailed,
  onTitleChange,
  onRetry,
}: Props) {
  const [value, setValue] = useState(initialTitle);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const restoreFocus = useRef(false);

  useLayoutEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    // disabled にする前に、フォーカスがタイトル欄にあるか記録する。
    if (isSaving) restoreFocus.current = document.activeElement === input;
    input.disabled = isSaving;

    if (!isSaving) {
      if (restoreFocus.current && document.activeElement === document.body && document.hasFocus()) {
        input.focus({ preventScroll: true });
      }
      restoreFocus.current = false;
    }
  }, [isSaving]);

  return (
    <div className="title-input-container">
      <textarea
        className="title-input"
        value={value}
        placeholder="無題"
        onChange={(e) => {
          const title = e.target.value;
          setValue(title);
          onTitleChange(title);
        }}
        ref={inputRef}
        aria-label="ノートのタイトル"
      />
      {isSaving && <span role="status">保存中...</span>}
      {saveFailed && value !== initialTitle && (
        <div role="alert">
          タイトルを保存できませんでした。
          <button type="button" onClick={() => void onRetry(value)}>
            再試行
          </button>
        </div>
      )}
    </div>
  );
}
