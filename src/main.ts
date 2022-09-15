/* eslint-disable vue/multi-word-component-names */
import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import InputText from "primevue/inputtext";
import MegaMenu from "primevue/megamenu";
import DataTable from "primevue/datatable";
import NavBar from "./components/dataTable/NavBar.vue";
import Column from "primevue/column";
const pinia = createPinia();
const app = createApp(App);

app.component("PaymentComponent", {
  template: "#payment",
});

app.component("NavBar", NavBar);
app.component("InputText", InputText);
app.component("MegaMenu", MegaMenu);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.use(pinia);
app.use(PrimeVue);
app.use(router).mount("#app");
