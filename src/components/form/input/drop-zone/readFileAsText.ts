const INPUT_ENCODING = "ISO-8859-1";
export default function readFileAsText({
  file,
  encoding = INPUT_ENCODING,
}: {
  file: File;
  encoding?: string;
}) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsText(file, encoding);
  });
}
