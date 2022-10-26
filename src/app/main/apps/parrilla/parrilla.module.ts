import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from '@angular/router';

import { CoreCardModule } from '@core/components/core-card/core-card.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { Ng2FlatpickrModule } from "ng2-flatpickr";

import { CoreCommonModule } from "@core/common.module";
import { CoreSidebarModule } from "@core/components";

import { FullCalendarModule } from "@fullcalendar/angular";
import { Calendar } from '@fullcalendar/core';

import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';

import { ParrillaComponent } from 'app/main/apps/parrilla/parrilla.component';


FullCalendarModule.registerPlugins([
  resourceTimeGridPlugin,
]);

// routing
const routes: Routes = [
  {
    path: '',
    component: ParrillaComponent,
    data: { animation: 'parrilla' }
  }
];


@NgModule({
  declarations: [ParrillaComponent],
  imports: [
    CommonModule,
    FullCalendarModule,
    RouterModule.forChild(routes), 
    ContentHeaderModule, 
    CoreCardModule,
    CoreCommonModule,
    CoreSidebarModule,
    FormsModule,
    Ng2FlatpickrModule,
    NgSelectModule,
    NgbModule,
  ],
  providers: []
})
export class ParrillaModule {}
