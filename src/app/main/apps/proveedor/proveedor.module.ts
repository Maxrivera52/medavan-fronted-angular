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

import { ProveedorEditComponent } from "app/main/apps/proveedor/proveedor-edit/proveedor-edit.component";
import { ProveedorEditService } from "app/main/apps/proveedor/proveedor-edit/proveedor-edit.service";

import { ProveedorListComponent } from "app/main/apps/proveedor/proveedor-list/proveedor-list.component";

import { ProveedorViewComponent } from "app/main/apps/proveedor/proveedor-view/proveedor-view.component";
import { ProveedorViewService } from "app/main/apps/proveedor/proveedor-view/proveedor-view.service";
import { NewProveedorSidebarComponent } from "app/main/apps/proveedor/proveedor-list/new-proveedor-sidebar/new-proveedor-sidebar.component";

// routing
const routes: Routes = [
  {
    path: "proveedor-list",
    component: ProveedorListComponent,
    data: { animation: "ProveedorListComponent" },
  },
  {
    path: "proveedor-view/:id",
    component: ProveedorViewComponent,
    resolve: {
      data: ProveedorViewService,
      InvoiceListService,
    },
    data: { path: "view/:id", animation: "ProveedorViewComponent" },
  },
  {
    path: "proveedor-edit/:id",
    component: ProveedorEditComponent,
    resolve: {
      ues: ProveedorEditService,
    },
    data: { animation: "ProveedorEditComponent" },
  },
  {
    path: "proveedor-view",
    redirectTo: "/apps/proveedor/proveedor-view/2", // Redirection
  },
  {
    path: "proveedor-edit",
    redirectTo: "/apps/proveedor/proveedor-edit/2", // Redirection
  },
];

@NgModule({
  declarations: [
    ProveedorListComponent,
    ProveedorViewComponent,
    ProveedorEditComponent,
    NewProveedorSidebarComponent,
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
  providers: [ProveedorViewService, ProveedorEditService],
})
export class ProveedorModule {}
