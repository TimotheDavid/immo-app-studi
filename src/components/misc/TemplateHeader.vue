<template>
  <Toolbar class="mb-4">
    {{ selected }}
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
        class="p-button-danger mr-2"
        @click="deleteRow"
        :disabled="!selected"
      />
    </template>
  </Toolbar>
</template>

<script lang="ts" setup>
import { defineEmits, toRefs, defineProps } from "vue";

const emit = defineEmits(["onClickCreated", "onclickDelete"]);
const props = defineProps(["quittance", "selected"]);
const { quittance, selected } = toRefs(props);
function create() {
  emit("onClickCreated");
}

function deleteRow() {
  emit("onclickDelete");
}
</script>
