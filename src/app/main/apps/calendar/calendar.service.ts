import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";

import { environment } from "environments/environment";
import {
  ICalendar,
  ICalendarPost,
  ICalendarPut,
  ICalendarResponse,
} from "./models/calendar.model";
import { IResponseGetList } from "@core/models/response-http.model";
import { delay, map } from "rxjs/operators";
import { calendarAdapter } from "../calendar/adapters/calendar.adapter";
import { BehaviorSubject, Observable, of, Subject } from "rxjs";
import { EventClickArg } from "@fullcalendar/angular";

@Injectable({
  providedIn: "root",
})
export class CalendarService implements Resolve<any> {
  // Public
  public events;
  public calendar;
  public currentEvent;
  public tempEvents;

  public rows: any;
  public onEventChange: Subject<void>;
  public onCurrentEventChange$: BehaviorSubject<EventClickArg | null>;
  public onCalendarChange: BehaviorSubject<any>;
  public calendarSelected$: Subject<ICalendar>;
  public changeList$: Subject<void>;

  private _url: string;

  constructor(private _httpClient: HttpClient) {
    this._url = environment.apiUrl;
    this.calendarSelected$ = new Subject();
    this.changeList$ = new Subject();
    //defaults
    this.onEventChange = new Subject();
    this.onCurrentEventChange$ = new BehaviorSubject(null);
    this.onCalendarChange = new BehaviorSubject({});
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    throw new Error("Method not implemented.");
  }

  /*   resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([this.getEvents(), this.getCalendar()]).then((res) => {
        resolve(res);
      }, reject);
    });
  } */

  createMedicalEvent(medicalevent: ICalendarPost): Observable<ICalendar> {
    return this._httpClient.post<ICalendar>(
      `${this._url}/medicalevent`,
      medicalevent
    );
  }

  editMedicalEvent(medicalevent: ICalendarPost): Observable<ICalendar> {
    console.log(medicalevent)
    let res = this._httpClient.put<ICalendar>(
      `${this._url}/medicalevent/${medicalevent.id}`,
      medicalevent
    )
    //res.subscribe(x=>console.log(x))
    return res
  }

  getMedicalEvents(): Observable<IResponseGetList<ICalendar>> {
    this._httpClient.get(`${this._url}/medicalevent`).subscribe(x=>console.log(x))
    return this._httpClient
      .get<IResponseGetList<ICalendarResponse>>(`${this._url}/medicalevent`)
      .pipe(
        map(
          (
            response: IResponseGetList<ICalendarResponse>
          ): IResponseGetList<ICalendar> => ({
            count: response.count,
            data: response.data.map((events) => calendarAdapter(events)),
          })
        )
      );
  }

  getMedicalEventsForSala(medicalevent: ICalendarPost): Observable<IResponseGetList<ICalendar>> {
    return this._httpClient
      .get<IResponseGetList<ICalendarResponse>>(`${this._url}/medicalevent-sala/${medicalevent.calendar}`)
      .pipe(
        map(
          (
            response: IResponseGetList<ICalendarResponse>
          ): IResponseGetList<ICalendar> => ({
            count: response.count,
            data: response.data.map((events) => calendarAdapter(events)),
          })
        )
      );
  }

  
  /*  


  getCalendar(): Promise<any[]> {
    const url = `api/calendar-filter`;

    return new Promise((resolve, reject) => {
      this._httpClient.get(url).subscribe((response: any) => {
        this.calendar = response;
        this.onCalendarChange.next(this.calendar);
        resolve(this.calendar);
      }, reject);
    });
  }


  createNewEvent() {
    this.currentEvent = {};
    this.onCurrentEventChange.next(this.currentEvent);
  }


  calendarUpdate(calendars) {
    const calendarsChecked = calendars.filter((calendar) => {
      return calendar.checked === true;
    });

    let calendarRef = [];
    calendarsChecked.map((res) => {
      calendarRef.push(res.filter);
    });

    let filteredCalendar = this.tempEvents.filter((event) =>
      calendarRef.includes(event.calendar)
    );
    this.events = filteredCalendar;
    this.onEventChange.next(this.events);
  }


  deleteEvent(event) {
    return new Promise((resolve, reject) => {
      this._httpClient
        .delete("api/calendar-events/" + event.id)
        .subscribe((response) => {
          this.getEvents();
          resolve(response);
        }, reject);
    });
  }


  addEvent(eventForm) {
    const newEvent = new EventRef();
    newEvent.url = eventForm.url;
    newEvent.title = eventForm.title;
    newEvent.start = eventForm.start;
    newEvent.end = eventForm.end;
    newEvent.allDay = eventForm.allDay;
    newEvent.calendar = eventForm.selectlabel;
    newEvent.extendedProps.location = eventForm.location;
    newEvent.extendedProps.description = eventForm.description;
    newEvent.extendedProps.addGuest = eventForm.addGuest;
    this.currentEvent = newEvent;
    this.onCurrentEventChange.next(this.currentEvent);
    this.postNewEvent();
  }


  updateCurrentEvent(eventRef) {
    const newEvent = new EventRef();
    newEvent.allDay = eventRef.event.allDay;
    newEvent.id = parseInt(eventRef.event.id);
    newEvent.url = eventRef.event.url;
    newEvent.title = eventRef.event.title;
    newEvent.start = eventRef.event.start;
    newEvent.end = eventRef.event.end;
    newEvent.calendar = eventRef.event.extendedProps.calendar;
    newEvent.extendedProps.location = eventRef.event.extendedProps.location;
    newEvent.extendedProps.description =
      eventRef.event.extendedProps.description;
    newEvent.extendedProps.addGuest = eventRef.event.extendedProps.addGuest;
    this.currentEvent = newEvent;
    this.onCurrentEventChange.next(this.currentEvent);
  }


  postNewEvent() {
    return new Promise((resolve, reject) => {
      this._httpClient
        .post("api/calendar-events/", this.currentEvent)
        .subscribe((response) => {
          this.getEvents();
          resolve(response);
        }, reject);
    });
  }


  postUpdatedEvent(event) {
    return new Promise((resolve, reject) => {
      this._httpClient
        .post("api/calendar-events/" + event.id, { ...event })
        .subscribe((response) => {
          this.getEvents();
          resolve(response);
        }, reject);
    });
  } */
}
