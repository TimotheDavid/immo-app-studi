<template>
  <main class="dashboard">
    <NavBar />
    <div id="text">
      <h1 class="">Bienvenue sur votre plateforme de gestion de location</h1>
      <ol class="">
        <li>Commencer par crée un locataire et un apartment</li>
        <li>Ensuite affecter un Appartment à un locataire</li>
        <li>Puis enfin crée un payment</li>
        <li>
          Vous pourrez par la suite crée une quittance de loyer et un bilan de
          loyer
        </li>
      </ol>
    </div>
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

<style scoped>
li {
  margin-top: 2rem;
  color: indigo;
  font-size: 1rem;
}

#text {
  width: 80%;
  margin: auto;
}
</style>
