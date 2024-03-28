import DateRangePicker, {
  DateRangePickerProps,
} from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import Icons from "components/icons";
import "react-calendar/dist/Calendar.css";

type DateRangeFieldProps = Omit<DateRangePickerProps, "value"> & {
  id?: string;
  value?: Date[];
  onChange: (values: null | Date[]) => void;
  placeholder?: string;
};

export default function DateRangeField({
  id,
  value,
  onChange,
  placeholder = "All dates",
  format = "dd/MM/y",
  ...rest
}: DateRangeFieldProps) {
  return (
    <div
      className={`relative date-range-custom  ${
        !value ? "date-range-placeholder" : ""
      }`}
      data-date-range-placeholder={placeholder}
    >
      <DateRangePicker
        className={
          "relative w-full bg-white border rounded-md px-3 py-[0.6rem] text-md text-left text-gray-800 border-gray-200 cursor-pointer group-focus-within:border-primary-50 group-focus-within:outline outline-2 group-focus-within:outline-primary-500 focus-visible:outline-primary-500 "
        }
        onChange={(v) => onChange?.(v as unknown as Date[])}
        value={value as unknown as Date}
        format={format}
        data-testid={id}
        calendarIcon={<Icons.Calendar className="h-5 text-gray-400" />}
        clearIcon={<Icons.Close className="h-5 text-gray-400" />}
        {...rest}
      />
    </div>
  );
}
export {};
