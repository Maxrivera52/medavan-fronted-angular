import { IPatient, IPatientResponse } from "../models/patient.model";

export const patientAdapter = (
  patientAdapter: IPatientResponse
): IPatient => ({
  idPatient: patientAdapter.idpatient,
  iddocumentType: patientAdapter.iddocument_type,
  documentNumber: patientAdapter.document_number,
  firstName: patientAdapter.first_name,
  lastName: patientAdapter.last_name,
  age: patientAdapter.age,
  enable: patientAdapter.enable,
  createdAt: patientAdapter.created_at,
  updatedAt: patientAdapter.updated_at,
  documenttype:{
    description:patientAdapter.documenttype?.description
  }
});
