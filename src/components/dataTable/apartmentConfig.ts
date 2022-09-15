import config from "./configComponent";

const config: config[] = [
  {
    field: "id",
    header: "",
    hidden: true,
    sortable: false,
  },
  {
    field: "address",
    header: "Adresse",
    hidden: false,
    sortable: true,
  },
  {
    field: "complement",
    header: "Complement",
    hidden: false,
    sortable: true,
  },
  {
    field: "city",
    header: "Ville",
    hidden: false,
    sortable: true,
  },
  {
    field: "postal_code",
    header: "Code postal",
    hidden: false,
    sortable: true,
  },
  {
    field: "charge",
    header: "Charge Locative",
    hidden: false,
    sortable: true,
  },
  {
    field: "rent",
    header: "Loyer",
    hidden: false,
    sortable: true,
  },
  {
    field: "deposit",
    header: "Frais d'entrée",
    hidden: false,
    sortable: true,
  },
];
export default config;
