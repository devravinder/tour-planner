import { RefObject, useCallback } from "react";
import ReactQuill from "react-quill";
import Quill, { RangeStatic } from "quill";

type AstractQuill = {
  quill: Quill;
};

export function insertStar(this: AstractQuill) {
  const cursorPosition = this.quill.getSelection(true).index;
  this.quill.insertText(cursorPosition, "★");
  this.quill.setSelection((cursorPosition + 1) as unknown as RangeStatic);
}

export function useInsertSmiley(ref: RefObject<ReactQuill>) {
  const insertSmiley = (ref: RefObject<ReactQuill>) => {
    if (ref.current) {
      const editor = ref.current.getEditor();
      const cursorPosition = editor.getSelection(true).index;
      editor.insertText(cursorPosition, "😃");
      editor.setSelection((cursorPosition + 1) as unknown as RangeStatic);
      // editor.insertEmbed(cursorPosition, "image", url, "user");
    }
  };

  const handler = useCallback(() => {
    insertSmiley(ref);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { handler };
}
