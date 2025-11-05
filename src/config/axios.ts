import axios from "axios";
import { auth } from "../firebase/firebase";

const jsonplaceholderInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  timeout: 1000,
  headers: {
    Authorization: localStorage.getItem("token"),
  },
});

const firebaseAxios = axios.create({
  baseURL: "http://localhost:3001/api",
});

firebaseAxios.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token")?.replaceAll('""', "");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const user = auth.currentUser;

    if (user) {
      const newToken = await user.getIdToken();
      localStorage.setItem("token", newToken);
      config.headers.Authorization = `Bearer ${newToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

firebaseAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const user = auth.currentUser;
        if (user) {
          const newToken = await user.getIdToken(true);
          localStorage.setItem("token", newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return firebaseAxios(originalRequest);
        }
      } catch (error) {
        console.error(error);
      }
    }

    return Promise.reject(error);
  }
);

export { jsonplaceholderInstance, firebaseAxios };
