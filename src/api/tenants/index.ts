import { http } from "../http";
import { AxiosResponse } from "axios";
import { CreateTenant, TenantResponse, UpdateTenant } from "immo-interface";

const BASE_URL = "/api/tenant";

function getAllTenant(): Promise<AxiosResponse<TenantResponse[]>> {
  return http.get(BASE_URL);
}

function updateTenant(data: UpdateTenant): Promise<AxiosResponse> {
  return http.put(BASE_URL, data);
}

function saveTenant(data: CreateTenant): Promise<AxiosResponse> {
  return http.post(BASE_URL, data);
}

function deleteTenant(tenantId: string): Promise<AxiosResponse> {
  return http.delete(BASE_URL + "/" + tenantId);
}

function getBalanceSheet(rentId: string) {
  return http.get(BASE_URL + "/sheet?rent=" + rentId, {
    responseType: "blob",
  });
}
export {
  getAllTenant,
  updateTenant,
  saveTenant,
  deleteTenant,
  getBalanceSheet,
};
