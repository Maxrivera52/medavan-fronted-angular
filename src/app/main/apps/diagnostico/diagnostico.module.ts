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

import { DiagnosticoEditComponent } from 'app/main/apps/diagnostico/diagnostico-edit/diagnostico-edit.component';
import { DiagnosticoEditService } from 'app/main/apps/diagnostico/diagnostico-edit/diagnostico-edit.service';

import { DiagnosticoListComponent } from 'app/main/apps/diagnostico/diagnostico-list/diagnostico-list.component';
import { DiagnosticoListService } from 'app/main/apps/diagnostico/diagnostico-list/diagnostico-list.service';

import { DiagnosticoViewComponent } from 'app/main/apps/diagnostico/diagnostico-view/diagnostico-view.component';
import { DiagnosticoViewService } from 'app/main/apps/diagnostico/diagnostico-view/diagnostico-view.service';
import { NewDiagnosticoSidebarComponent } from 'app/main/apps/diagnostico/diagnostico-list/new-diagnostico-sidebar/new-diagnostico-sidebar.component';
import { ModalServdetspecComponent } from './diagnostico-list/modal-servdetspec/modal-servdetspec.component';

// routing
const routes: Routes = [
  {
    path: 'diagnostico-list',
    component: DiagnosticoListComponent,
    resolve: {
      uls: DiagnosticoListService
    },
    data: { animation: 'DiagnosticoListComponent' }
  },
  {
    path: 'diagnostico-view/:id',
    component: DiagnosticoViewComponent,
    resolve: {
      data: DiagnosticoViewService,
      InvoiceListService
    },
    data: { path: 'view/:id', animation: 'DiagnosticoViewComponent' }
  },
  {
    path: 'diagnostico-edit/:id',
    component: DiagnosticoEditComponent,
    resolve: {
      ues: DiagnosticoEditService
    },
    data: { animation: 'DiagnosticoEditComponent' }
  },
  {
    path: 'diagnostico-view',
    redirectTo: '/apps/diagnostico/diagnostico-view/2' // Redirection
  },
  {
    path: 'diagnostico-edit',
    redirectTo: '/apps/diagnostico/diagnostico-edit/2' // Redirection
  }
];

@NgModule({
  declarations: [DiagnosticoListComponent, DiagnosticoViewComponent, DiagnosticoEditComponent, NewDiagnosticoSidebarComponent, ModalServdetspecComponent],
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
  providers: [DiagnosticoListService, DiagnosticoViewService, DiagnosticoEditService]
})
export class DiagnosticoModule {}
