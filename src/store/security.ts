import { defineStore } from "pinia";

export const usesecurityStore = defineStore("security", {
  state: () => ({
    token: "",
  }),
});
