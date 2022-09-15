import { AxiosResponse } from "axios";
import { ApartmentResponse, UpdateApartment } from "immo-interface";
import { http, setHeader } from "../http";

function getAllApartment(
  token: string
): Promise<AxiosResponse<ApartmentResponse[]>> {
  return http.get<ApartmentResponse[]>("/api/apartment", setHeader(token));
}

function updateApartment(
  token: string,
  data: UpdateApartment
): Promise<AxiosResponse> {
  return http.put("/api/apartment", data, setHeader(token));
}

function deleteApartment(token: string, id: string): Promise<AxiosResponse> {
  return http.delete("/api/apartement/" + id, setHeader(token));
}
export { getAllApartment, updateApartment, deleteApartment };
