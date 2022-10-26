import { ISpecialty, ISpecialtyResponse } from "../models/specialty.model";

export const specialtyAdapter = (
  specialtyResponse: ISpecialtyResponse
): ISpecialty => ({
  idSpecialty: specialtyResponse.idspecialty,
  description: specialtyResponse.description,
  enable: specialtyResponse.enable,
  createdAt: specialtyResponse.created_at,
  updatedAt: specialtyResponse.updated_at,
});
