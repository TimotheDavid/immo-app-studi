<template>
  <NavBar />
  <Rent v-if="template === 'rent'" />
  <Apartment v-if="template === 'apartment'" />
  <Payment v-if="template === 'payment'" />
  <Tenant v-if="template === 'tenant'" />
  <Toast />
</template>
<script lang="ts" setup>
import { useRoute } from "vue-router";
import NavBar from "@/components/navbar/NavBar.vue";
import { computed } from "vue";
import Rent from "../components/dataTable/rent/RentComponent.vue";
import Apartment from "../components/dataTable/apartments/ApartmentComponent.vue";
import Payment from "../components/dataTable/payment/PaymentComponent.vue";
import Tenant from "../components/dataTable/tenants/TenantComponent.vue";

const route = useRoute();

const template = computed(() => {
  return route.query.type;
});
</script>
