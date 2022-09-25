/* eslint-disable  vue/multi-word-component-names*/
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import InputText from "primevue/inputtext";
import MegaMenu from "primevue/megamenu";
import DataTable from "primevue/datatable";
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";
import NavBar from "./components/navbar/NavBar.vue";
import Dialog from "primevue/dialog";
import TemplateHeader from "./components/misc/TemplateHeader.vue";
import Column from "primevue/column";
import InputNumber from "primevue/inputnumber";
import Calendar from "primevue/calendar";
import Dropdown from "primevue/dropdown";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";
const pinia = createPinia();
const app = createApp(App);
app.use(ToastService);
app.use(pinia);
app.component("Toast", Toast);
app.component("Dropdown", Dropdown);
app.component("Calendar", Calendar);
app.component("InputNumber", InputNumber);
app.component("Dialog", Dialog);
app.component("Button", Button);
app.component("Toolbar", Toolbar);
app.component("TemplateHeader", TemplateHeader);
app.component("NavBar", NavBar);
app.component("InputText", InputText);
app.component("MegaMenu", MegaMenu);
app.component("DataTable", DataTable);
app.component("Column", Column);

app.use(PrimeVue);
app.use(router).mount("#app");
