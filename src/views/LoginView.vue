<template>
  <main class="login">
    <div class="flex card-container blue-container h-screen">
      <div
        class="w-full bg-blue-800 flex align-items-center justify-content-center"
      >
        <div class="w-5 h-20rem flex justify-content-around flex-column">
          <span class="p-float-label m">
            <InputText id="name" type="text" v-model="name" />
            <label for="name">Nom</label>
          </span>

          <span class="p-float-label">
            <InputText id="email" type="email" v-model="email" />
            <label for="email">Mail</label>
          </span>

          <span class="p-float-label">
            <InputText id="password" type="password" v-model="password" />
            <label for="password">Mot de passe</label>
          </span>
          <div id="login">
            <Button label="Connection" @click="login" />
          </div>

          <div v-if="found">
            <Message severity="warn" :closable="true" :life="200"
              >User not found</Message
            >
          </div>
        </div>
      </div>
      <div class="w-full"></div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import Button from "primevue/button";
import Message from "primevue/message";

import { LoginUser } from "immo-interface";
import { ref } from "vue";
import { usesecurityStore } from "@/store/security";
import { useRouter } from "vue-router";
import axios from "axios";
const name = ref("");
const email = ref("");
const password = ref("");
const found = ref(false);
const router = useRouter();
const securityStore = usesecurityStore();

async function login() {
  const user: LoginUser = {
    email: email.value,
    password: password.value,
  };

  try {
    const response = await axios.post("http://localhost:8080/auth/login", user);
    console.log(response);
    if (response.data.token != undefined) {
      securityStore.token = response.data.token;
      router.push("dashboard");
    }
  } catch (error: Error) {
    console.log(error);
    found.value = true;
  }
}
</script>

<style scoped></style>
