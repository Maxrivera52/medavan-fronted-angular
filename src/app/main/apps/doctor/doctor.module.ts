import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { TranslateModule } from '@ngx-translate/core';

import { CoreCommonModule } from '@core/common.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { CoreSidebarModule } from '@core/components';

import { InvoiceListService } from 'app/main/apps/invoice/invoice-list/invoice-list.service';
import { InvoiceModule } from 'app/main/apps/invoice/invoice.module';

import { DoctorEditComponent } from 'app/main/apps/doctor/doctor-edit/doctor-edit.component';
import { DoctorEditService } from 'app/main/apps/doctor/doctor-edit/doctor-edit.service';

import { DoctorListComponent } from 'app/main/apps/doctor/doctor-list/doctor-list.component';
import { DoctorListService } from 'app/main/apps/doctor/doctor-list/doctor-list.service';

import { DoctorViewComponent } from 'app/main/apps/doctor/doctor-view/doctor-view.component';
import { DoctorViewService } from 'app/main/apps/doctor/doctor-view/doctor-view.service';
import { NewDoctorSidebarComponent } from 'app/main/apps/doctor/doctor-list/new-doctor-sidebar/new-doctor-sidebar.component';

// routing
const routes: Routes = [
  {
    path: 'doctor-list',
    component: DoctorListComponent,
    resolve: {
      uls: DoctorListService
    },
    data: { animation: 'DoctorListComponent' }
  },
  {
    path: 'doctor-view/:id',
    component: DoctorViewComponent,
    resolve: {
      data: DoctorViewService,
      InvoiceListService
    },
    data: { path: 'view/:id', animation: 'DoctorViewComponent' }
  },
  {
    path: 'doctor-edit/:id',
    component: DoctorEditComponent,
    resolve: {
      ues: DoctorEditService
    },
    data: { animation: 'DoctorEditComponent' }
  },
  {
    path: 'doctor-view',
    redirectTo: '/apps/doctor/doctor-view/2' // Redirection
  },
  {
    path: 'doctor-edit',
    redirectTo: '/apps/doctor/doctor-edit/2' // Redirection
  }
];

@NgModule({
  declarations: [DoctorListComponent, DoctorViewComponent, DoctorEditComponent, NewDoctorSidebarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreCommonModule,
    FormsModule,
    NgbModule,
    NgSelectModule,
    Ng2FlatpickrModule,
    NgxDatatableModule,
    CorePipesModule,
    CoreDirectivesModule,
    InvoiceModule,
    CoreSidebarModule,
    TranslateModule
  ],
  providers: [DoctorListService, DoctorViewService, DoctorEditService]
})
export class DoctorModule {}
