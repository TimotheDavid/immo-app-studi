import { Origin, TypePayment } from "immo-interface";

export interface PaymentData {
  id: string;
  sens: boolean;
  type: TypePayment;
  origin: Origin;
  first_name: string;
  username: string;
  amount: number;
  date_payment: string;
  from: string;
}
