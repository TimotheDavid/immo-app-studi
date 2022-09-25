<template>
  <main class="flex justify-content-center mt-8">
    <div class="flex-column justify-content-around w-25rem">
      <h1 class="text-center text-indigo-500">404 Not found</h1>
      <p class="text-center">You will be redirected to login page</p>
    </div>
  </main>
</template>

<script setup>
import { usesecurityStore } from "@/store/security";
import router from "@/router";
import { onMounted } from "vue";

const security = usesecurityStore();

function redirect() {
  security.token = "";
  router.push("login");
}

onMounted(() => {
  setInterval(() => redirect(), 5000);
});
</script>
