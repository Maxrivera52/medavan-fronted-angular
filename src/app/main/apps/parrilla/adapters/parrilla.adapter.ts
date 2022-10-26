import { IParrilla, IParrillaResponse } from "../models/parrilla.model";

export const parrillaAdapter = (
  parrillaResponse: IParrillaResponse
): IParrilla => ({
  id: parrillaResponse.id,
  title: parrillaResponse.title,
  start: parrillaResponse.start,
  duration: parrillaResponse.duration,
  end: parrillaResponse.end,
  calendar: parrillaResponse.calendar,
  enable: parrillaResponse.enable,
  createdAt: parrillaResponse.created_at,
  updatedAt: parrillaResponse.updated_at,
  iddoctor:parrillaResponse.iddoctor,
  idcirugia:parrillaResponse.idcirugia,
  idanesthesia:parrillaResponse.idanesthesia,
  idpatient:parrillaResponse.idpatient,
  iddiagnostic:parrillaResponse.iddiagnostic,
  idsource:parrillaResponse.idsource,
  idmaterial:parrillaResponse.idmaterial,
  idequipment:parrillaResponse.idequipment,
  roomNumber:parrillaResponse.room_number,
  hospitalDays:parrillaResponse.hospital_days,
  observations:parrillaResponse.observations
});
