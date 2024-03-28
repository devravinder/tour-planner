import React, { InputHTMLAttributes } from "react";
import tw from "tailwind-styled-components";
type Props = InputHTMLAttributes<HTMLInputElement>;

const InputElement = tw.input`w-full bg-white border rounded-md p-3 text-md text-left text-gray-800 border-gray-200 focus:border-primary-500 focus:ring-primary-500`;
const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ className = "", ...props }, ref) => {
    return <InputElement ref={ref} {...props} className={className} />;
  },
);

export default Input;
