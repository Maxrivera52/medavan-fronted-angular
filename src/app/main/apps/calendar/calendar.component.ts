import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
  ViewChild,
} from "@angular/core";

import { FormGroup } from "@angular/forms";
import dayjs from "dayjs";

import esLocale from "@fullcalendar/core/locales/es";
import { Subject, Subscription } from "rxjs";
import { switchMap, takeUntil } from "rxjs/operators";
import {
  CalendarOptions,
  EventClickArg,
  EventInput,
} from "@fullcalendar/angular";

import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { CoreConfigService } from "@core/services/config.service";

import { CalendarService } from "app/main/apps/calendar/calendar.service";
import { ICalendar } from './models/calendar.model';
import { id } from "@swimlane/ngx-datatable";
import { CalendarEventSidebarComponent } from "./calendar-sidebar/calendar-event-sidebar/calendar-event-sidebar.component";
import { EventResizeDoneArg } from "@fullcalendar/interaction";
import { CalendarMainSidebarComponent } from './calendar-sidebar/calendar-main-sidebar/calendar-main-sidebar.component';


@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent implements OnInit, AfterViewInit {
  @ViewChild(CalendarEventSidebarComponent)
  calendarSidebar: CalendarEventSidebarComponent;

  // Public
  formCalendar: FormGroup;
  idEvent: string | null;
  startDate: Date;
  endDate: Date;
  public isDataEmpty;

  public slideoutShow = false;
  public events = [];
  public event;

  public calendarOptions: CalendarOptions = {
    schedulerLicenseKey: "CC-Attribution-NonCommercial-NoDerivatives",
    eventResizableFromStart: false,
    timeZone: "local",
    headerToolbar: {
      left: "sidebarToggle, prev,next, title",
      end: "dayGridMonth,resourceTimeGridSevenDay,resourceTimeGridFourDay,resourceTimeGridOneDay,listMonth",
    },
    initialView: "resourceTimeGridFourDay",
    initialEvents: [...this.events],
    weekends: true,
    editable: true,
    droppable: true,
    datesAboveResources: true,
    selectable: true,
    selectMirror: true,
    
    allDaySlot: false,
    dayMaxEvents: 1,
    eventMaxStack: 1,
    navLinks: true,

    slotEventOverlap: false,
    dayMaxEventRows: true,
    scrollTimeReset: false,

    nowIndicator: true, 
    businessHours: {
      daysOfWeek: [ 1, 2, 3, 4, 5 ],
      startTime: '9:00',
      endTime: '18:00', 
    },

    locale: esLocale,
    eventClick: this.handleUpdateEventClick.bind(this),
    eventClassNames: this.eventClass.bind(this),
    select: this.handleDateSelect.bind(this),
    eventDrop: this.handleUpdateInDrop.bind(this),
    eventResize: this.handleUpdateInDrop.bind(this),
    filterResourcesWithEvents: false,

    // eventResize: this.handleUpdateEventClick.bind(this),
    // eventDrop: fun

    views: {
      resourceTimeGridSevenDay: {
        type: "resourceTimeGrid",
        duration: { days: 7 },
        buttonText: "Semana",
      },      
      resourceTimeGridFourDay: {
        type: "resourceTimeGrid",
        duration: { days: 4 },
        buttonText: "Grilla",
      },
      resourceTimeGridOneDay: {
        type: "resourceTimeGrid",
        duration: { days: 1 },
        buttonText: "Día",
      },
    },
    resources: [
      { id: "1", title: "Sala 01" },
      { id: "2", title: "Sala 02" },
    ],
    eventTimeFormat: {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    },
    events: [...this.events],
    
  };

  

  // Private
  private _unsubscribeAll: Subject<any>;
  private _subscription: Subscription;

  /**
   * Constructor
   *
   * @param {CoreSidebarService} _coreSidebarService
   * @param {CalendarService} _calendarService
   * @param {CoreConfigService} _coreConfigService
   */
  constructor(
    private _coreSidebarService: CoreSidebarService,
    private _calendarService: CalendarService,
    private _coreConfigService: CoreConfigService
  ) {
    this._unsubscribeAll = new Subject();
    this._subscription = new Subscription();
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Add Event Class
   *
   * @param
   */
  resetForm() {
    this.formCalendar.reset();
  }

  eventClass(s) {
    const calendarsColor = {
      Business: "primary",
      Holiday: "success",
      Personal: "danger",
      Family: "warning",
      ETC: "info",
    };

    const colorName = calendarsColor[s.event._def.extendedProps.calendar];
    return `bg-light-${colorName}`;
  }

  /**
   * Update Event
   *
   * @param eventRef
   */
  handleUpdateEventClick(eventRef: EventClickArg) {
    this._coreSidebarService
      .getSidebarRegistry("calendar-event-sidebar")
      .toggleOpen();
    this._calendarService.onCurrentEventChange$.next(eventRef);
  }

  handleUpdateInDrop(eventRef: any) {
    // if (confirm("¿Confirmar cambio de horario de la cita?")) {
    //   this.calendarSidebar.updateOnDrop(eventRef, eventRef?.newResource?.id || eventRef.event.extendedProps.resourceId);
    // }
    this.calendarSidebar.updateOnDrop(eventRef, eventRef?.newResource?.id || eventRef.event.extendedProps.resourceId);
  }

  resetValues(): void {
    this.startDate = new Date();
    this.endDate = new Date();
    this.idEvent = null;
    this.isDataEmpty = true;
  }

  /**
   * Toggle the sidebar
   *
   * @param name
   */
  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  toggleEventSidebar() {
    this.resetValues();
    this._coreSidebarService
      .getSidebarRegistry("calendar-event-sidebar")
      .toggleOpen();
  }

  /**
   * Date select Event
   *
   * @param eventRef
   */
  handleDateSelect(eventRef) {

    this.resetValues();
    this._coreSidebarService.getSidebarRegistry("calendar-event-sidebar").toggleOpen();
    this._calendarService.onCurrentEventChange$.next({
      ...eventRef,
      extendedProps: null,
    });
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {

    const eventChangeSubscription = this._calendarService.onEventChange
      .pipe(switchMap(() => this._calendarService.getMedicalEvents()))
      .subscribe({
        next: (response) => {
          const events: EventInput[] = response.data.map(
            (event: ICalendar): EventInput => ({
              id: event.id.toString(),
              title: event.title,
              start: new Date(event.start).toISOString(),
              end: new Date(event.end).toISOString(),
              resourceId: event.resourceId,
              className: event.resourceId == "1" ? "bg-light-success" : "bg-light-info",
              extendedProps: {
                ...event,
              },
              //calendar: event.extendedProps.calendar,
            })
          );          
          this.calendarOptions.events = [...events];
          this.events = events;
        },
      });

      // const eventChangeSubscriptionSala = this._calendarService.onEventChange
      // .pipe(switchMap(() => this._calendarService.getMedicalEventsForSala(this.event)))
      // .subscribe({
      //   next: (response) => {
      //     const events: EventInput[] = response.data.map(
      //       (event: ICalendar): EventInput => ({
      //         id: event.id.toString(),
      //         title: event.title,
      //         start: new Date(event.start).toISOString(),
      //         end: new Date(event.end).toISOString(),
      //         resourceId: event.resourceId,
      //         className: event.resourceId == "1" ? "bg-light-success" : "bg-light-info",
      //         extendedProps: {
      //           ...event,
      //         },
      //         //calendar: event.extendedProps.calendar,
      //       })
      //     );          
      //     this.calendarOptions.events = [...events];
      //     this.events = events;
      //   },
      // });

    this._calendarService.onEventChange.next();

    const onCurrentEventChangeSubscription =
      this._calendarService.onCurrentEventChange$.subscribe((res) => {
        this.event = res;
      });

    this._subscription.add(eventChangeSubscription);
    // this._subscription.add(eventChangeSubscriptionSala);
    this._subscription.add(onCurrentEventChangeSubscription);
  }

  /**
   * Calendar's custom button on click toggle sidebar
   */
  ngAfterViewInit() {
    // Store this to _this as we need it on click event to call toggleSidebar
    let _this = this;    
    this.calendarOptions.customButtons = {
      sidebarToggle: {
        text: "",
        click() {
          _this.toggleSidebar("calendar-main-sidebar");
        },
      },
    };
  }
}
