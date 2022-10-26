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

import { EquipoEditComponent } from 'app/main/apps/equipo/equipo-edit/equipo-edit.component';
import { EquipoEditService } from 'app/main/apps/equipo/equipo-edit/equipo-edit.service';

import { EquipoListComponent } from 'app/main/apps/equipo/equipo-list/equipo-list.component';
import { EquipoListService } from 'app/main/apps/equipo/equipo-list/equipo-list.service';

import { EquipoViewComponent } from 'app/main/apps/equipo/equipo-view/equipo-view.component';
import { EquipoViewService } from 'app/main/apps/equipo/equipo-view/equipo-view.service';
import { NewEquipoSidebarComponent } from 'app/main/apps/equipo/equipo-list/new-equipo-sidebar/new-equipo-sidebar.component';

// routing
const routes: Routes = [
  {
    path: 'equipo-list',
    component: EquipoListComponent,
    resolve: {
      uls: EquipoListService
    },
    data: { animation: 'EquipoListComponent' }
  },
  {
    path: 'equipo-view/:id',
    component: EquipoViewComponent,
    resolve: {
      data: EquipoViewService,
      InvoiceListService
    },
    data: { path: 'view/:id', animation: 'EquipoViewComponent' }
  },
  {
    path: 'equipo-edit/:id',
    component: EquipoEditComponent,
    resolve: {
      ues: EquipoEditService
    },
    data: { animation: 'EquipoEditComponent' }
  },
  {
    path: 'equipo-view',
    redirectTo: '/apps/equipo/equipo-view/2' // Redirection
  },
  {
    path: 'equipo-edit',
    redirectTo: '/apps/equipo/equipo-edit/2' // Redirection
  }
];

@NgModule({
  declarations: [EquipoListComponent, EquipoViewComponent, EquipoEditComponent, NewEquipoSidebarComponent],
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
  providers: [EquipoListService, EquipoViewService, EquipoEditService]
})
export class EquipoModule {}
