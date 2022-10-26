import { IMaterial, IMaterialResponse } from "../models/material.model";

export const materialAdapter = (
  materialResponse: IMaterialResponse
): IMaterial => ({
  idMaterial: materialResponse.idmaterial,
  description: materialResponse.description,
  enable: materialResponse.enable,
  nameMaterial: materialResponse.name_material,
  createdAt: materialResponse.created_at,
  updatedAt: materialResponse.updated_at,
});
