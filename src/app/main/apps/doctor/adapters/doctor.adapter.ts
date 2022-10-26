import { IDoctor, IDoctorResponse } from "../models/doctor.model";

export const doctorAdapter = (
  doctorResponse: IDoctorResponse
): IDoctor => ({
  idDoctor:doctorResponse.iddoctor,
  cmp:doctorResponse.cmp,
  iddocumentType:doctorResponse.iddocument_type,
  documentNumber:doctorResponse.document_number,
  birthdayDay: doctorResponse.birthday_day,
  birthdayMounth: doctorResponse.birthday_mounth,
  firstLastname:doctorResponse.first_lastname,
  secondLastname:doctorResponse.second_lastname,
  name:doctorResponse.name,
  email:doctorResponse.email,
  cellphone:doctorResponse.cellphone,
  phoneContact:doctorResponse.phone_contact,
  idspecialty:doctorResponse.idspecialty,
  enable:doctorResponse.enable,
  createdAt:doctorResponse.created_at,
  updatedAt:doctorResponse.updated_at,
  documenttype:{
    description:doctorResponse.documenttype?.description
  },
  specialty:{
    description:doctorResponse.specialty?.description
  }
});
