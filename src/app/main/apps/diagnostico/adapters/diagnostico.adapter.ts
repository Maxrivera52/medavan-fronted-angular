import { IDiagnostico, IDiagnosticoResponse } from "../models/diagnostico.model";

export const diagnosticoAdapter = (
  diagnosticoResponse: IDiagnosticoResponse
): IDiagnostico => ({
  idDiagnostic: diagnosticoResponse.iddiagnostic,
  description: diagnosticoResponse.description,
  //idSpecialty: diagnosticoResponse.idspecialty,
  enable: diagnosticoResponse.enable,
  createdAt: diagnosticoResponse.created_at,
  updatedAt: diagnosticoResponse.updated_at,
  /*
  specialty:{
    description: diagnosticoResponse.specialty?.description
  }
  */
});
