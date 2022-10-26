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

import { SedeEditComponent } from "app/main/apps/sede/sede-edit/sede-edit.component";
import { SedeEditService } from "app/main/apps/sede/sede-edit/sede-edit.service";

import { SedeListComponent } from "app/main/apps/sede/sede-list/sede-list.component";

import { SedeViewComponent } from "app/main/apps/sede/sede-view/sede-view.component";
import { SedeViewService } from "app/main/apps/sede/sede-view/sede-view.service";
import { NewSedeSidebarComponent } from "app/main/apps/sede/sede-list/new-sede-sidebar/new-sede-sidebar.component";

// routing
const routes: Routes = [
  {
    path: "sede-list",
    component: SedeListComponent,
    data: { animation: "SedeListComponent" },
  },
  {
    path: "sede-view/:id",
    component: SedeViewComponent,
    resolve: {
      data: SedeViewService,
      InvoiceListService,
    },
    data: { path: "view/:id", animation: "SedeViewComponent" },
  },
  {
    path: "sede-edit/:id",
    component: SedeEditComponent,
    resolve: {
      ues: SedeEditService,
    },
    data: { animation: "SedeEditComponent" },
  },
  {
    path: "sede-view",
    redirectTo: "/apps/sede/sede-view/2", // Redirection
  },
  {
    path: "sede-edit",
    redirectTo: "/apps/sede/sede-edit/2", // Redirection
  },
];

@NgModule({
  declarations: [
    SedeListComponent,
    SedeViewComponent,
    SedeEditComponent,
    NewSedeSidebarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreCommonModule,
    FormsModule,
    ReactiveFormsModule,
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
  providers: [SedeViewService, SedeEditService],
})
export class SedeModule {}
