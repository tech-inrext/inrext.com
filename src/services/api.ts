import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
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