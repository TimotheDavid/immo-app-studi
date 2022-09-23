import { defineStore } from "pinia";

export const usesecurityStore = defineStore("security", {
  state: () => ({
    token: "",
  }),
  getters: {
    setToCookies(state) {
      const token = sessionStorage.getItem("token");
      if (token == null || !token) {
        sessionStorage.setItem("token", state.token);
      }
    },
  },
  actions: {
    getToken(): string {
      const token = sessionStorage.getItem("token");

      if (token != null) {
        return token;
      }

      return "";
    },
  },
});
