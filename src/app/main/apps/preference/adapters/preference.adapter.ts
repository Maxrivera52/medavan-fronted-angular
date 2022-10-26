import { IPreference, IPreferenceResponse } from "../models/preference.model";

export const preferenceAdapter = (
  preferenceResponse: IPreferenceResponse
): IPreference => ({
  idPreference: preferenceResponse.idpreference,
  description: preferenceResponse.description,
  value: preferenceResponse.value,
  enable: preferenceResponse.enable,
  createdAt: preferenceResponse.created_at,
  updatedAt: preferenceResponse.updated_at,
});
