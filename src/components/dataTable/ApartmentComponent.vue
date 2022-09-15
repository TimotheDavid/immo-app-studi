<template>
  <div>
    <DataTable
      :value="apartments"
      :paginator="true"
      :rows="10"
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      :rowsPerPageOptions="[10, 20, 50]"
      responsiveLayout="scroll"
      currentPageReportTemplate=" {first} sur {last} sur un total de  {totalRecords}"
      editMode="row"
      dataKey="id"
      v-model:editingRows="editingRows"
      @row-edit-save="onRowEditSave"
      selectionMode="multiple"
      :metaKeySelection="true"
      v-model:selection="selectedApartment"
      @rowSelect="onRowSelect"
    >
      <Column selectionMode="single" headerStyle="width: 3em"></Column>
      <Column
        v-for="col of config"
        :field="col.field"
        :header="col.header"
        :key="config.indexOf(col)"
        :hidden="col.hidden"
        :sortable="col.sortable"
        style="25%"
      >
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" autofocus />
        </template>
      </Column>
      <Column
        :rowEditor="true"
        style="width: 10%; min-width: 8rem"
        bodyStyle="text-align:center"
      ></Column>
    </DataTable>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { ApartmentResponse, UpdateApartment } from "immo-interface";
import { getAllApartment } from "@/api";
import { usesecurityStore } from "@/store/security";
import config from "./apartmentConfig";
import { updateApartment } from "@/api";
import { DataTableRowEditCancelEvent } from "primevue/datatable";

const security = usesecurityStore();

let apartments = ref<ApartmentResponse[]>([]);
const selectedApartment = ref<ApartmentResponse>();
const editingRows = ref<ApartmentResponse>();
const errors = ref(false);
//const deleteDialog = ref(false);
//const submitted = ref(false);
//const createDialog = ref(false);

async function getAll(): Promise<void> {
  const apartmentsData = await getAllApartment(security.token);
  if (apartmentsData.status != 200) {
    errors.value = true;
  } else {
    apartments.value = apartmentsData.data;
  }
}

// function onRowSelect(event: Ref<ApartmentResponse | undefined>) {
//   selectedApartment.value = event;
// }

// function Clickdelete() {
//   if (selectedApartment.value) {
//     deleteApartment(security.token, selectedApartment.value?.id);
//   }
// }

// function confirmDeleteSelected() {
//   console.log("ok");
// }

// function openNew() {
//   selectedApartment.value = undefined;
//   submitted.value = false;
//   createDialog.value = true;
// }

async function onRowEditSave(event: DataTableRowEditCancelEvent) {
  let { newData, index } = event;
  apartments.value[index] = newData;
  const response = await updateApartment(
    security.token,
    newData as UpdateApartment
  );
  console.log(response);
  if (response.status != 200) {
    errors.value = true;
  }
}

onMounted(() => {
  getAll();
});
</script>
