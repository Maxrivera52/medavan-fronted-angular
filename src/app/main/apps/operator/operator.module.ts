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

import { OperatorEditComponent } from "app/main/apps/operator/operator-edit/operator-edit.component";
import { OperatorEditService } from "app/main/apps/operator/operator-edit/operator-edit.service";

import { OperatorListComponent } from "app/main/apps/operator/operator-list/operator-list.component";

import { OperatorViewComponent } from "app/main/apps/operator/operator-view/operator-view.component";
import { OperatorViewService } from "app/main/apps/operator/operator-view/operator-view.service";
import { NewOperatorSidebarComponent } from "app/main/apps/operator/operator-list/new-operator-sidebar/new-operator-sidebar.component";

// routing
const routes: Routes = [
  {
    path: "operator-list",
    component: OperatorListComponent,
    data: { animation: "OperatorListComponent" },
  },
  {
    path: "operator-view/:id",
    component: OperatorViewComponent,
    resolve: {
      data: OperatorViewService,
      InvoiceListService,
    },
    data: { path: "view/:id", animation: "OperatorViewComponent" },
  },
  {
    path: "operator-edit/:id",
    component: OperatorEditComponent,
    resolve: {
      ues: OperatorEditService,
    },
    data: { animation: "OperatorEditComponent" },
  },
  {
    path: "operator-view",
    redirectTo: "/apps/operator/operator-view/2", // Redirection
  },
  {
    path: "operator-edit",
    redirectTo: "/apps/operator/operator-edit/2", // Redirection
  },
];

@NgModule({
  declarations: [
    OperatorListComponent,
    OperatorViewComponent,
    OperatorEditComponent,
    NewOperatorSidebarComponent,
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
  providers: [OperatorViewService, OperatorEditService],
})
export class OperatorModule {}
