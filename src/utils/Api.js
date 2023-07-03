import axios from "axios";
import join from "url-join";
import { server, apiUrl } from "../constants/index";

const isAbsoluteURLRegex = /^(?:\w+:)\/\//;

axios.interceptors.request.use(async (config) => {
  if (!isAbsoluteURLRegex.test(config.url)) {
    const userToken = JSON.parse(localStorage.getItem(server.TOKEN_KEY));
    if (userToken) {
      config.headers.Authorization = "Bearer " + userToken;
    }
    config.url = join(apiUrl, config.url);
  }
  //config.headers.Accept = "*/*";
  //config.withCredentials = true;
  config.timeout = 600000; // 100 Second
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // console.log(JSON.stringify(error, undefined, 2))
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    } else if (!error.response) {
      return Promise.reject({
        code: "NOT_CONNECT_NETWORK",
        message: "Cannot connect to server, Please try again.",
      });
    }
    return Promise.reject(error);
  }
);

export const httpClient = axios;
