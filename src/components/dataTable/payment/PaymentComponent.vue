<template>
  <div>
    <TemplateHeader
      @onClickCreated="createDialog = true"
      @onclickDelete="confirmDeleteSelected = true"
      :selected="selected"
    />
    <DataTable
      :value="payment"
      :rows="10"
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      :rowsPerPageOptions="[10, 20, 50]"
      responsiveLayout="scroll"
      currentPageReportTemplate=" {first} sur {last} sur un total de  {totalRecords}"
      editMode="row"
      dataKey="id"
      v-model:editing-rows="editingRows"
      @row-edit-save="onRowEditSave"
      v-model:selection="selectedPayment"
      @rowSelect="onRowSelect"
    >
      <Column selectionMode="single" headerStyle="width: 3em"></Column>
      <Column field="id" header="uuid" :sortable="true" :hidden="true">
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" autofocus />
        </template>
      </Column>
      <Column
        field="first_name"
        header="Prénom"
        :sortable="true"
        style="width: 25%"
      >
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" disabled="true" autofocus />
        </template>
      </Column>
      <Column
        field="username"
        header="Nom de famille"
        :sortable="true"
        style="width: 25%"
      >
        <template #editor="{ data, field }">
          <InputText v-model="data[field]" autofocus disabled="true" />
        </template>
      </Column>
      <Column
        field="date_payment"
        header="Date de payment"
        :sortable="true"
        style="width: 25%"
      >
        <template #editor="{ data, field }">
          <Calendar v-model="data[field]" autofocus dateFormat="MM/dd/yyyy" />
        </template>
      </Column>
      <Column
        field="origin"
        header="Origine"
        :sortable="true"
        style="width: 25%"
      >
        <template #editor="{ data, field }">
          <Dropdown
            v-model="data[field]"
            :options="originDropDown"
            option-label="name"
            option-value="value"
            placeholder="Origin"
            autofocus
          />
        </template>
      </Column>
      <Column
        field="sens"
        header="Débit/Crédit"
        :sortable="true"
        style="width: 25%"
      >
        <template #editor="{ data, field }">
          <Dropdown
            v-model="data[field]"
            :options="debitCredit"
            option-label="name"
            option-value="value"
            placeholder="Type de mouvement"
            autofocus
          />
        </template>
      </Column>
      <Column
        field="type"
        header="Type de payment"
        :sortable="true"
        style="width: 25%"
      >
        <template #editor="{ data, field }">
          <Dropdown
            v-model="data[field]"
            :options="typePayment"
            option-label="name"
            option-value="value"
            placeholder="Type de payment"
            autofocus
          />
        </template>
      </Column>
      <Column
        field="from"
        header="Provenance du payment"
        :sortable="true"
        style="width: 25%"
      >
        <template #editor="{ data, field }">
          <Dropdown
            v-model="data[field]"
            :options="fromType"
            option-label="name"
            option-value="name"
            placeholder="Provenance du payment"
            autofocus
          />
        </template>
      </Column>
      <Column
        field="amount"
        header="Montant du loyer"
        :sortable="true"
        style="width: 25%"
      >
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
      <Column
        :rowEditor="true"
        style="width: 10%; min-width: 8rem"
        bodyStyle="text-align:center"
      ></Column>
    </DataTable>

    <Dialog
      v-model:visible="createDialog"
      :style="{ width: '450px' }"
      header="Crée un payment"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="">Loyer</label>
        <InputNumber
          id="rent"
          v-model="createPayment.payment"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !createPayment.payment }"
        />
        <small class="p-error" v-if="submitted && !createPayment.payment"
          >Le loyer est requis.</small
        >
      </div>
      <div class="field">
        <label for="date_payment">Date de payment</label>
        <Calendar
          v-model="createPayment.date_payment"
          input-id="date_payment"
          autofocus
          date-format="MM/dd/yyyy"
          :class="{ 'p-invalid': submitted && !createPayment.date_payment }"
        />
        <small class="p-error" v-if="submitted && !createPayment.date_payment"
          >La date de payment est requise</small
        >
      </div>
      <div class="field">
        <label for="origin">Origine</label>
        <Dropdown
          v-model="createPayment.origin"
          :options="originDropDown"
          id="origin"
          option-label="name"
          :class="{ 'p-invalid': submitted && !createPayment.origin }"
          option-value="value"
          placeholder="Origin"
          autofocus
        />
        <small class="p-error" v-if="submitted && !createPayment.origin"
          >L'origin du payment est requise</small
        >
      </div>
      <div class="field">
        <label for="debit">Débit</label>
        <Dropdown
          v-model="createPayment.sens"
          :options="debitCredit"
          id="debit"
          option-label="name"
          option-value="value"
          placeholder="Type de mouvement"
          autofocus
        />

        <small class="p-error" v-if="submitted && !createPayment.sens"
          >Le débit est requis</small
        >
      </div>
      <div class="field">
        <label for="type">Type de payment</label>
        <Dropdown
          v-model="createPayment.type_payment"
          id="type"
          :options="typePayment"
          option-label="name"
          option-value="value"
          placeholder="Type de payment"
          :class="{ 'p-invalid': submitted && !createPayment.type_payment }"
          autofocus
        />
        <small class="p-error" v-if="submitted && !createPayment.type_payment"
          >Le type de payment est requis</small
        >
      </div>
      <div class="field">
        <label for="form">Forme du payment</label>
        <Dropdown
          v-model="createPayment.from"
          id="form"
          :options="fromType"
          option-label="name"
          option-value="name"
          placeholder="Forme du payment"
          :class="{ 'p-invalid': submitted && !createPayment.from }"
          autofocus
        />
        <small class="p-error" v-if="submitted && !createPayment.from"
          >La forme du payement est requise</small
        >
      </div>
      <div class="field">
        <div class="field">
          <label for="apartment">Addresse de l'apartment à louer</label>
          <InputText
            id="apartment"
            v-model.trim="rentSearch"
            required="true"
            @input="findRentId"
            :disabled="rentTenant.length < 1"
            :class="{ 'p-invalid': submitted && !rentSearch }"
          />
        </div>
        <div class="field">
          <InputText
            disabled="true"
            v-model.trim="rentIdValue.email"
            required="true"
          />
        </div>

        <small class="p-error" v-if="submitted && !rentIdValue.email"
          >Un email de locataire est requis</small
        >
        <small class="p-error text-2xl" v-if="rentTenant < 1"
          >Aucun apartment à louer !</small
        >
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
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="confirmDeleteSelected"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="selectedPayment"
          >Etes vous sur de vouloir détruire le payment
          <b>{{ selectedPayment.id }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="confirmDeleteSelected = false"
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
import { PaymentData } from "@/interface/PaymentData";
import { CreatePayment, PaymentResponse, UpdatePayment } from "immo-interface";
import { DataTableRowEditCancelEvent } from "primevue/datatable";
import * as api from "@/api";
import { RentTenant } from "@/interface/RentTenant";
import { useToast } from "primevue/usetoast";
import ErrorConfig from "@/components/misc/errorConfig";

const createDialog = ref(false);
const submitted = ref(false);
const errors = ref(false);
const confirmDeleteSelected = ref(false);
let payment = ref<PaymentData[]>([] as PaymentData[]);
const selectedPayment = ref<PaymentResponse>({} as PaymentResponse);
const editingRows = ref<PaymentResponse[]>([] as PaymentResponse[]);
const createPayment = ref<CreatePayment>({} as CreatePayment);
const rentSearch = ref<string>(" ");
const rentTenant = ref<RentTenant[]>([] as RentTenant[]);
const toast = useToast();
const errorConfig: ErrorConfig = new ErrorConfig("payment");
const rentIdValue = ref<{ rent: string; email: string }>(
  {} as { rent: string; email: string }
);

const selected = ref<boolean>(false);
const originDropDown = ref([
  { name: "CAF", value: "CAF" },
  { name: "LOCATAIRE", value: "LOCATAIRE" },
]);

const fromType = ref([
  { name: "CAUTION" },
  { name: "CHARGE" },
  { name: "LOYER" },
]);
const debitCredit = ref([
  { name: "Débit", value: true },
  { name: "Crédit", value: false },
]);

const typePayment = ref([
  { name: "CARTE", value: "CARTE" },
  { name: "CHEQUE", value: "CHEQUE" },
  { name: "ESPECE", value: "ESPECE" },
]);
async function getPaymentData() {
  let response = await api.getPaymentData();
  payment.value = response.data;
}

function findRentId() {
  if (rentSearch.value != undefined) {
    const search = rentTenant.value.filter((rent) =>
      rent.email.includes(rentSearch.value)
    );
    if (search.length > 0) {
      rentIdValue.value = search[0];
    }
  }
}

async function getRentTenant() {
  let response = await api.getRentTenant();
  rentTenant.value = response.data;
}
async function onRowEditSave(event: DataTableRowEditCancelEvent) {
  let { newData, index } = event;
  payment.value[index] = newData;

  const response = await api.updatePayment(newData as UpdatePayment);
  if (response.status == 200) {
    toast.add(errorConfig.updateSucess);
  } else {
    errors.value = true;
    toast.add(errorConfig.updateError);
  }
}

async function clickdelete() {
  if (selectedPayment.value) {
    const response = await api.deletePayment(selectedPayment.value.id);

    if (response.status == 200) {
      toast.add(errorConfig.deleteSucess);
    } else {
      toast.add(errorConfig.deleteError);
    }
  }

  payment.value = payment.value.filter(
    (paymentObject) => paymentObject.id != selectedPayment.value.id
  );
  selected.value = false;
  selectedPayment.value = {} as PaymentResponse;
  confirmDeleteSelected.value = false;
}

async function save() {
  submitted.value = true;

  createPayment.value.rent_id = rentIdValue.value.rent;
  const response = await api.savePayment(createPayment.value as CreatePayment);

  if (response.status == 200) {
    toast.add(errorConfig.saveSuccess);
  } else {
    toast.add(errorConfig.saveError);
  }

  createDialog.value = false;
  createPayment.value = {} as CreatePayment;
}

function onRowSelect(event: { data: PaymentResponse }) {
  selectedPayment.value = event.data as PaymentResponse;
  selected.value = true;
}

onMounted(() => {
  getPaymentData();
  getRentTenant();
});
</script>

<style></style>
