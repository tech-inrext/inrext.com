import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

console.log("API BASE URL:", BASE_URL);

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Debug request
api.interceptors.request.use((config) => {
  console.log("API Request:", config.url);
  return config;
});

// Debug response
api.interceptors.response.use((response) => {
  console.log("API Response:", response.data);
  return response;
});

export default api;