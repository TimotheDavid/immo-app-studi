<template>
  <Dialog
    :style="{ width: '450px' }"
    header="Product Details"
    :modal="true"
    class="p-fluid"
  >
    <template #footer>
      <Button label="Abandonner" icon="pi pi-times" class="p-button-text" />
      <Button label="Save" icon="pi pi-check" class="p-button-text" />
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
const createModal = ref(false);
</script>
