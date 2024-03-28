import { InputHTMLAttributes, useEffect, useState } from "react";
import Input from "./Input";

type DebounceInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
};

export default function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  className = "",
  ...props
}: DebounceInputProps) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={className}
    />
  );
}
