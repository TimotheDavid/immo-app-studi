import { usesecurityStore } from "@/store/security";
import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8085",
  headers: {
    Authorization: "Bearer ",
  },
});

http.interceptors.request.use((config) => {
  const security = usesecurityStore();
  if (config.headers != undefined) {
    config.headers.Authorization += security.getToken();
  }
  return config;
});

export { http };
