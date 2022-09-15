import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8080",
});

function setHeader(token: string) {
  return {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
}

export { http, setHeader };
