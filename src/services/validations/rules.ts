/* eslint @typescript-eslint/no-explicit-any:0 */
import { isEmpty, isNumber, isBoolean } from "./core";
import { isDate, isPast, isFuture, isBetween } from "../utils/dateUtility";

import errorMessages from "./errorMessages";
const {
  REQUIRED,
  NUMBER,
  BOOLEAN,
  REGEX,
  BETEEN_NUMBER,
  MIN_LENGTH,
  MAX_LENGTH,
  DATE,
  FUTURE_DATE,
  PAST_DATE,
  BETWEEN_DATE,
  GREATER_THAN,
  LESS_THAN,
  ONE_OF_THE_VALES,
  EMAIL,
  OPTIONAL,
} = errorMessages;

// const emailRegex = /\S+@\S+\.\S+/
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const optional = () => OPTIONAL;
export const required = (message: string) => (val: any) =>
  !isEmpty(val) || message || REQUIRED;
export const mandatory = required;
export const number = (message: string) => (val: any) =>
  isNumber(val) || message || NUMBER;
export const date = (message: string) => (val: any) =>
  isDate(val) || message || DATE;
export const boolean = (message: string) => (val: any) =>
  isBoolean(val) || message || BOOLEAN;
export const regex = (pattern: RegExp, message: string) => (val: any) =>
  pattern.test(val) || message || `${REGEX} ${pattern}`; // need to test this
export const email = (message = EMAIL) => regex(emailRegex, message);
export const betweenNumbers =
  (from: number | string, to: number | string, message: string) =>
  (val: any) => {
    if (isEmpty(val)) {
      return REQUIRED;
    }
    if (!isNumber(val)) {
      return NUMBER;
    }

    from = parseFloat(from + "");
    to = parseFloat(to + "");
    val = parseFloat(val);

    return (
      (from <= val && val <= to) || message || `${BETEEN_NUMBER} ${from}, ${to}`
    );
  };
export const greaterThan =
  (num: string | number, message: string) => (val: any) => {
    if (isEmpty(val)) {
      return REQUIRED;
    }
    if (!isNumber(val)) {
      return NUMBER;
    }
    num = parseFloat(num + "");
    return val > num || message || `${GREATER_THAN} ${num}`;
  };
export const lessThan =
  (num: string | number, message: string) => (val: any) => {
    if (isEmpty(val)) {
      return REQUIRED;
    }
    if (!isNumber(val)) {
      return NUMBER;
    }
    num = parseFloat(num + "");
    return val < num || message || `${LESS_THAN} ${num}`;
  };
export const minLength = (min: number, message: string) => (val: any) =>
  (val && val.length >= min) || message || `${MIN_LENGTH} ${min}`;
export const maxLength = (max: number, message: string) => (val: any) =>
  (val && val.length <= max) || message || `${MAX_LENGTH} ${max}`;
export const pastDate = (message: string) => (val: any) =>
  isPast(val) || message || PAST_DATE;
export const futureDate = (message: string) => (val: any) =>
  isFuture(val) || message || FUTURE_DATE;
export const betweenDates =
  (from: any, to: any, message: string) => (val: any) => {
    if (isEmpty(val)) {
      return REQUIRED;
    }
    if (!isDate(val)) return DATE;
    return isBetween(val, from, to) || message || BETWEEN_DATE;
  };

export const oneOfTheValues =
  (arrayOfData: any[] = [], message: string) =>
  (val: any) =>
    arrayOfData.includes(val) ||
    message ||
    `${ONE_OF_THE_VALES}: ${arrayOfData.join(",")}`;
