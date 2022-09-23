import { usesecurityStore } from "@/store/security";

const configNavbar = [
  {
    label: "Appartment",
    icon: "pi pi-building",
    to: "sheet?type=apartment",
  },
  {
    label: "Locataire",
    icon: "pi pi-users",
    to: "sheet?type=tenant",
  },
  {
    label: "Location",
    icon: "pi pi-credit-card",
    to: "sheet?type=rent",
  },
  {
    label: "Payment",
    icon: "pi  pi-dollar",
    to: "sheet?type=payment",
  },
  {
    label: "Déconnexion",
    icon: "pi pi-power-off",
    to: "login",
    command: () => {
      const store = usesecurityStore();
      store.token = "";
      sessionStorage.clear();
    },
  },
];

export default configNavbar;
