import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercept responses to return the error data directly
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  },
);

export const get = <T>(url: string) =>
  apiClient.get<T>(url).then((res) => res.data);

export const post = <T>(url: string, payload?: unknown) =>
  apiClient.post<T>(url, payload).then((res) => res.data);

export const put = <T>(url: string, payload?: unknown) =>
  apiClient.put<T>(url, payload).then((res) => res.data);

export const patch = <T>(url: string, payload?: unknown) =>
  apiClient.patch<T>(url, payload).then((res) => res.data);

export default apiClient;
