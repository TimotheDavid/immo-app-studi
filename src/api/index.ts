import { loginUser } from "./auth";
import {
  deleteApartment,
  getAllApartment,
  saveApartment,
  updateApartment,
} from "./apartment";
import {
  deleteTenant,
  getAllTenant,
  getBalanceSheet,
  saveTenant,
  updateTenant,
} from "./tenants";
import {
  getQuittance,
  getRent,
  getRentTenant,
  saveRent,
  updateRent,
} from "@/api/rent";

import {
  deletePayment,
  getPaymentData,
  savePayment,
  updatePayment,
} from "@/api/payment";

export {
  loginUser,
  getAllApartment,
  updateApartment,
  deleteApartment,
  saveApartment,
  saveTenant,
  deleteTenant,
  updateTenant,
  getAllTenant,
  saveRent,
  savePayment,
  getPaymentData,
  deletePayment,
  updatePayment,
  getRentTenant,
  getQuittance,
  getBalanceSheet,
  getRent,
  updateRent,
};
