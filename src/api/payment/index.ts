import { http } from "../http";
import { CreatePayment, UpdatePayment } from "immo-interface";
import { AxiosResponse } from "axios";
import { PaymentData } from "immo-interface";

const BASE_URL = "/api/payment";
function updatePayment(payment: UpdatePayment): Promise<AxiosResponse> {
  return http.put(BASE_URL, payment);
}

function savePayment(payment: CreatePayment): Promise<AxiosResponse> {
  return http.post(BASE_URL, payment);
}

function deletePayment(paymentId: string): Promise<AxiosResponse> {
  return http.delete(BASE_URL + "/" + paymentId);
}

function getPaymentData(): Promise<AxiosResponse<PaymentData[]>> {
  return http.get(BASE_URL + "/all");
}

export { updatePayment, savePayment, deletePayment, getPaymentData };
