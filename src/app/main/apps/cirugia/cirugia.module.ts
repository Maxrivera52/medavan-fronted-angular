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

import { CirugiaEditComponent } from 'app/main/apps/cirugia/cirugia-edit/cirugia-edit.component';
import { CirugiaEditService } from 'app/main/apps/cirugia/cirugia-edit/cirugia-edit.service';

import { CirugiaListComponent } from 'app/main/apps/cirugia/cirugia-list/cirugia-list.component';
import { CirugiaListService } from 'app/main/apps/cirugia/cirugia-list/cirugia-list.service';

import { CirugiaViewComponent } from 'app/main/apps/cirugia/cirugia-view/cirugia-view.component';
import { CirugiaViewService } from 'app/main/apps/cirugia/cirugia-view/cirugia-view.service';
import { NewCirugiaSidebarComponent } from 'app/main/apps/cirugia/cirugia-list/new-cirugia-sidebar/new-cirugia-sidebar.component';
import { ModalCirdetanesthComponent } from './cirugia-list/modal-cirdetanesth/modal-cirdetanesth.component';

// routing
const routes: Routes = [
  {
    path: 'cirugia-list',
    component: CirugiaListComponent,
    resolve: {
      uls: CirugiaListService
    },
    data: { animation: 'CirugiaListComponent' }
  },
  {
    path: 'cirugia-view/:id',
    component: CirugiaViewComponent,
    resolve: {
      data: CirugiaViewService,
      InvoiceListService
    },
    data: { path: 'view/:id', animation: 'CirugiaViewComponent' }
  },
  {
    path: 'cirugia-edit/:id',
    component: CirugiaEditComponent,
    resolve: {
      ues: CirugiaEditService
    },
    data: { animation: 'CirugiaEditComponent' }
  },
  {
    path: 'cirugia-view',
    redirectTo: '/apps/cirugia/cirugia-view/2' // Redirection
  },
  {
    path: 'cirugia-edit',
    redirectTo: '/apps/cirugia/cirugia-edit/2' // Redirection
  }
];

@NgModule({
  declarations: [CirugiaListComponent, CirugiaViewComponent, CirugiaEditComponent, NewCirugiaSidebarComponent, ModalCirdetanesthComponent],
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
  providers: [CirugiaListService, CirugiaViewService, CirugiaEditService]
})
export class CirugiaModule {}
