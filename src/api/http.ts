import { usesecurityStore } from "@/store/security";
import axios from "axios";
import router from "@/router";

const http = axios.create({
  baseURL: "http://localhost:8085",
  headers: {
    Authorization: "Bearer ",
  },
});
http.interceptors.request.use((config) => {
  const security = usesecurityStore();
  console.log({ config });
  if (config.headers != undefined) {
    config.headers.Authorization += security.token;
  }
  return config;
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (error) {
      const security = usesecurityStore();
      security.token = "";
      router.push("login");
    }

    return Promise.reject(error);
  }
);

export { http };
