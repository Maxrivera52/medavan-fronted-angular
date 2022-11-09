import { ICirugia, ICirugiaResponse } from "../models/cirugia.model";

export const cirugiaAdapter = (
  cirugiaResponse: ICirugiaResponse
): ICirugia => ({
  idCirugia:cirugiaResponse.idcirugia,
  description: cirugiaResponse.description,
  //idSpecialty: cirugiaResponse.idspecialty,
  enable: cirugiaResponse.enable,
  createdAt: cirugiaResponse.created_at,
  updatedAt: cirugiaResponse.updated_at,
/*
  specialty:{
    description:cirugiaResponse.specialty?.description
  }
  */
});
