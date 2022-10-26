import { 
  Component, 
  OnInit, 
  AfterViewInit,
  ViewEncapsulation
 } from '@angular/core';

import esLocale from "@fullcalendar/core/locales/es";
import { Subject, Subscription } from "rxjs";
import { switchMap, takeUntil } from "rxjs/operators";
import {
  CalendarOptions,
  EventClickArg,
  EventInput,
} from "@fullcalendar/angular";

@Component({
  selector: 'app-parrilla',
  templateUrl: './parrilla.component.html',
  styleUrls: ["./parrilla.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ParrillaComponent implements OnInit {
  // Public
  public contentHeader: object;
  public isReload = false;


  public calendarOptions: CalendarOptions = {
    schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
    timeZone: 'UTC-5',
    initialView: 'resourceTimeGridFourDay',
    datesAboveResources: true,
    editable: true, // enable draggable events
    aspectRatio: 1.8,
    scrollTime: '00:00',
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'resourceTimeGridDay,resourceTimeGridFourDay'
    },
    locale: esLocale,
    eventResizableFromStart: true,
    views: {
      resourceTimeGridFourDay: {
        type: 'resourceTimeGrid',
        duration: { days: 4 },
        buttonText: '4 days'
      }
    },
    resources: [

      { id: 'd1', title: 'Sala 01' },
      { id: 'd2', title: 'Sala 02' }

    ],
    events: 'https://fullcalendar.io/api/demo-feeds/events.json?with-resources=2'
  };

  // Private
  private _unsubscribeAll: Subject<any>;
  private _subscription: Subscription;

  constructor() {}

  // /**
  //  * Emitted Events
  //  *
  //  * @param $event
  //  */
  // emittedEvents($event) {
  //   console.log('Action : ', $event);
  // }

  // /**
  //  * Reload
  //  *
  //  * @param $event
  //  */
  // reload($event) {
  //   // This is fake API call example for reload
  //   if ($event === 'reload') {
  //     console.log($event, ': Start');
  //     this.isReload = true;
  //     setTimeout(() => {
  //       this.isReload = false;
  //       console.log($event, ': End');
  //     }, 5000);
  //   }
  // }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    // content header
    this.contentHeader = {
      headerTitle: 'Card Actions',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
          {
            name: 'Cards',
            isLink: true,
            link: '/'
          },
          {
            name: 'Card Actions ',
            isLink: false
          }
        ]
      }
    };
  }
}
