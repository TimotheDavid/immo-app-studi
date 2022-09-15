<template>
  <MegaMenu :model="items" orientation="horizontal" />
</template>

<script lang="ts">
import configNavbar from "./configNavbar";
import { ref } from "vue";

export default {
  name: "NavBar",
  setup() {
    const items = ref(configNavbar);
    return { items };
  },
};
</script>
