<template>
  <Toolbar class="mb-4">
    <template #start>
      <Button
        label="Affecter"
        icon="pi pi-plus"
        class="p-button-success mr-2"
        @click="createDialog = true"
      />
      <Button
        label="Quittance"
        class="p-button-help mr-2"
        @click="findQuittance = true"
      />
      <Button
        label="Bilan du locataire"
        class="p-button-help mr-2"
        @click="balanceSheet = true"
      />
    </template>
  </Toolbar>

  <Dialog
    v-model:visible="balanceSheet"
    header="Quittance"
    :modal="true"
    class="p-fluid"
  >
    <div class="h-10rem justify-content-between">
      <div class="field">
        <label for="quittance"
          >Email principale du locataire pour le bilan du locataire</label
        >
        <InputText
          id="quittance"
          v-model.trim="quittanceSearch.email"
          required="true"
          :disabled="disableRentTenant()"
          @input="findTenantRent"
          :class="{ 'p-invalid': submitted && !quittanceSearch }"
        />
      </div>
      <div class="field">
        <InputText
          disabled="true"
          v-model.trim="quittanceSearch.email"
          required="true"
        />
      </div>
      <div>
        <small class="p-error" v-if="submitted && !quittanceSearch.email"
          >Un email de locataire est requis</small
        >
      </div>
      <small class="p-error text-lg" v-if="tenantAll.length < 1"
        >Aucun locataire dans la base de donnée</small
      >
    </div>
    <template #footer>
      <Button
        label="Abandonner"
        icon="pi pi-times"
        class="p-button-text"
        @click="balanceSheet = false"
      />
      <Button
        label="Sauver"
        icon="pi pi-check"
        class="p-button-text"
        @click="getBalanceSheet"
        :disabled="disableRentTenant()"
      />
    </template>
  </Dialog>

  <Dialog
    v-model:visible="findQuittance"
    header="Quittance"
    :modal="true"
    class="p-fluid"
  >
    <div class="h-7rem justify-content-between my-3">
      <div class="field">
        <label for="quittance"
          >Email principale du locataire pour la quittance</label
        >
        <InputText
          id="quittance"
          v-model.trim="quittanceSearch.email"
          required="true"
          :disabled="disableRentTenant()"
          @input="findTenantRent"
          :class="{ 'p-invalid': submitted && !quittanceSearch }"
        />
      </div>
      <div class="field">
        <InputText
          disabled="true"
          v-model.trim="quittanceSearch.email"
          required="true"
        />
      </div>
      <div>
        <small class="p-error text-lg" v-if="disableRentTenant()"
          >Aucun locataire dans la base de donnée</small
        >
      </div>
    </div>
    <template #footer>
      <Button
        label="Abandonner"
        icon="pi pi-times"
        class="p-button-text"
        @click="findQuittance = false"
      />
      <Button
        label="Sauver"
        icon="pi pi-check"
        class="p-button-text"
        @click="getQuittance"
        :disabled="disableRentTenant()"
      />
    </template>
  </Dialog>
  <Dialog
    v-model:visible="createDialog"
    :style="{ width: '450px' }"
    header="Crée une location"
    :modal="true"
    class="p-fluid"
  >
    <div class="h-7rem justify-content-between my-3">
      <div class="field">
        <label for="apartment">Addresse de l'apartment</label>
        <InputText
          id="apartment"
          v-model.trim="rentSearch.apartmentAddress"
          required="true"
          :disabled="disableRentTenant()"
          @input="findApartment"
          :class="{ 'p-invalid': submitted && !rentSearch.apartmentAddress }"
        />
      </div>
      <div class="field">
        <InputText
          disabled="true"
          v-model.trim="apartment.address"
          required="true"
        />
      </div>
    </div>

    <div class="h-7rem justify-content-between my-3">
      <div class="field">
        <label for="tenantName">Email du locataire</label>
        <InputText
          id="tenantName"
          v-model.trim="rentSearch.emailTenant"
          required="true"
          :disabled="disableRentTenant()"
          @input="findTenant"
          :class="{ 'p-invalid': submitted && !rentSearch.emailTenant }"
        />
      </div>
      <div class="field">
        <InputText
          disabled="true"
          v-model.trim="tenant.email"
          required="true"
        />
      </div>
    </div>
    <div class="h-7rem justify-content-between my-3">
      <div class="field">
        <label for="deposit">Dépôts de garantie</label>
        <InputNumber
          id="deposit"
          v-model="rentSearch.deposit"
          required="true"
          @input="findTenant"
          mode="currency"
          currency="EUR"
          locale="fr-FR"
          :class="{ 'p-invalid': submitted && !rentSearch.deposit }"
        />
      </div>
      <div>
        <small class="p-error text-lg" v-if="disableRentTenant()"
          >Aucun locataire ou aucun appartment dans la base de donnée !</small
        >
      </div>
    </div>
    <template #footer>
      <Button
        label="Abandonner"
        icon="pi pi-times"
        class="p-button-text"
        @click="createDialog = false"
      />
      <Button
        label="Sauver"
        icon="pi pi-check"
        class="p-button-text"
        @click="save"
        :disabled="disableRentTenant()"
      />
    </template>
  </Dialog>
  <DataTable
    :value="rent"
    :rows="10"
    responsiveLayout="scroll"
    v-model:editing-rows="editingRows"
    @row-edit-save="onRowEditSave"
    edit-mode="row"
    columnResizeMode="expand"
    showGridlines
    :resizableColumns="true"
  >
    <Column field="email" header="Email du locataire">
      <template #editor="{ data, field }">
        <InputText v-model="data[field]" autofocus disabled="true" />
      </template>
    </Column>

    <Column field="address" header="Addresse de l'appartment" :sortable="true">
      <template #editor="{ data, field }">
        <InputText v-model="data[field]" autofocus disabled="true" />
      </template>
    </Column>
    <Column field="deposit" header="Dépôt de garantie" :sortable="true">
      <template #editor="{ data, field }">
        <InputNumber
          v-model="data[field]"
          autofocus
          mode="currency"
          currency="EUR"
          locale="fr-FR"
        />
      </template>
    </Column>
    <Column field="rent" header="Loyer de location" :sortable="true">
      <template #editor="{ data, field }">
        <InputNumber
          v-model="data[field]"
          autofocus
          mode="currency"
          currency="EUR"
          locale="fr-FR"
        />
      </template>
    </Column>
    <Column field="date_in" header="Date d'entrée" :sortable="true">
      <template #editor="{ data, field }">
        <Calendar v-model="data[field]" date-format="MM/dd/yyyy" />
      </template>
    </Column>
    <Column
      field="description_in"
      header="Description d'entrée"
      :sortable="true"
    >
      <template #editor="{ data, field }">
        <Textarea v-model="data[field]" rows="5" cols="30" />
      </template>
    </Column>
    <Column
      field="description_in_tenant"
      header="Description d'entreé du locataire"
    >
      <template #editor="{ data, field }">
        <Textarea v-model="data[field]" rows="5" cols="30" />
      </template>
    </Column>
    <Column field="date_out" header="Date d'entrée" :sortable="true">
      <template #editor="{ data, field }">
        <Calendar v-model="data[field]" date-format="MM/dd/yyyy" />
      </template>
    </Column>
    <Column
      field="description_out"
      header="Description d'entrée"
      :sortable="true"
    >
      <template #editor="{ data, field }">
        <Textarea v-model="data[field]" rows="5" cols="30" />
      </template>
    </Column>
    <Column
      field="description_out_tenant"
      header="Description d'entreé du locataire"
    >
      <template #editor="{ data, field }">
        <Textarea v-model="data[field]" rows="5" cols="30" />
      </template>
    </Column>
    <Column
      :rowEditor="true"
      style="width: 10%; min-width: 8rem"
      bodyStyle="text-align:center"
    ></Column>
  </DataTable>
  <a id="files" :href="files"></a>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import {
  ApartmentResponse,
  TenantResponse,
  RentResponse,
  UpdateRent,
} from "immo-interface";
import * as api from "@/api";
import { RentTenant } from "@/interface/RentTenant";
import { useToast } from "primevue/usetoast";
import { DataTableRowEditCancelEvent } from "primevue/datatable";
import ErrorConfig from "@/components/misc/errorConfig";
const rentSearch = ref({
  apartmentAddress: "",
  emailTenant: "",
  deposit: 0,
});

