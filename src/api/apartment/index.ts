import { AxiosResponse } from "axios";
import {
  ApartmentResponse,
  CreateApartement,
  UpdateApartment,
} from "immo-interface";
import { http } from "../http";

const BASE_URL = "/api/apartment";

function getAllApartment(): Promise<AxiosResponse<ApartmentResponse[]>> {
  return http.get<ApartmentResponse[]>(BASE_URL);
}

function updateApartment(data: UpdateApartment): Promise<AxiosResponse> {
  return http.put(BASE_URL, data);
}

function saveApartment(data: CreateApartement): Promise<AxiosResponse> {
  return http.post(BASE_URL, data);
}

function deleteApartment(id: string): Promise<AxiosResponse> {
  return http.delete(BASE_URL + "/" + id);
}

export { getAllApartment, updateApartment, deleteApartment, saveApartment };
