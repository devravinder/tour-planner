/* eslint-disable react-refresh/only-export-components */
import tw from "tailwind-styled-components";
const Base = tw.button` rounded-md inline-flex items-center px-10 py-2 border-2  text-base font-semibold shadow-sm duration-300`;

const Fill = tw(
  Base,
)`text-white border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-700 hover:bg-blue-900 focus:ring-blue-500`;

export const Button = {
  Primary: tw(Fill)`bg-primary hover:bg-primary-dark focus:ring-primary-500`,
  Secondary: tw(
    Fill,
  )` bg-secondary hover:bg-secondary-dark focus:ring-secondary-500`,
  Danger: tw(Fill)` bg-danger hover:bg-danger-600 focus:ring-danger-500`,
  Disabled: tw(
    Fill,
  )` bg-disabled hover:bg-disabled-600 focus:ring-disabled-500`,
};

export const Outline = {
  Primary: tw(
    Base,
  )`border-primary text-primary hover:bg-primary hover:text-white`,
  Secondary: tw(
    Base,
  )`border-secondary text-secondary hover:bg-secondary hover:text-white`,
  Danger: tw(Base)`border-danger text-danger hover:bg-danger hover:text-white`,
  Disabled: tw(
    Base,
  )`border-disabled text-disabled hover:bg-disabled hover:text-white`,
};

export default Button;
