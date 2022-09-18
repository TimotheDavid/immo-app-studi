<template>
  <main class="dashboard">
    <NavBar />
  </main>
</template>
<script lang="ts" setup>
import NavBar from "@/components/navbar/NavBar.vue";
import { usesecurityStore } from "@/store/security";
import { watch } from "vue";
import { storeToRefs } from "pinia";
import router from "@/router";

const security = usesecurityStore();

const { token } = storeToRefs(security);
watch(token, () => {
  if (token == undefined) {
    security.token = "";
    router.push("login");
  }
});
</script>
