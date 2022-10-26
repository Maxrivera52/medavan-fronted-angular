import { IAnesthesia, IAnesthesiaResponse } from "../models/anesthesia.model";

export const anesthesiaAdapter = (
  anesthesiaResponse: IAnesthesiaResponse
): IAnesthesia => ({
  idAnesthesia: anesthesiaResponse.idanesthesia,
  description: anesthesiaResponse.description,
  enable: anesthesiaResponse.enable,
  createdAt: anesthesiaResponse.created_at,
  updatedAt: anesthesiaResponse.updated_at,
});
