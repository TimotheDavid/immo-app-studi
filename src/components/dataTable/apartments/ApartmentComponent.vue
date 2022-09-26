<template>
  <div>
    <TemplateHeader
      @onClickCreated="openNew"
      @onclickDelete="confirmDeleteSelected"
      :selected="selected"
    />
    <DataTable
      :value="apartments"
      :rows="10"
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      :rowsPerPageOptions="[10, 20, 50]"
      responsiveLayout="scroll"
      currentPageReportTemplate=" {first} sur {last} sur un total de  {totalRecords}"
      editMode="row"
      dataKey="id"
      v-model:editing-rows="editingRows"
      @row-edit-save="onRowEditSave"
      v-model:selection="selectedApartment"
      @rowSelect="onRowSelect"
    >
      <Column selectionMode="single" headerStyle="width: 3em"></Column>
      <Column
        v-for="col of configApartment"
        :key="configApartment.indexOf(col)"
        :field="col.field"
        :header="col.header"
        :hidden="col.hidden"
        :sortable="col.sortable"
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

    <Dialog
      v-model:visible="createDialog"
      :style="{ width: '450px' }"
      header="Product Details"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="address">Addresse</label>
        <InputText
          id="address"
          v-model.trim="createdApartment.address"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !createdApartment.address }"
        />
        <small class="p-error" v-if="submitted && !createdApartment.address"
          >L'addresse est requise.</small
        >
      </div>

      <div class="field">
        <label for="city">Ville</label>
        <InputText
          id="city"
          v-model.trim="createdApartment.city"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !createdApartment.city }"
        />
        <small class="p-error" v-if="submitted && !createdApartment.city"
          >Le nom de la ville est requise.</small
        >
      </div>

      <div class="field">
        <label for="complement">Complement d'addresse</label>
        <InputText
          id="complement"
          v-model.trim="createdApartment.complement"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !createdApartment.complement }"
        />
        <small class="p-error" v-if="submitted && !createdApartment.complement"
          >Le complement d'addresse est requis.</small
        >
      </div>

      <div class="field">
        <label for="postal_code">Code Postal</label>
        <InputText
          id="postal_code"
          v-model.trim="createdApartment.postal_code"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !createdApartment.postal_code }"
        />
        <small class="p-error" v-if="submitted && !createdApartment.postal_code"
          >Le code postal est requis.</small
        >
      </div>
      <div class="field">
        <label for="charge">Charge locative</label>
        <InputNumber
          type="number"
          id="charge"
          v-model="createdApartment.charge"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !createdApartment.charge }"
        />
        <small class="p-error" v-if="submitted && !createdApartment.charge"
          >Le montant des charges est requis.</small
        >
      </div>

      <div class="field">
        <label for="deposit">Dépôt de garantie</label>
        <InputNumber
          id="deposit"
          v-model="createdApartment.deposit"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !createdApartment.deposit }"
        />
        <small class="p-error" v-if="submitted && !createdApartment.deposit"
          >Le dépôt de garantie est requis.</small
        >
      </div>
      <div class="field">
        <label for="rent">Loyer</label>
        <InputNumber
          id="rent"
          v-model="createdApartment.rent"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !createdApartment.rent }"
        />
        <small class="p-error" v-if="submitted && !createdApartment.rent"
          >Le loyer est requis.</small
        >
      </div>

      <template #footer>
        <Button
          label="Abandonner"
          icon="pi pi-times"
          class="p-button-text"
          @click="hideDialog"
        />
        <Button
          label="Sauver"
          icon="pi pi-check"
          class="p-button-text"
          @click="save"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="selectedApartment"
          >Are you sure you want to delete <b>{{ selectedApartment.address }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="clickdelete"
        />
      </template>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import {
  ApartmentResponse,
  CreateApartement,
  UpdateApartment,
} from "immo-interface";
import configApartment from "./apartmentConfig";
import * as api from "@/api";
import { DataTableRowEditCancelEvent } from "primevue/datatable";
import { useToast } from "primevue/usetoast";
import ErrorConfig from "@/components/misc/errorConfig";

const apartments = ref<ApartmentResponse[]>([] as ApartmentResponse[]);
const selectedApartment = ref<ApartmentResponse>({} as ApartmentResponse);
const editingRows = ref<ApartmentResponse[]>([] as ApartmentResponse[]);
const errors = ref(false);
const createDialog = ref(false);
const createdApartment = ref<CreateApartement>({} as CreateApartement);
const submitted = ref(false);
const deleteDialog = ref(false);
const selected = ref<boolean>(false);
const toast = useToast();
let errorConfig: ErrorConfig = new ErrorConfig("appartment");

async function getAll(): Promise<void> {
  const apartmentsData = await api.getAllApartment();
  if (apartmentsData.status != 200) {
    errors.value = true;
  }
  apartments.value = apartmentsData.data;
}

function hideDialog() {
  createDialog.value = false;
}

async function save(): Promise<void> {
  submitted.value = true;
  const response = await api.saveApartment(
    createdApartment.value as CreateApartement
  );

  if (response.status != 200) {
    const getAllApartments = await api.getAllApartment();
    apartments.value = getAllApartments.data;
    toast.add(errorConfig.saveError);
  } else {
    toast.add(errorConfig.saveSuccess);
  }

  createDialog.value = false;
  createdApartment.value = {} as CreateApartement;
}

function onRowSelect(event: { data: ApartmentResponse }) {
  selectedApartment.value = event.data as ApartmentResponse;
  selected.value = true;
}

async function clickdelete() {
  if (selectedApartment.value) {
    const response = await api.deleteApartment(selectedApartment.value?.id);

    if (response.status > 300 || response.status != 200) {
      toast.add(errorConfig.deleteError);
    }

    apartments.value = apartments.value.filter(
      (apartment) => apartment.id != selectedApartment.value.id
    );
  }

  deleteDialog.value = false;
  selectedApartment.value = {} as ApartmentResponse;
  selected.value = false;
  toast.add(errorConfig.deleteSucess);
}

function confirmDeleteSelected() {
  if (selectedApartment.value) {
    deleteDialog.value = true;
  }
}

function openNew() {
  createDialog.value = true;
}

async function onRowEditSave(event: DataTableRowEditCancelEvent) {
  let { newData, index } = event;
  apartments.value[index] = newData;
  const response = await api.updateApartment(newData as UpdateApartment);
  if (response.status != 200) {
    errors.value = true;
    toast.add(errorConfig.updateError);
  }

  toast.add(errorConfig.updateSucess);
}

onMounted(() => {
  getAll();
});
</script>
