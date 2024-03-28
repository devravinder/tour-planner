import tw from "tailwind-styled-components";

const Warning = tw.span`px-2 py-1 font-semibold text-orange-900 bg-orange-100 rounded-md text-xs`;
const Danger = tw.span`px-2 py-1 font-semibold text-red-900 bg-red-100 rounded-md text-xs`;
const Info = tw.span`px-2 py-1 font-semibold text-blue-900 bg-blue-100 rounded-md text-xs`;
const Success = tw.span`px-2 py-1 font-semibold text-green-900 bg-green-100 rounded-md text-xs`;
const Disabled = tw.span`px-2 py-1 font-semibold text-gray-900 bg-gray-100 rounded-md text-xs`;

export const Chip = { Warning, Danger, Info, Success, Disabled };
