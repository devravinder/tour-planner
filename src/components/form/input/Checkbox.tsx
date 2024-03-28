import React, { InputHTMLAttributes } from "react";
import tw from "tailwind-styled-components";
type Props = InputHTMLAttributes<HTMLInputElement>;

const InputElement = tw.input`h-5 w-5 border border-gray-400 shadow-sm rounded text-primary-900 focus:ring-primary-900`;
const Checkbox = React.forwardRef<HTMLInputElement, Props>(
  ({ className = "", ...props }, ref) => {
    return (
      <InputElement
        ref={ref}
        {...props}
        type="checkbox"
        className={className}
      />
    );
  },
);

export default Checkbox;
