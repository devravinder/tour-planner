import sanitizeHtml, { IOptions } from "sanitize-html";

const makeItBoldAndSized = (fontSize: string) => ({
  tagName: "b",
  attribs: {
    style: `font-size: ${fontSize};`,
  },
});
const sanitizationSetup: IOptions = {
  allowedTags: [
    "b",
    "i",
    "em",
    "strong",
    "u",
    "a",
    "img",
    "div",
    "br",
    "li",
    "ol",
    "p",
    "span",
    "strong",
    "sub",
    "sup",
    "u",
    "ul",
    "h4",
  ],
  allowedAttributes: {
    a: ["href"],
    img: ["src"],
    b: ["style"],
    p: ["style"],
    span: ["style"],
  },
  allowedSchemesByTag: {
    a: ["http", "https"],
    img: ["data"],
  },
  transformTags: {
    h1: () => makeItBoldAndSized("larger"),
    h2: () => makeItBoldAndSized("x-large"),
    h3: () => makeItBoldAndSized("large"),
  },
};

export const sanitize = (text: string) => sanitizeHtml(text, sanitizationSetup);
export const cleanupTags = (text: string) =>
  sanitizeHtml(text, { allowedTags: [], allowedAttributes: {} });
