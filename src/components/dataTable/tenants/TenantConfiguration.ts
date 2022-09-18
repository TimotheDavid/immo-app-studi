import ConfigDataTable from "@/components/dataTable/configDataTable";

const config: ConfigDataTable[] = [
  {
    field: "name",
    header: "Nom",
    hidden: false,
    sortable: true,
  },
  {
    field: "first_name",
    header: "Prénom",
    hidden: false,
    sortable: true,
  },
  {
    field: "civility",
    header: "Genre",
    hidden: false,
    sortable: false,
  },
  {
    field: "birth_date",
    header: "Date de naissance",
    hidden: false,
    sortable: true,
  },
  {
    field: "birth_place",
    header: "Lieu de naissance",
    hidden: false,
    sortable: false,
  },
  {
    field: "email",
    header: "Email",
    hidden: false,
    sortable: true,
  },
  {
    field: "second_email",
    header: "Deuxième email",
    hidden: false,
    sortable: true,
  },
  {
    field: "phone",
    header: "Numéro de téléphone",
    hidden: false,
    sortable: false,
  },
  {
    field: "id",
    header: "",
    hidden: true,
    sortable: false,
  },
];

export default config;
