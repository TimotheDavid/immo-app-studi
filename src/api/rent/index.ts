import { http } from "../http";
import { CreateRent } from "immo-interface";
import { AxiosResponse } from "axios";
import { RentTenant } from "@/interface/RentTenant";

function saveRent(rent: CreateRent): Promise<AxiosResponse> {
  return http.post("/api/rent", rent);
}

function getRentTenant(): Promise<AxiosResponse<RentTenant[]>> {
  return http.get("/api/rent/tenant");
}

function getQuittance(rentId: string) {
  return http.get("/api/rent/receipt?rent=" + rentId, {
    responseType: "blob",
  });
}
export { saveRent, getRentTenant, getQuittance };
