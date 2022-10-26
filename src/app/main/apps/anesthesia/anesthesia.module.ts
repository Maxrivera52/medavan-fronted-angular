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

import { AnesthesiaEditComponent } from 'app/main/apps/anesthesia/anesthesia-edit/anesthesia-edit.component';
import { AnesthesiaEditService } from 'app/main/apps/anesthesia/anesthesia-edit/anesthesia-edit.service';

import { AnesthesiaListComponent } from 'app/main/apps/anesthesia/anesthesia-list/anesthesia-list.component';
import { AnesthesiaListService } from 'app/main/apps/anesthesia/anesthesia-list/anesthesia-list.service';

import { AnesthesiaViewComponent } from 'app/main/apps/anesthesia/anesthesia-view/anesthesia-view.component';
import { AnesthesiaViewService } from 'app/main/apps/anesthesia/anesthesia-view/anesthesia-view.service';
import { NewAnesthesiaSidebarComponent } from 'app/main/apps/anesthesia/anesthesia-list/new-anesthesia-sidebar/new-anesthesia-sidebar.component';

// routing
const routes: Routes = [
  {
    path: 'anesthesia-list',
    component: AnesthesiaListComponent,
    resolve: {
      uls: AnesthesiaListService
    },
    data: { animation: 'AnesthesiaListComponent' }
  },
  {
    path: 'anesthesia-view/:id',
    component: AnesthesiaViewComponent,
    resolve: {
      data: AnesthesiaViewService,
      InvoiceListService
    },
    data: { path: 'view/:id', animation: 'AnesthesiaViewComponent' }
  },
  {
    path: 'anesthesia-edit/:id',
    component: AnesthesiaEditComponent,
    resolve: {
      ues: AnesthesiaEditService
    },
    data: { animation: 'AnesthesiaEditComponent' }
  },
  {
    path: 'anesthesia-view',
    redirectTo: '/apps/anesthesia/anesthesia-view/2' // Redirection
  },
  {
    path: 'anesthesia-edit',
    redirectTo: '/apps/anesthesia/anesthesia-edit/2' // Redirection
  }
];

@NgModule({
  declarations: [AnesthesiaListComponent, AnesthesiaViewComponent, AnesthesiaEditComponent, NewAnesthesiaSidebarComponent],
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
  providers: [AnesthesiaListService, AnesthesiaViewService, AnesthesiaEditService]
})
export class AnesthesiaModule {}
