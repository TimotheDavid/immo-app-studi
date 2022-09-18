<template>
  <div>
    <TemplateHeader
      @onClickCreated="openNew"
      @onclickDelete="confirmDeleteSelected"
    />
    <DataTable
      :value="tenants"
      :rows="10"
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      :rowsPerPageOptions="[10, 20, 50]"
      responsiveLayout="scroll"
      currentPageReportTemplate=" {first} sur {last} sur un total de  {totalRecords}"
      editMode="row"
      dataKey="id"
      v-model:editing-rows="editingRows"
      @row-edit-save="onRowEditSave"
      v-model:selection="selectedTenants"
      @rowSelect="onRowSelect"
    >
      <Column selectionMode="single" headerStyle="width: 3em"></Column>
      <Column
        v-for="col of config"
        :key="config.indexOf(col)"
        :field="col.field"
        :hidden="col.hidden"
        :header="col.header"
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
      header="Tenants Details"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="name">Nom de famille</label>
        <InputText
          id="name"
          v-model.trim="createdTenant.name"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !createdTenant.name }"
        />
        <small class="p-error" v-if="submitted && !createdTenant.name"
          >Le Nom de famille est requis.</small
        >
        <div class="field">
          <label for="firstName">Prénom</label>
          <InputText
            id="firstName"
            v-model.trim="createdTenant.first_name"
            required="true"
            autofocus
            :class="{ 'p-invalid': submitted && !createdTenant.first_name }"
          />
          <small class="p-error" v-if="submitted && !createdTenant.first_name"
            >Le prénom est requis.</small
          >
        </div>
      </div>
      <div class="field">
        <label for="gender">Genre</label>
        <Dropdown
          v-model="createdTenant.civility"
          :options="civilityDrop"
          optionLabel="name"
          optionValue="code"
          placeholder="Civilité"
        />
        <small class="p-error" v-if="submitted && !createdTenant.civility"
          >L'addresse est requise.</small
        >
      </div>
      <div class="field">
        <label for="birthDate">Date de Naissance</label>
        <Calendar
          id="address"
          v-model="createdTenant.birth_date"
          required="true"
          autofocus
          :show-time="true"
          hour-format="24"
          date-format="dd-mm-yy"
          :class="{ 'p-invalid': submitted && !createdTenant.birth_date }"
        />
        <small class="p-error" v-if="submitted && !createdTenant.birth_date"
          >La date de naissance est requise.</small
        >
      </div>
      <div class="field">
        <label for="birthPlace">Lieu de naissance</label>
        <InputText
          id="birthPlace"
          v-model.trim="createdTenant.birth_place"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !createdTenant.birth_place }"
        />
        <small class="p-error" v-if="submitted && !createdTenant.birth_place"
          >L'addresse est requise.</small
        >
      </div>
      <div class="field">
        <label for="email">Email</label>
        <InputText
          id="email"
          v-model.trim="createdTenant.email"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !createdTenant.email }"
        />
        <small class="p-error" v-if="submitted && !createdTenant.email"
          >L'addresse email est requise.</small
        >
      </div>
      <div class="field">
        <label for="secondEmail">Deuxième Adresse Email</label>
        <InputText
          id="secondEmail"
          v-model.trim="createdTenant.second_email"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !createdTenant.second_email }"
        />
        <small class="p-error" v-if="submitted && !createdTenant.second_email"
          >L'addresse est requise.</small
        >
      </div>
      <div class="field">
        <label for="phoneNumber">Numéro de téléphone</label>
        <InputText
          id="phoneNumber"
          v-model.trim="createdTenant.phone"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !createdTenant.phone }"
        />
        <small class="p-error" v-if="submitted && !createdTenant.phone"
          >L'addresse est requise.</small
        >
      </div>
      <template #footer>
        <Button
          label="Cancel"
          icon="pi pi-times"
          class="p-button-text"
          @click="hideDialog"
        />
        <Button
          label="Save"
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
        <span v-if="selectedTenants"
          >Are you sure you want to delete
          <b
            >{{ selectedTenants.civility }} {{ selectedTenants.name }}
            {{ selectedTenants.first_name }} ? </b
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
import { CreateTenant, TenantResponse, UpdateTenant } from "immo-interface";
import config from "./TenantConfiguration";
import * as api from "@/api";
import { DataTableRowEditCancelEvent } from "primevue/datatable";
import civility from "./civility.ts";

const tenants = ref<TenantResponse[]>([] as TenantResponse[]);
const selectedTenants = ref<TenantResponse>({} as TenantResponse);
const editingRows = ref<TenantResponse[]>([] as TenantResponse[]);
const errors = ref(false);
const createDialog = ref(false);
const createdTenant = ref<CreateTenant>({} as CreateTenant);
const submitted = ref(false);
const deleteDialog = ref(false);
const civilityDrop = ref(civility);

async function getAll(): Promise<void> {
  const tenantsData = await api.getAllTenant();
  if (tenantsData.status != 200) {
    errors.value = true;
  } else {
    tenants.value = tenantsData.data;
  }
}

function hideDialog() {
  createDialog.value = false;
}

async function save(): Promise<void> {
  submitted.value = true;
  const response = await api.saveTenant(createdTenant.value as CreateTenant);

  if (response.status != 200) {
    const getAllTenants = await api.getAllTenant();
    tenants.value = getAllTenants.data;
  }
  createDialog.value = false;
  createdTenant.value = {} as CreateTenant;
}

function onRowSelect(event: { data: TenantResponse }) {
  selectedTenants.value = event.data as TenantResponse;
}

async function clickdelete() {
  if (selectedTenants.value) {
    await api.deleteTenant(selectedTenants.value?.id);

    tenants.value = tenants.value.filter(
      (tenant) => tenant.id != selectedTenants.value.id
    );
  }

  deleteDialog.value = false;
}

function confirmDeleteSelected() {
  if (selectedTenants.value) {
    deleteDialog.value = true;
  }
}

function openNew() {
  createDialog.value = true;
}

async function onRowEditSave(event: DataTableRowEditCancelEvent) {
  let { newData, index } = event;
  tenants.value[index] = newData;
  const response = await api.updateTenant(newData as UpdateTenant);
  if (response.status != 200) {
    errors.value = true;
  }
}

onMounted(() => {
  getAll();
});
</script>
