import { ICalendar, ICalendarResponse } from "../models/calendar.model";

export const calendarAdapter = (
  calendarResponse: ICalendarResponse
): ICalendar => ({
  id: calendarResponse.id,
  title: calendarResponse.title,
  start: calendarResponse.start,
  duration: calendarResponse.duration,
  end: calendarResponse.end,
  calendar: calendarResponse.calendar,
  enable: calendarResponse.enable,
  createdAt: calendarResponse.created_at,
  updatedAt: calendarResponse.updated_at,
  iddoctor:calendarResponse.iddoctor,
  idcirugia:calendarResponse.idcirugia,
  idanesthesia:calendarResponse.idanesthesia,
  idpatient:calendarResponse.idpatient,
  iddiagnostic:calendarResponse.iddiagnostic,
  idsource:calendarResponse.idsource,
  idmaterial:calendarResponse.idmaterial,
  idequipment:calendarResponse.idequipment,
  resourceId:calendarResponse.resourceId,
  hospitalDays:calendarResponse.hospital_days,
  observations:calendarResponse.observations
});
