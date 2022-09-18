<template>
  <Toolbar class="mb-4">
    <template #start>
      <Button
        label="New"
        icon="pi pi-plus"
        class="p-button-success mr-2"
        @click="create"
      />
      <Button
        label="Delete"
        icon="pi pi-trash"
        class="p-button-danger"
        @click="deleteRow"
      />
    </template>
  </Toolbar>
</template>

<script lang="ts" setup>
import { defineEmits } from "vue";

const emit = defineEmits(["onClickCreated", "onclickDelete"]);

function create() {
  emit("onClickCreated");
}

function deleteRow() {
  emit("onclickDelete");
}
</script>
