/* eslint @typescript-eslint/no-explicit-any:0 */
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
export type { AxiosInstance } from "axios";

const TOKEN_KEY = "Authorization";
const TOKEN_PREFIX = "Bearer ";
const BASE_URL = "http://localhost:3004";
const defaultHeaders = {
  "Content-Type": "application/json" /* 'Bypass-Tunnel-Reminder':true */,
};

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: defaultHeaders,
});

const requestInterceptor = async <T>(config: InternalAxiosRequestConfig<T>) => {
  return config;
};

const responseInterceptor = <T>(response: AxiosResponse<T, any>) => response; // response.data;

const responseErrorHandler = (error: any) => {
  if (!error.response) {
    console.log("unable to connect "); // show notification
    throw error;
  }

  if (error.response.status == 0) {
    console.log(" server not reachable");
    throw error;
  }

  if (error.response.status == 400) {
    console.log("bad request");
    throw error;
  }

  if (error.response.status == 401) {
    console.log("unauthorized request");
    throw error;
  }

  if (error.response.status >= 500) {
    console.log("server issue");
    throw error;
  }

  return Promise.reject(error);
};

axiosInstance.interceptors.response.use(
  responseInterceptor,
  responseErrorHandler,
);
axiosInstance.interceptors.request.use(
  requestInterceptor,
  responseErrorHandler,
);
const setToken = (jwt: string, prefix = TOKEN_PREFIX) =>
  (axiosInstance.defaults.headers.common[TOKEN_KEY] = `${prefix} ${jwt}`);

const getToken = () => axiosInstance.defaults.headers.common[TOKEN_KEY];
const deleteToken = () =>
  delete axiosInstance.defaults.headers.common[TOKEN_KEY];

export const toFormData = (
  obj: Record<string, any>,
  headers?: Record<string, string>,
) => {
  const options = {
    headers: {
      ...defaultHeaders,
      "Content-Type": "multipart/form-data",
      Authorization: axiosInstance.defaults.headers.common[TOKEN_KEY],
      ...headers,
    },
  };
  const formData = new FormData();
  for (const key in obj) formData.append(key, obj[key]);

  return { formData, options };
};
const api = {
  get: axiosInstance.get,
  post: axiosInstance.post,
  put: axiosInstance.put,
  delete: axiosInstance.delete,
  setToken,
  getToken,
  deleteToken,
  toFormData,
};

export type Api = typeof api;

export default api;
