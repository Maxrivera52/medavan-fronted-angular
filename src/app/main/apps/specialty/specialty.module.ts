import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { Ng2FlatpickrModule } from "ng2-flatpickr";
import { TranslateModule } from "@ngx-translate/core";

import { CoreCommonModule } from "@core/common.module";
import { CoreDirectivesModule } from "@core/directives/directives";
import { CorePipesModule } from "@core/pipes/pipes.module";
import { CoreSidebarModule } from "@core/components";

import { InvoiceListService } from "app/main/apps/invoice/invoice-list/invoice-list.service";
import { InvoiceModule } from "app/main/apps/invoice/invoice.module";

import { SpecialtyEditComponent } from "app/main/apps/specialty/specialty-edit/specialty-edit.component";
import { SpecialtyEditService } from "app/main/apps/specialty/specialty-edit/specialty-edit.service";

import { SpecialtyListComponent } from "app/main/apps/specialty/specialty-list/specialty-list.component";

import { SpecialtyViewComponent } from "app/main/apps/specialty/specialty-view/specialty-view.component";
import { SpecialtyViewService } from "app/main/apps/specialty/specialty-view/specialty-view.service";
import { NewSpecialtySidebarComponent } from "app/main/apps/specialty/specialty-list/new-specialty-sidebar/new-specialty-sidebar.component";

// routing
const routes: Routes = [
  {
    path: "specialty-list",
    component: SpecialtyListComponent,
    data: { animation: "SpecialtyListComponent" },
  },
  {
    path: "specialty-view/:id",
    component: SpecialtyViewComponent,
    resolve: {
      data: SpecialtyViewService,
      InvoiceListService,
    },
    data: { path: "view/:id", animation: "SpecialtyViewComponent" },
  },
  {
    path: "specialty-edit/:id",
    component: SpecialtyEditComponent,
    resolve: {
      ues: SpecialtyEditService,
    },
    data: { animation: "SpecialtyEditComponent" },
  },
  {
    path: "specialty-view",
    redirectTo: "/apps/specialty/specialty-view/2", // Redirection
  },
  {
    path: "specialty-edit",
    redirectTo: "/apps/specialty/specialty-edit/2", // Redirection
  },
];

@NgModule({
  declarations: [
    SpecialtyListComponent,
    SpecialtyViewComponent,
    SpecialtyEditComponent,
    NewSpecialtySidebarComponent,
  ],
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
    TranslateModule,
  ],
  providers: [SpecialtyViewService, SpecialtyEditService],
})
export class SpecialtyModule {}
