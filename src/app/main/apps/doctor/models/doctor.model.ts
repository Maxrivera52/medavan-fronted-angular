export interface IDoctorPost {
  cmp: number;
  iddocument_type: number;
  document_number: number;
  birthday_day: string;
  birthday_mounth: string;
  first_lastname: string;
  second_lastname: string;
  name: string;
  email: string;
  cellphone: string;
  phone_contact: string;
  idspecialty: string;
}

export interface IDoctorPut extends IDoctorPost {
  id: number;
}

export interface IDoctor {
  idDoctor: number;
  cmp: number;
  iddocumentType: number;
  documentNumber: number;
  birthdayDay: string;
  birthdayMounth: string;
  firstLastname: string;
  secondLastname: string;
  name: string;
  email: string;
  cellphone: string;
  phoneContact: string;
  idspecialty: string;
  enable: number;
  createdAt: Date;
  updatedAt: Date;
  documenttype:IDocumenttype;
  specialty:IDocumenttype;
}

export interface IDoctorResponse {
  iddoctor: number;
  cmp: number;
  iddocument_type: number;
  document_number: number;
  birthday_day: string;
  birthday_mounth: string;
  first_lastname: string;
  second_lastname: string;
  name: string;
  email: string;
  cellphone: string;
  phone_contact: string;
  idspecialty: string;
  enable: number;
  created_at: Date;
  updated_at: Date;
  documenttype?:IDocumenttype;
  specialty?:IDocumenttype;
}

export interface IDocumenttype {
  description?: string;
}
export interface ISpecialty {
  description?: string;
}