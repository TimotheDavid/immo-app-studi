import config from "../configDataTable";

const configPayment: config[] = [
  {
    field: "id",
    hidden: true,
    sortable: false,
    header: "",
  },
  {
    field: "first_name",
    hidden: false,
    sortable: true,
    header: "Prénom",
  },
  {
    field: "username",
    hidden: false,
    sortable: true,
    header: "Nom de famille",
  },
  {
    field: "date_payment",
    hidden: false,
    sortable: true,
    header: "Date de payment",
  },
  {
    field: "origin",
    hidden: false,
    sortable: true,
    header: "Origin du payment",
  },
  {
    field: "sens",
    hidden: false,
    sortable: true,
    header: "Débit/Crédit",
  },
  {
    field: "type",
    hidden: false,
    sortable: true,
    header: "Type de payment",
  },
  {
    field: "amount",
    hidden: false,
    sortable: true,
    header: "Montant",
  },
];

export default configPayment;
