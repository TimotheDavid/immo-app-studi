import { Origin, TypePayment } from "immo-interface";

export interface PaymentResponse {
  uuid: string;
  amount: number;
  date_payment: string;
  sens: boolean;
  type: TypePayment;
  origin: Origin;
  rentId: string;
}
