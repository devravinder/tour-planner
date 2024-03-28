/* eslint @typescript-eslint/no-explicit-any:0 */
// we can use lodash
export const isEmpty = (value: any) =>
  value === undefined ||
  value === null ||
  value === "" ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

export const isNullOrUndefined = (value: any) =>
  value === undefined || value === null; // isNullOrUndefined = isEmpty

export const isNumber = (value: any) => !isNaN(parseFloat(value));
export const isBoolean = (value: any) =>
  typeof value === "boolean" ||
  (value && (value === "true" || value === "false"));
export const isArray = (value: any) => Array.isArray(value);
export const isString = (value: any) => typeof value === "string";
export const isObject = (value: any) => typeof value === "object";
export const isRegexPattern = (pattern: RegExp, value: string) =>
  pattern.test(value); // new RegExp(pattern).test(value)
