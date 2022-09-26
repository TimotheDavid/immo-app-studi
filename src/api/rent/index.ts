import { http } from "../http";
import {
  CreateRent,
  RentResponse,
  RentTenant,
  UpdateRent,
} from "immo-interface";
import { AxiosResponse } from "axios";

const BASE_URL = "/api/rent";
function saveRent(rent: CreateRent): Promise<AxiosResponse> {
  return http.post("/api/rent", rent);
}

function getRentTenant(): Promise<AxiosResponse<RentTenant[]>> {
  return http.get(BASE_URL + "/tenant");
}

function getRent(): Promise<AxiosResponse<RentResponse[]>> {
  return http.get(BASE_URL);
}

function updateRent(rent: UpdateRent): Promise<AxiosResponse> {
  return http.put(BASE_URL, rent);
}

function getQuittance(rentId: string) {
  return http.get("/api/rent/receipt?rent=" + rentId, {
    responseType: "blob",
  });
}
export { saveRent, getRentTenant, getQuittance, getRent, updateRent };
