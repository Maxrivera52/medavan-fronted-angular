/* export class EventRef {
  id? = undefined;
  title: string = '';
  start: string;
  end: string;
  calendar: '';
 
} */

export interface ICalendarPost {
  id: number;
  title: string;
  start: string;
  duration: string;
  end: string;
  calendar: string;
  //doctor
  iddoctor: number;
  firstLastnamedoctor: string;
  secondLastnamedoctor: string;
  namedoctor: string;
  idspecialty: number;
  //paciente
  idpatient: number;
  firstnamepatient: string;
  lastnamepatient: string;
  agepacient: number;
  //cirugia
  idcirugia: number;
  descriptioncirugia:string;
  //anestesia
  idanesthesia: number;
  descriptionanesthesia:string;
  //diagnostico
  iddiagnostic: number;
  descriptiondiagnostic: string;
  //origen
  idsource: number;
  namesource:string;
  //material
  idmaterial: number;
  idequipment: number;
  descripcionmaterial: number;

  resourceId: string;
  hospital_days: string;
  observations: string;
}

export interface ICalendarPut extends ICalendarPost {
  id: number;
}

export interface ICalendar {
  id: number;
  title: string;
  start: string;
  duration: string;
  end: string;
  calendar: string;
  iddoctor: number;
  idcirugia: number;
  idanesthesia: number;
  idpatient: number;
  iddiagnostic: number;
  idsource: number;
  idmaterial: number;
  idequipment: number;
  resourceId: string;
  hospitalDays: string;
  observations: string;
  enable: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICalendarResponse {
  id: number;
  title: string;
  start: string;
  duration: string;
  end: string;
  calendar: string;
  iddoctor: number;
  idcirugia: number;
  idanesthesia: number;
  idpatient: number;
  iddiagnostic: number;
  idsource: number;
  idmaterial: number;
  idequipment: number;
  resourceId: string;
  hospital_days: string;
  observations: string;
  enable: number;
  created_at: Date;
  updated_at: Date;
}

