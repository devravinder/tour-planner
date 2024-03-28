import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.core.css";
import "react-quill/dist/quill.bubble.css";
import SanitizePaste from "./modules/SanitizePaste";
import ImageDropAndPaste from "./modules/image-module/ImageDropAndPaste";
import "./RichTextEditor.scss";
import { useRef } from "react";
import { useInsertSmiley, insertStar } from "./Handlers";
import { ImageActions } from "@xeger/quill-image-actions";
import { ImageFormats } from "@xeger/quill-image-formats";
import RichText from "components/RichText";

type RichTextEditorProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
};
const formats = [
  "align",
  "alt",
  "background",
  "blockquote",
  "bold",
  "bullet",
  "clean",
  "code-block",
  "color",
  "float",
  "font",
  "header",
  "height",
  "image",
  "indent",
  "italic",
  "link",
  "list",
  "script",
  "size",
  "strike",
  "style",
  "underline",
  "video",
  "width",
];

// implement css classes for this
const sizes = [
  "8px",
  "9px",
  "10px",
  "11px",
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "72px",
];

const Image = Quill.import("formats/image");
Image.className = "m-2"; // setting some default classes
Quill.register(Image, true);
Quill.register("modules/sanitizePaste", SanitizePaste);
Quill.register("modules/imageDropAndPaste", ImageDropAndPaste);
Quill.register("modules/imageActions", ImageActions, true);
Quill.register("modules/imageFormats", ImageFormats, true);

//====
const alignClass = Quill.import("attributors/class/align");
const backgroundClass = Quill.import("attributors/class/background");
const colorClass = Quill.import("attributors/class/color");
const directionClass = Quill.import("attributors/class/direction");
const fontClass = Quill.import("attributors/class/font");
//const sizeClass = Quill.import('attributors/style/size');
const sizeClass = Quill.import("attributors/class/size");
sizeClass.whitelist = sizes;

Quill.register(alignClass, true);
Quill.register(backgroundClass, true);
Quill.register(colorClass, true);
Quill.register(directionClass, true);
Quill.register(fontClass, true);
Quill.register(sizeClass, true);

Quill.debug("error");

export default function RichTextEditor({
  value,
  onChange,
  placeholder,
  className = "",
}: RichTextEditorProps) {
  const ref = useRef<ReactQuill>(null);
  const { handler: smiley } = useInsertSmiley(ref);

  return (
    <div
      className={`custom-react-quill-container w-full bg-white border border-gray-200 rounded-md text-md text-left font-medium text-gray-800 group focus-within:border-primary-500 focus-within:outline outline-1 focus-within:outline-primary-500 ${className}`}
      data-cy={"rte"}
    >
      <ReactQuill
        ref={ref}
        theme="snow"
        className="min-h-[100px]"
        placeholder={placeholder}
        modules={{
          toolbar: {
            container: "#rte-toolbar",
            handlers: {
              smiley,
              insertStar,
            },
          },

          imageDropAndPaste: {},
          sanitizePaste: {},
          imageActions: {},
          imageFormats: {},
        }}
        formats={formats}
        value={value}
        onChange={(v) => onChange?.(v)}
      />
      <Toolbar />
    </div>
  );
}

