import config from "../configDataTable";

const configRent: config[] = [
  {
    field: "email",
    header: "Email du locataire",
    hidden: false,
    sortable: false,
    disabled: true,
  },
  {
    field: "address",
    header: "Addresse de l'appartment",
    hidden: false,
    sortable: true,
    disabled: true,
  },
  {
    field: "deposit",
    header: "Dépôts",
    hidden: false,
    sortable: true,
    disabled: false,
  },
  {
    field: "date_in",
    header: "date d'entrée",
    hidden: false,
    sortable: true,
    disabled: false,
  },
  {
    field: "description_in",
    header: "description de l'entrée",
    hidden: false,
    sortable: true,
    disabled: false,
  },
  {
    field: "description_in_tenant",
    header: "desription du locataire à l'entrée",
    hidden: false,
    sortable: false,
    disabled: false,
  },
  {
    field: "date_out",
    header: "description de la sortie",
    hidden: false,
    sortable: true,
    disabled: false,
  },
  {
    field: "description_out",
    header: "description à la sortie",
    hidden: false,
    sortable: true,
    disabled: false,
  },
  {
    field: "description_out_tenant",
    header: "desription du locataire à la sortie",
    hidden: false,
    sortable: false,
    disabled: false,
  },
];

export default configRent;
