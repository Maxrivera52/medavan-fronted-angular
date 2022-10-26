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

import { PreferenceEditComponent } from "app/main/apps/preference/preference-edit/preference-edit.component";
import { PreferenceEditService } from "app/main/apps/preference/preference-edit/preference-edit.service";

import { PreferenceListComponent } from "app/main/apps/preference/preference-list/preference-list.component";

import { PreferenceViewComponent } from "app/main/apps/preference/preference-view/preference-view.component";
import { PreferenceViewService } from "app/main/apps/preference/preference-view/preference-view.service";
import { NewPreferenceSidebarComponent } from "app/main/apps/preference/preference-list/new-preference-sidebar/new-preference-sidebar.component";

// routing
const routes: Routes = [
  {
    path: "preference-list",
    component: PreferenceListComponent,
    data: { animation: "PreferenceListComponent" },
  },
  {
    path: "preference-view/:id",
    component: PreferenceViewComponent,
    resolve: {
      data: PreferenceViewService,
      InvoiceListService,
    },
    data: { path: "view/:id", animation: "PreferenceViewComponent" },
  },
  {
    path: "preference-edit/:id",
    component: PreferenceEditComponent,
    resolve: {
      ues: PreferenceEditService,
    },
    data: { animation: "PreferenceEditComponent" },
  },
  {
    path: "preference-view",
    redirectTo: "/apps/preference/preference-view/2", // Redirection
  },
  {
    path: "preference-edit",
    redirectTo: "/apps/preference/preference-edit/2", // Redirection
  },
];

@NgModule({
  declarations: [
    PreferenceListComponent,
    PreferenceViewComponent,
    PreferenceEditComponent,
    NewPreferenceSidebarComponent,
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
  providers: [PreferenceViewService, PreferenceEditService],
})
export class PreferenceModule {}
