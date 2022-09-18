<template>
  <NavBar />
  <Rent v-if="template === 'rent'" />
  <Apartment v-if="template === 'apartment'" />
  <Payment v-if="template === 'payment'" />
  <User v-if="template === 'user'" />
  <Tenant v-if="template === 'tenant'" />
</template>
<script lang="ts" setup>
import { useRoute } from "vue-router";
import NavBar from "@/components/navbar/NavBar.vue";
import { computed } from "vue";
import Rent from "../components/dataTable/RentComponent.vue";
import Apartment from "../components/dataTable/apartments/ApartmentComponent.vue";
import Payment from "../components/dataTable/PaymentComponent.vue";
import User from "../components/dataTable/UserComponent.vue";
import Tenant from "../components/dataTable/tenants/TenantComponent.vue";

const route = useRoute();

const template = computed(() => {
  return route.query.type;
});
</script>
