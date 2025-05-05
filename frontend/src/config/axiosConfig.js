import axios from "axios";

export const BASE_URL = "https://connectify-4cpk.onrender.com";

const clientServer = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

clientServer.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default clientServer;