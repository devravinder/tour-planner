import dayJs from "dayjs";
import between from "dayjs/plugin/isBetween";
import relativeTime from "dayjs/plugin/relativeTime";
dayJs.extend(relativeTime);
dayJs.extend(between);

export const isDate = (value: string) => value && dayJs(value).isValid();
export const toFormat = (date: Date | number | string, format = "YYYY-MM-DD") =>
  dayJs(date).format(format);
export const fromFormat = (
  date: string,
  format = ["YYYY-MM-DD hh:mm:ss", "YYYY-MM-DD"],
) => dayJs(date, format);
export const now = () => toFormat(new Date());
export const onlyDatePart = (date = new Date(), format = "YYYY-MM-DD") =>
  toFormat(date, format);
export const isBefore = (date: Date | string, compareDate: Date | string) =>
  dayJs(date).isBefore(compareDate);
export const isAfter = (date: Date | string, compareDate: Date | string) =>
  dayJs(date).isAfter(compareDate);
export const isBetween = (
  date: Date | string,
  fromDate: Date | string,
  toDate: Date | string,
) => dayJs(date).isBetween(fromDate, toDate);
export const isPast = (date: Date | string) => isBefore(date, new Date());
export const isFuture = (date: Date | string) => isAfter(date, new Date());

export default dayJs;
