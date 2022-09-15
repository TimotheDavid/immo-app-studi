import { defineStore } from "pinia";

export const usesecurityStore = defineStore("security", {
  state: () => {
    return {
      token: "",
    };
  },
});
