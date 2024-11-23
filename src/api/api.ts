import axios from "axios";

export const baseURL = process.env.REACT_APP_API_URL;

export const publicApi = axios.create({
  baseURL,
});


publicApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(error);
  },
);
