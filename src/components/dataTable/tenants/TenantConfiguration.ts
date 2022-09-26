import ConfigDataTable from "@/components/dataTable/configDataTable";

const config: ConfigDataTable[] = [
  {
    field: "name",
    header: "Nom",
    hidden: false,
    disabled: false,
    sortable: true,
  },
  {
    field: "first_name",
    header: "Prénom",
    hidden: false,
    sortable: true,
    disabled: false,
  },
  {
    field: "civility",
    header: "Genre",
    hidden: false,
    sortable: false,
    disabled: false,
  },
  {
    field: "birth_date",
    header: "Date de naissance",
    hidden: false,
    sortable: true,
    disabled: false,
  },
  {
    field: "birth_place",
    header: "Lieu de naissance",
    hidden: false,
    sortable: false,
    disabled: false,
  },
  {
    field: "email",
    header: "Email",
    hidden: false,
    sortable: true,
    disabled: false,
  },
  {
    field: "second_email",
    header: "Deuxième email",
    hidden: false,
    sortable: true,
    disabled: false,
  },
  {
    field: "phone",
    header: "Numéro de téléphone",
    hidden: false,
    sortable: false,
    disabled: false,
  },
  {
    field: "id",
    header: "",
    hidden: true,
    sortable: false,
    disabled: false,
  },
];

export default config;
