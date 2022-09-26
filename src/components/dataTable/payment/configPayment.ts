import config from "../configDataTable";

const configPayment: config[] = [
  {
    field: "id",
    hidden: true,
    sortable: false,
    header: "",
    disabled: true,
  },
  {
    field: "first_name",
    hidden: false,
    sortable: true,
    header: "Prénom",
    disabled: false,
  },
  {
    field: "username",
    hidden: false,
    sortable: true,
    header: "Nom de famille",
    disabled: false,
  },
  {
    field: "date_payment",
    hidden: false,
    sortable: true,
    header: "Date de payment",
    disabled: false,
  },
  {
    field: "origin",
    hidden: false,
    sortable: true,
    header: "Origin du payment",
    disabled: false,
  },
  {
    field: "sens",
    hidden: false,
    sortable: true,
    header: "Débit/Crédit",
    disabled: false,
  },
  {
    field: "type",
    hidden: false,
    sortable: true,
    header: "Type de payment",
    disabled: false,
  },
  {
    field: "amount",
    hidden: false,
    sortable: true,
    header: "Montant",
    disabled: false,
  },
];

export default configPayment;