// icons from https://iconduck.com/search?query=vectorSetIds%3A122
const Toolbar = () => (
  <div
    id="rte-toolbar"
    data-cy={"rte-toolbar"}
    className="transition-opacity group-focus-within:opacity-100 opacity-20 h-30 flex flex-row flex-wrap items-center space-x-2"
  >
    <div>
      <select className="ql-size">
        <option value={"8px"}>8px</option>
        <option value={"10px"}>10px</option>
        <option value={"11px"}>11px</option>
        <option value={"12px"}>12px</option>
        <option value={"13px"}>13px</option>
        <option value={"14px"}>14px</option>
        <option value={"15px"}>15px</option>
        <option value={"16px"}>16px</option>
        <option value={"17px"}>17px</option>
        <option value={"18px"}>18px</option>
        <option value={"19px"}>19px</option>
        <option value={"20px"}>20px</option>
        <option value={"25px"}>25px</option>
        <option value={"32px"}>32px</option>
        <option value={"40px"}>40px</option>
        <option value={"50px"}>50px</option>
        <option value={"75px"}>75px</option>
        <option value={"100px"}>100px</option>
      </select>
      <select className="ql-font"></select>
      <select className="ql-header">
        <option value={0}>Normal</option>
        <option value={1}>H1</option>
        <option value={2}>H2</option>
        <option value={3}>H3</option>
        <option value={4}>H4</option>
        <option value={5}>H5</option>
        <option value={6}>H6</option>
      </select>
    </div>

    <div>
      <button className="ql-bold !h-6">
        <svg
          viewBox="0 0 18 18"
          className="bi bi-type-bold"
          fill="currentColor"
        >
          <path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13H8.21zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z" />
        </svg>
      </button>
      <button className="ql-italic !h-6">
        <svg
          viewBox="0 0 18 18"
          className="bi bi-type-italic"
          fill="currentColor"
        >
          <path d="M7.991 11.674L9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z" />
        </svg>
      </button>
      <button className="ql-underline !h-6">
        <svg
          viewBox="0 0 18 18"
          className="bi bi-type-underline"
          fill="currentColor"
        >
          <path d="M5.313 3.136h-1.23V9.54c0 2.105 1.47 3.623 3.917 3.623s3.917-1.518 3.917-3.623V3.136h-1.23v6.323c0 1.49-.978 2.57-2.687 2.57-1.709 0-2.687-1.08-2.687-2.57V3.136z" />
          <path fillRule="evenodd" d="M12.5 15h-9v-1h9v1z" />
        </svg>
      </button>
      <button className="ql-strike">
        <svg
          viewBox="0 0 18 18"
          className="bi bi-type-strikethrough"
          fill="currentColor"
        >
          <path d="M8.527 13.164c-2.153 0-3.589-1.107-3.705-2.81h1.23c.144 1.06 1.129 1.703 2.544 1.703 1.34 0 2.31-.705 2.31-1.675 0-.827-.547-1.374-1.914-1.675L8.046 8.5h3.45c.468.437.675.994.675 1.697 0 1.826-1.436 2.967-3.644 2.967zM6.602 6.5H5.167a2.776 2.776 0 0 1-.099-.76c0-1.627 1.436-2.768 3.48-2.768 1.969 0 3.39 1.175 3.445 2.85h-1.23c-.11-1.08-.964-1.743-2.25-1.743-1.23 0-2.18.602-2.18 1.607 0 .31.083.581.27.814z" />
          <path fillRule="evenodd" d="M15 8.5H1v-1h14v1z" />
        </svg>
      </button>
      <button className="ql-blockquote"></button>
      <button className="ql-code-block"></button>
      <button className="ql-script" value={"sub"}></button>
      <button className="ql-script" value={"super"}></button>
    </div>

    <div>
      <select className="ql-align"></select>
      <button className="ql-indent" value={"+1"}></button>
      <button className="ql-indent" value={"-1"}></button>
      <button className="ql-list" value="ordered">
        <svg viewBox="0 0 18 18" className="bi bi-list-ol" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"
          />
          <path d="M1.713 11.865v-.474H2c.217 0 .363-.137.363-.317 0-.185-.158-.31-.361-.31-.223 0-.367.152-.373.31h-.59c.016-.467.373-.787.986-.787.588-.002.954.291.957.703a.595.595 0 0 1-.492.594v.033a.615.615 0 0 1 .569.631c.003.533-.502.8-1.051.8-.656 0-1-.37-1.008-.794h.582c.008.178.186.306.422.309.254 0 .424-.145.422-.35-.002-.195-.155-.348-.414-.348h-.3zm-.004-4.699h-.604v-.035c0-.408.295-.844.958-.844.583 0 .96.326.96.756 0 .389-.257.617-.476.848l-.537.572v.03h1.054V9H1.143v-.395l.957-.99c.138-.142.293-.304.293-.508 0-.18-.147-.32-.342-.32a.33.33 0 0 0-.342.338v.041zM2.564 5h-.635V2.924h-.031l-.598.42v-.567l.629-.443h.635V5z" />
        </svg>
      </button>
      <button className="ql-list" value="bullet">
        <svg viewBox="0 0 18 18" className="bi bi-list-ul" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
          />
        </svg>
      </button>
    </div>
    <div>
      <button className="ql-link"></button>
      <button className="ql-image"></button>
      <button className="ql-video"></button>
    </div>
    <div>
      <select className="ql-color">
        <option value={"white"}></option>

        <option value={"black"}></option>
        <option value={"red"}></option>
        <option value={"orange"}></option>
        <option value={"yellow"}></option>
        <option value={"green"}></option>
        <option value={"blue"}></option>
        <option value={"purple"}></option>
      </select>
      <select className="ql-background">
        <option value={"black"}></option>
        <option value={"red"}></option>
        <option value={"orange"}></option>
        <option value={"yellow"}></option>
        <option value={"green"}></option>
        <option value={"blue"}></option>
        <option value={"purple"}></option>
        <option value={"#0FDDAF"}></option>
      </select>

      <button className="ql-insertStar">★</button>
      <button className="ql-smiley">😃</button>
      <button className="ql-clean"></button>
    </div>
  </div>
);

type RichTextPreviewProps = {
  htmlString?: string;
};
export function RichTextPreview({ htmlString }: RichTextPreviewProps) {
  return (
    <div className="quill">
      <div className="ql-container ql-snow !border-none">
        <RichText
          element="div"
          htmlString={htmlString}
          className="ql-editor"
        ></RichText>
      </div>
    </div>
  );
}
