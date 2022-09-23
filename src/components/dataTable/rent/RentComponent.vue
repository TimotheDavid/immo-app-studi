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
    <div class="h-7rem justify-content-between my-3">
      <div class="field">
        <label for="quittance"
          >Email principale du locataire pour le bilan du locataire</label
        >
        <InputText
          id="quittance"
          v-model.trim="quittanceSearch.email"
          required="true"
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
    </div>
    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        class="p-button-text"
        @click="balanceSheet = false"
      />
      <Button
        label="Save"
        icon="pi pi-check"
        class="p-button-text"
        @click="getBalanceSheet"
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
    </div>
    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        class="p-button-text"
        @click="findQuittance = false"
      />
      <Button
        label="Save"
        icon="pi pi-check"
        class="p-button-text"
        @click="getQuittance"
      />
    </template>
  </Dialog>
  <Dialog
    v-model:visible="createDialog"
    :style="{ width: '450px' }"
    header="Tenants Details"
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
    </div>
    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        class="p-button-text"
        @click="createDialog = false"
      />
      <Button
        label="Save"
        icon="pi pi-check"
        class="p-button-text"
        @click="save"
      />
    </template>
  </Dialog>
  <a id="files" :href="files"></a>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { ApartmentResponse, CreateRent, TenantResponse } from "immo-interface";
import * as api from "@/api";
import { AxiosResponse } from "axios";
import { RentTenant } from "@/interface/RentTenant";
import { useToast } from "primevue/usetoast";

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
const files = ref();
const toast = useToast();
async function findApartment() {
  const apartementList: AxiosResponse<ApartmentResponse[]> =
    await api.getAllApartment();
  const apartmentSearch = apartementList.data.filter((apartmentFind) =>
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
  const tenantList: AxiosResponse<TenantResponse[]> = await api.getAllTenant();
  const tenantSearch = tenantList.data.filter((tenantFind) =>
    tenantFind.email.includes(rentSearch.value.emailTenant)
  );
  tenant.value = tenantSearch[0];
}

async function save() {
  submitted.value = true;

  const saveObject = {
    apartment: apartment.value.id,
    in_date: "",
    tenant: tenant.value.id,
    agency_pourcent: 8,
    out_date: "",
    description_in: "",
    description_out: "",
    amount: 0,
    deposit: rentSearch.value.deposit,
  };

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

onMounted(() => {
  loadRentTenant();
});
</script>

<style></style>
