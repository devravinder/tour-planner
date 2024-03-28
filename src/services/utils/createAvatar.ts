export const imagePlaceholder = (id = 1) =>
  `https://picsum.photos/200/300?random=${id}`;
// ----------------------------------------------------------------------

const PRIMARY_NAME = ["A", "N", "H", "L", "Q", "9", "8"];
const INFO_NAME = ["F", "G", "T", "I", "J", "1", "2", "3"];
const SUCCESS_NAME = ["K", "D", "Y", "B", "O", "4", "5"];
const WARNING_NAME = ["P", "E", "R", "S", "C", "U", "6", "7"];
const ERROR_NAME = ["V", "W", "X", "M", "Z"];

function getFirstCharacter(name: string) {
  return "" + (name && name.charAt(0)).toLocaleUpperCase();
}

function getAvatarColor(firstChar: string) {
  if (PRIMARY_NAME.includes(firstChar)) return "primary";
  if (INFO_NAME.includes(firstChar)) return "info";
  if (SUCCESS_NAME.includes(firstChar)) return "success";
  if (WARNING_NAME.includes(firstChar)) return "warning";
  if (ERROR_NAME.includes(firstChar)) return "error";
  return "default";
}

export default function createAvatar(name: string) {
  const firstChar = getFirstCharacter(name);
  return {
    name: firstChar,
    color: getAvatarColor(firstChar),
  } as const;
}
