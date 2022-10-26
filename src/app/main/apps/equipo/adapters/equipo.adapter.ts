import { IEquipo, IEquipoResponse } from "../models/equipo.model";

export const equipoAdapter = (
  equipoResponse: IEquipoResponse
): IEquipo => ({
  idEquipment: equipoResponse.idequipment,
  name: equipoResponse.name,
  description: equipoResponse.description,
  quantity: equipoResponse.quantity,
  enable: equipoResponse.enable,
  createdAt: equipoResponse.created_at,
  updatedAt: equipoResponse.updated_at,
});
