/* eslint @typescript-eslint/no-explicit-any:0 */
// we can make this as a independent library

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const searchParams = (url = "") => new URLSearchParams(url);

export const isRichText = (clipboardDataItems: DataTransferItemList) => {
  let isHtml = false;
  Array.prototype.forEach.call(clipboardDataItems, (item) => {
    if (item.type.match(/^text\/html$/i)) {
      isHtml = true;
    }
  });
  return isHtml;
};

export const binaryStringToArrayBuffer = (binary: string) => {
  const len = binary.length;
  const buffer = new ArrayBuffer(len);
  const arr = new Uint8Array(buffer);
  let i = -1;
  while (++i < len) arr[i] = binary.charCodeAt(i);
  return buffer;
};

export const arrayBufferToBase64Url = (
  arrayBuffer: ArrayBuffer,
  type: string,
) => {
  return (
    `data:${type};base64,` +
    btoa(
      new Uint8Array(arrayBuffer).reduce(
        (acc: string, byte: number) => acc + String.fromCharCode(byte),
        "",
      ),
    )
  );
};

/* check the type of specify target
 */
export const isType = (target: any, type: string) => {
  return Object.prototype.toString.call(target) === `[object ${type}]`;
};

export const neverValue = [][0];
