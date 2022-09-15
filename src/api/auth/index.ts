import { LoginUser } from "immo-interface";
import { http } from "../http";

function loginUser(user: LoginUser) {
  return http.post("/auth/login", {
    ...user,
  });
}

export { loginUser };
