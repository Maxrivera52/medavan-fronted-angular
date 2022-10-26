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

import { OriginEditComponent } from "app/main/apps/origin/origin-edit/origin-edit.component";
import { OriginEditService } from "app/main/apps/origin/origin-edit/origin-edit.service";

import { OriginListComponent } from "app/main/apps/origin/origin-list/origin-list.component";

import { OriginViewComponent } from "app/main/apps/origin/origin-view/origin-view.component";
import { OriginViewService } from "app/main/apps/origin/origin-view/origin-view.service";
import { NewOriginSidebarComponent } from "app/main/apps/origin/origin-list/new-origin-sidebar/new-origin-sidebar.component";

// routing
const routes: Routes = [
  {
    path: "origin-list",
    component: OriginListComponent,
    data: { animation: "OriginListComponent" },
  },
  {
    path: "origin-view/:id",
    component: OriginViewComponent,
    resolve: {
      data: OriginViewService,
      InvoiceListService,
    },
    data: { path: "view/:id", animation: "OriginViewComponent" },
  },
  {
    path: "origin-edit/:id",
    component: OriginEditComponent,
    resolve: {
      ues: OriginEditService,
    },
    data: { animation: "OriginEditComponent" },
  },
  {
    path: "origin-view",
    redirectTo: "/apps/origin/origin-view/2", // Redirection
  },
  {
    path: "origin-edit",
    redirectTo: "/apps/origin/origin-edit/2", // Redirection
  },
];

@NgModule({
  declarations: [
    OriginListComponent,
    OriginViewComponent,
    OriginEditComponent,
    NewOriginSidebarComponent,
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
  providers: [OriginViewService, OriginEditService],
})
export class OriginModule {}
