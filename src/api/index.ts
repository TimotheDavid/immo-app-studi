import { loginUser } from "./auth";
import {
  getAllApartment,
  updateApartment,
  deleteApartment,
  saveApartment,
} from "./apartment";
import {
  saveTenant,
  deleteTenant,
  updateTenant,
  getAllTenant,
  getBalanceSheet,
} from "./tenants";
import { saveRent, getRentTenant, getQuittance } from "@/api/rent";

import {
  savePayment,
  getPaymentData,
  deletePayment,
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
};
