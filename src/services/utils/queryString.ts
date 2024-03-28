/* eslint-disable @typescript-eslint/no-unused-vars */
export const isJsonString = ([firstChar, ..._]: string) =>
  firstChar === '"' || firstChar === "[" || firstChar === "{";

export const objectToUrlparams = (obj: object) => {
  const urlParams = new URLSearchParams();
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      urlParams.append(key, value);
    } else urlParams.append(key, JSON.stringify(value));
  }
  return urlParams;
};

export const urlParamsToQueryString = (urlParams: URLSearchParams) =>
  urlParams.toString();

export const queryStringToObject = (queryString: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const res: Record<string, any> = {};
  const urlParams = new URLSearchParams(queryString);
  // eslint-disable-next-line prefer-const
  for (let [key, value] of urlParams.entries()) {
    if (typeof value === "string" && isJsonString(value)) {
      value = JSON.parse(value);
    }
    if (res[key]) {
      if (Array.isArray(res[key])) {
        res[key].push(value);
      } else {
        res[key] = [res[key], value];
      }
    } else {
      res[key] = value;
    }
  }
  return res;
};

export const objectToQueryString = (obj: object) =>
  objectToUrlparams(obj).toString();

export default {
  objectToUrlparams,
  urlParamsToQueryString,
  queryStringToObject,
  objectToQueryString,
};

/*
const input = {
  name:"Ramu",
  skills: ['java','js'],
  email:{
    like:'amu'
  }
}
const url = objectToUrlparams(input)
url.append('skills','node')
console.log({url})
const qs = urlParamsToQueryString(url)
console.log({qs})
const output = queryStringToObject(qs)
console.log( {output})

 */
