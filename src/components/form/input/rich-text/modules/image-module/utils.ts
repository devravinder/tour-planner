export default {
  generateFilename(): string {
    return btoa(String(Math.random() * 1e6) + String(+new Date())).replace(
      "=",
      "",
    );
  },

  urlIsImage(url: string, abortTimeout = 3000): Promise<boolean> {
    if (!this.validURL(url)) {
      return Promise.reject(false);
    }
    if (/\.(jpeg|jpg|gif|png|webp|tiff|bmp)$/.test(url)) {
      return Promise.resolve(true);
    }
    return new Promise((resolve, reject) => {
      let timer: number | undefined = undefined;
      const img = new Image();
      img.onerror = img.onabort = () => {
        clearTimeout(timer);
        reject(false);
      };
      img.onload = () => {
        clearTimeout(timer);
        resolve(true);
      };
      timer = setTimeout(() => {
        img.src = "//!/an/invalid.jpg";
        reject(false);
      }, abortTimeout);
      img.src = url;
    });
  },

  validURL(str: string): boolean {
    try {
      return Boolean(new URL(str));
    } catch (e) {
      return false;
    }
  },
  isRichText(clipboardDataItems: DataTransferItemList): boolean {
    let isHtml = false;
    Array.prototype.forEach.call(clipboardDataItems, (item) => {
      if (item.type.match(/^text\/html$/i)) {
        isHtml = true;
      }
    });
    return isHtml;
  },
  /* resolve dataUrl to base64 string
   */
  resolveDataUrl(dataUrl: string | ArrayBuffer, type: string): string {
    let str = "";
    if (typeof dataUrl === "string") {
      str = dataUrl;
    } else if (dataUrl instanceof ArrayBuffer) {
      str = this.arrayBufferToBase64Url(dataUrl, type);
    }
    return str;
  },
  binaryStringToArrayBuffer(binary: string): ArrayBuffer {
    const len = binary.length;
    const buffer = new ArrayBuffer(len);
    const arr = new Uint8Array(buffer);
    let i = -1;
    while (++i < len) arr[i] = binary.charCodeAt(i);
    return buffer;
  },
  arrayBufferToBase64Url(arrayBuffer: ArrayBuffer, type: string): string {
    return (
      `data:${type};base64,` +
      btoa(
        new Uint8Array(arrayBuffer).reduce(
          (acc: string, byte: number) => acc + String.fromCharCode(byte),
          "",
        ),
      )
    );
  },
  /* copy text - make text store in the clipboard
   */
  copyText(content: string, target = document.body): boolean {
    const element = document.createElement("textarea");
    const previouslyFocusedElement = document.activeElement;
    element.value = content;
    // Prevent keyboard from showing on mobile
    element.setAttribute("readonly", "");
    element.style.position = "absolute";
    element.style.left = "-9999px";
    element.style.fontSize = "12pt"; // Prevent zooming on iOS
    const selection = document.getSelection();
    let originalRange: boolean | Range = false;
    if (selection && selection.rangeCount > 0) {
      originalRange = selection.getRangeAt(0);
    }
    target.append(element);
    element.select();
    // Explicit selection workaround for iOS
    element.selectionStart = 0;
    element.selectionEnd = content.length;
    let isSuccess = false;
    try {
      isSuccess = document.execCommand("copy");
    } catch {
      /* empty */
    }
    element.remove();
    if (selection && originalRange) {
      selection.removeAllRanges();
      selection.addRange(originalRange);
    }
    // Get the focus back on the previously focused element, if any
    if (previouslyFocusedElement) {
      (previouslyFocusedElement as HTMLElement).focus();
    }
    return isSuccess;
  },
  /* check the type of specify target
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isType(target: any, type: string): boolean {
    return Object.prototype.toString.call(target) === `[object ${type}]`;
  },
};
