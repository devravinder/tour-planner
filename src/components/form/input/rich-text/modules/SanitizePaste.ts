import Quill, { RangeStatic } from "quill";
import { isRichText } from "../../../../../services/utils";
import { sanitize } from "../../../../../services/utils/sanitize";

export default class SanitizePaste {
  quill: Quill;

  constructor(quill: Quill) {
    this.quill = quill;
    this.handlePaste = this.handlePaste.bind(this);
    this.quill.root.addEventListener("paste", this.handlePaste, false);
  }

  handlePaste(e: ClipboardEvent) {
    if (
      e.clipboardData &&
      e.clipboardData.items &&
      e.clipboardData.items.length
    ) {
      if (isRichText(e.clipboardData.items)) {
        e.preventDefault();
        const text = e.clipboardData.getData("text/html");
        const cleanedText = sanitize(text);
        const index = this.quill.getSelection(true).index;
        this.quill.clipboard.dangerouslyPasteHTML(index, cleanedText, "user");
        this.quill.setSelection(
          (index + cleanedText.length) as unknown as RangeStatic,
        );
      }
    }
  }
}
