import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api`
    : "http://192.168.1.34:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("studentswap_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    /*
     * Pour un upload FormData, il ne faut surtout pas
     * forcer Content-Type à application/json.
     *
     * Le navigateur/Axios va automatiquement ajouter :
     * multipart/form-data; boundary=...
     */
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
      delete config.headers["content-type"];
    }

    return config;
  },
  (error) => Promise.reject(error),
);

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("studentswap_token");
      localStorage.removeItem("studentswap_user");
      localStorage.removeItem("studentswap_auth");
    }

    return Promise.reject(error);
  },
);

export default client;