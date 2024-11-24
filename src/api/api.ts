import axios from "axios";

export const baseURL = process.env.REACT_APP_API_URL;
export const baseURL2= process.env.REACT_APP_API_URL_2;

export const publicApi = axios.create({
    baseURL,
});

export const publicApi2 = axios.create({
    baseURL: baseURL2,
});



publicApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(error);
  },
);
