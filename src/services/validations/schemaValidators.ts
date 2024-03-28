/* eslint @typescript-eslint/no-explicit-any:0 */
import { isArray, isString, isEmpty } from "./core";
import errorMessages from "./errorMessages";
const { OPTIONAL } = errorMessages;

const finalResult = (errors: any) => ({ isValid: isEmpty(errors), errors });

const isOptional = (rules: any) =>
  isArray(rules) ? rules.includes(OPTIONAL) : rules === OPTIONAL;

const validateRule = (value: any, rule: any) => {
  const message = rule(value);
  if (isString(message)) {
    return message;
  }
};

const validateRules = (
  key: string,
  value: any,
  rules: any,
  errors: any,
  eager: boolean,
) => {
  let message;
  if (isArray(rules)) {
    for (const rule of rules) {
      message = validateRule(value, rule);
      if (message) {
        // if one validation failed then stop
        break;
      }
    }
  } else {
    message = validateRule(value, rules);
  }
  if (message) {
    errors[key] = message;
    if (eager) {
      throw new Error();
    }
  }
};

/*
// eg:-
const data = { name: 'Ram', age: 21 }
const schema = { name: [minLength(4), maxLength(2)], age: greaterThan(27) }
const errors = validateData(data, schema, { eager: false })
console.log(' errors ', errors)
 */

export const validateObject = (
  data: any,
  validationSchema: any,
  options = { eager: true },
) => {
  const { eager } = options;
  const errors = {};
  try {
    for (const key of Object.keys(validationSchema)) {
      const rules = validationSchema[key];
      if (isEmpty(data[key]) && isOptional(rules)) {
        continue;
      }
      validateRules(key, data[key], rules, errors, eager);
    }
    //eslint-disable-next-line no-empty
  } catch (_) {}
  return finalResult(errors);
};

/*
const req = {
  body :{
    name:"ravinder",
    age: 25
  },
  query:{
    gender:"MALE"
  }
 }

 const schema = [

  { fieldName:"name", location:"body", rules:[minLength(4), maxLength(2)] },
  { fieldName:"age", location:"body", rules:greaterThan(27) },
  { fieldName:"gender", location:"query", rules:minLength(4) },
 ]

 const errors = validateData(req, schema, { eager: false })
 console.log(' errors ', errors)
 */

export const validateRequest = (
  req: any,
  validationSchema: any,
  options = { eager: true },
) => {
  const { eager } = options;
  const errors = {};
  try {
    for (const fieldValidation of validationSchema) {
      const { fieldName, location = "body", rules } = fieldValidation;
      if (isEmpty(req[location][fieldName]) && isOptional(rules)) {
        continue;
      }
      validateRules(fieldName, req[location][fieldName], rules, errors, eager);
    }
    // eslint-disable-next-line no-empty
  } catch (_) {}
  return finalResult(errors);
};
