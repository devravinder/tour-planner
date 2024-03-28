type Resolve = (files: FileList) => void;
type Reject = (event: Event) => void;

export default function openFile(
  options: { multiple?: boolean; accept?: string } = {},
) {
  return new Promise((resolve: Resolve, reject: Reject) => {
    const input = document.createElement("input");

    if (options.multiple) input.setAttribute("multiple", "");

    if (options.accept) input.setAttribute("accept", options.accept);

    input.setAttribute("type", "file");
    input.style.display = "none";

    input.addEventListener("change", (ev) => {
      if (input.files?.length) {
        resolve(input.files);
      } else {
        reject(ev);
      }
      input.remove();
    });

    document.body.appendChild(input);
    const event = new MouseEvent("click");
    input.dispatchEvent(event);
  });
}
