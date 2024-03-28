import React, {
  ChangeEvent,
  FocusEvent,
  InputHTMLAttributes,
  useMemo,
} from "react";
import { toFormat } from "services/utils/dateUtility";
import tw from "tailwind-styled-components";

type NativeDateProps = InputHTMLAttributes<HTMLInputElement> & {
  type: "date" | "datetime-local";
};

export const NativeDateInput = React.forwardRef<
  HTMLInputElement,
  NativeDateProps
>(({ className, type = "date", ...props }, ref) => {
  return <NativeDate ref={ref} type={type} className={className} {...props} />;
});

type DateProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "defaultValue" | "onChange" | "onBlur"
> & {
  type: "date" | "datetime-local";
  value?: Date;
  defaultValue?: Date;
  displayFormat?: string;
  onChange?: (value?: Date) => void;
  onBlur?: (value?: Date) => void;
};

const DATE_FORMAT = "YYYY-MM-DD";
const DATETIME_FORMAT = "YYYY-MM-DDTHH:mm:ss";
export const DateInput = ({
  className = "",
  type = "date",
  displayFormat,
  value,
  defaultValue,
  placeholder,
  onChange,
  ...props
}: DateProps) => {
  const format = useMemo(
    () => (type === "date" ? DATE_FORMAT : DATETIME_FORMAT),
    [type],
  );

  const onInput = (
    e: ChangeEvent<HTMLInputElement> | FocusEvent<HTMLInputElement, Element>,
    type: "date" | "datetime-local",
  ) => {
    if (onChange) {
      if (e.currentTarget.value) {
        const date = e.currentTarget.valueAsDate as Date;
        if (type === "date") date.setHours(0, 0, 0); // remove hours part
        onChange(date);
      }
      onChange(e.target.valueAsDate as unknown as undefined);
    }
  };

  return (
    <DateContainer className={className}>
      <CustomDateInput
        type={type}
        {...props}
        value={value ? toFormat(value, format) : ""}
        defaultValue={
          defaultValue ? toFormat(defaultValue, format) : defaultValue
        }
        onChange={(e) => onInput(e, type)}
        onBlur={(e) => onInput(e, type)}
      />
      <DateValue>
        {value ? (
          toFormat(value, displayFormat || format)
        ) : (
          <PlaceHolder>{placeholder || displayFormat || format}</PlaceHolder>
        )}
      </DateValue>
    </DateContainer>
  );
};

const NativeDate = tw.input`w-full bg-white border rounded-md p-3 text-md text-left text-gray-800 border-gray-200 focus:border-primary-500 focus:ring-primary-500`;

const DateContainer = tw.div`relative`;
const CustomDateInput = tw.input`w-full -indent-[999999999px] bg-white border rounded-md p-3 text-md text-left text-gray-800 border-gray-200 focus:border-primary-500 focus:ring-primary-500`;
const DateValue = tw.span`absolute top-1 left-1 px-3 py-2`;
const PlaceHolder = tw.span`text-gray-400`;

export default DateInput;