const apartment = ref<ApartmentResponse>({} as ApartmentResponse);
const tenant = ref<TenantResponse>({} as TenantResponse);
const submitted = ref<boolean>(false);
const createDialog = ref(false);
const quittanceSearch = ref<RentTenant>({} as RentTenant);
const rentTenant = ref<RentTenant[]>([] as RentTenant[]);
const findQuittance = ref<boolean>(false);
const balanceSheet = ref<boolean>(false);
const tenantAll = ref<TenantResponse[]>([] as TenantResponse[]);
const apartmentAll = ref<ApartmentResponse[]>([] as ApartmentResponse[]);
const rent = ref<RentResponse[]>([] as RentResponse[]);
const errors = ref<boolean>(false);
const files = ref();
const editingRows = ref<RentResponse[]>([] as RentResponse[]);
const toast = useToast();
const errorConfig: ErrorConfig = new ErrorConfig("location");

async function findApartment() {
  const apartmentSearch = apartmentAll.value.filter((apartmentFind) =>
    apartmentFind.address.includes(rentSearch.value.apartmentAddress)
  );
  apartment.value = apartmentSearch[0];
}

function findTenantRent() {
  const tenantRent = rentTenant.value.filter((rentTenantFind) =>
    rentTenantFind.email.includes(quittanceSearch.value.email)
  );
  quittanceSearch.value = tenantRent[0];
}

