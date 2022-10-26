export interface IPatientPost {
  iddocument_type: number;
  document_number: number;
  first_name: string;
  last_name: string;
  age: string;
}

export interface IPatientPut extends IPatientPost {
    id: number;
}

export interface IPatient {
  idPatient: number;
  iddocumentType: string;
  documentNumber: string;
  firstName: string;
  lastName: string;
  age: string;
  enable: number;
  createdAt: Date;
  updatedAt: Date;
  documenttype:IDocumenttype
}

export interface IPatientResponse {
  idpatient: number;
  iddocument_type: string;
  document_number: string;
  first_name: string;
  last_name: string;
  email: string;
  age: string;
  enable: number;
  created_at: Date;
  updated_at: Date;
  documenttype:IDocumenttype
}

export interface IDocumenttype {
  description: string;
}