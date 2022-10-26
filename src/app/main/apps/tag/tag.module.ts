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

import { TagEditComponent } from "app/main/apps/tag/tag-edit/tags-edit.component";
import { TagEditService } from "app/main/apps/tag/tag-edit/tags-edit.service";

import { TagListComponent } from "app/main/apps/tag/tag-list/tag-list.component";

import { TagViewComponent } from "app/main/apps/tag/tag-view/tag-view.component";
import { TagViewService } from "app/main/apps/tag/tag-view/tag-view.service";
import { NewTagSidebarComponent } from "app/main/apps/tag/tag-list/new-tag-sidebar/new-tags-sidebar.component";

// routing
const routes: Routes = [
  {
    path: "tag-list",
    component: TagListComponent,
    data: { animation: "TagListComponent" },
  },
  {
    path: "tag-view/:id",
    component: TagViewComponent,
    resolve: {
      data: TagViewService,
      InvoiceListService,
    },
    data: { path: "view/:id", animation: "TagViewComponent" },
  },
  {
    path: "tag-edit/:id",
    component: TagEditComponent,
    resolve: {
      ues: TagEditService,
    },
    data: { animation: "TagEditComponent" },
  },
  {
    path: "tag-view",
    redirectTo: "/apps/tag/tag-view/2", // Redirection
  },
  {
    path: "tag-edit",
    redirectTo: "/apps/tag/tag-edit/2", // Redirection
  },
];

@NgModule({
  declarations: [
    TagListComponent,
    TagViewComponent,
    TagEditComponent,
    NewTagSidebarComponent,
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
  providers: [TagViewService, TagEditService],
})
export class TagModule {}