async function loadRent() {
  const rentData = await api.getRent();
  rent.value = rentData.data;
}

async function getTenant() {
  const tenantData = await api.getAllTenant();
  tenantAll.value = tenantData.data;
}

async function getApartment() {
  const apartmentData = await api.getAllApartment();
  apartmentAll.value = apartmentData.data;
}

async function getQuittance() {
  const response = await api.getQuittance(quittanceSearch.value.rent);
  if (response.status == 200) {
    const blob = new Blob([response.data], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `quittance_${quittanceSearch.value.email}.pdf`;
    link.click();
  }

  findQuittance.value = false;
  quittanceSearch.value = {} as RentTenant;
}

async function getBalanceSheet() {
  const response = await api.getBalanceSheet(quittanceSearch.value.rent);
  if (response.status == 200) {
    const blob = new Blob([response.data], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `bilan_${quittanceSearch.value.email}.pdf`;
    link.click();
  }

  findQuittance.value = false;
  quittanceSearch.value = {} as RentTenant;
}

async function loadRentTenant() {
  const response = await api.getRentTenant();
  rentTenant.value = response.data;
}

async function findTenant() {
  const tenantSearch = tenantAll.value.filter((tenantFind) =>
    tenantFind.email.includes(rentSearch.value.emailTenant)
  );
  tenant.value = tenantSearch[0];
}

async function onRowEditSave(event: DataTableRowEditCancelEvent) {
  let { newData, index } = event;
  console.log(newData);
  rent.value[index] = newData;
  const response = await api.updateRent(newData as UpdateRent);
  if (response.status != 200) {
    toast.add(errorConfig.updateError);
    errors.value = true;
  }

  toast.add(errorConfig.updateSucess);
}

async function save() {
  submitted.value = true;

  if (!tenant.value.id || !apartment.value.id) {
    toast.add(errorConfig.saveError);
    return;
  }

  const saveObject = {
    apartment: apartment.value.id,
    in_date: "",
    tenant: tenant.value.id,
    agency_pourcent: 8,
    out_date: "",
    description_in: "",
    description_out: "",
    rent: 0,
    deposit: rentSearch.value.deposit,
  };

  console.log(saveObject);

  const response = await api.saveRent(saveObject);
  if (response.status < 300) {
    toast.add({
      severity: "sucess",
      summary: "Location crée",
      life: 3000,
    });
    createDialog.value = false;
  }
}

function disableRentTenant() {
  return tenantAll.value.length < 1 || apartmentAll.value.length < 1;
}

onMounted(() => {
  loadRentTenant();
  loadRent();
  getApartment();
  getTenant();
});
</script>

<style></style>
