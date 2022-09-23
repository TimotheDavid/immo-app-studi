<template>
  <div class="grid grid-nogutter surface-section text-800">
    <div
      class="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center"
    >
      <section>
        <span class="block text-6xl font-bold mb-1"
          >ERP test pour Infoco IMMO
        </span>
        <div class="text-6xl text-primary font-bold mb-3 custom-fonts">
          Timothé David
        </div>
        <p class="mt-0 mb-4 text-700 line-height-3">
          <a href="https://timothedavid.fr" class="custom-fonts"
            >timothe david</a
          >
        </p>

        <Button
          label="Learn More"
          type="button"
          class="mr-3 p-button-raised"
        ></Button>
        <Button
          label="Live Demo"
          type="button"
          class="p-button-outlined"
          @click="pushToLogin"
        ></Button>
      </section>
    </div>
    <div class="col-12 md:col-6 overflow-hidden">
      <img
        src="../assets/hero.jpg"
        alt="Image"
        class="md:ml-auto block h-screen w-fit"
        style="clip-path: polygon(8% 0, 100% 0%, 100% 100%, 0 100%)"
      />
    </div>
  </div>
</template>

<style scoped>
a {
  text-underline: none;
  color: #0b5ed7;
  font-family: "Fira Code", serif;
  font-size: 2em;
}
</style>

<script lang="ts" setup>
import router from "@/router";

function pushToLogin() {
  router.push("login");
}
</script>
