import { ISede, ISedeResponse } from "../models/sede.model";

export const sedeAdapter = (
  sedeResponse: ISedeResponse
): ISede => ({
  idSede: sedeResponse.idsede,
  description: sedeResponse.description,
  sala: sedeResponse.sala,
  cuartos: sedeResponse.cuartos,
  cubiculos: sedeResponse.cubiculos,
  color: sedeResponse.color,
  enable: sedeResponse.enable,
  createdAt: sedeResponse.created_at,
  updatedAt: sedeResponse.updated_at,
});
