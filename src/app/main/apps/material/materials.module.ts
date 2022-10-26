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

import { MaterialEditComponent } from "app/main/apps/material/materials-edit/materials-edit.component";
import { MaterialEditService } from "app/main/apps/material/materials-edit/materials-edit.service";

import { MaterialListComponent } from "app/main/apps/material/materials-list/materials-list.component";

import { MaterialViewComponent } from "app/main/apps/material/materials-view/materials-view.component";
import { MaterialViewService } from "app/main/apps/material/materials-view/materials-view.service";
import { NewMaterialSidebarComponent } from "app/main/apps/material/materials-list/new-materials-sidebar/new-materials-sidebar.component";

// routing
const routes: Routes = [
  {
    path: "material-list",
    component: MaterialListComponent,
    data: { animation: "MaterialListComponent" },
  },
  {
    path: "material-view/:id",
    component: MaterialViewComponent,
    resolve: {
      data: MaterialViewService,
      InvoiceListService,
    },
    data: { path: "view/:id", animation: "MaterialViewComponent" },
  },
  {
    path: "material-edit/:id",
    component: MaterialEditComponent,
    resolve: {
      ues: MaterialEditService,
    },
    data: { animation: "MaterialEditComponent" },
  },
  {
    path: "material-view",
    redirectTo: "/apps/material/material-view/2", // Redirection
  },
  {
    path: "material-edit",
    redirectTo: "/apps/material/material-edit/2", // Redirection
  },
];

@NgModule({
  declarations: [
    MaterialListComponent,
    MaterialViewComponent,
    MaterialEditComponent,
    NewMaterialSidebarComponent,
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
  providers: [MaterialViewService, MaterialEditService],
})
export class MaterialModule {}
