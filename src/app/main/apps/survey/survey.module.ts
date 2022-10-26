import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";

import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
// import { NgSelectModule } from "@ng-select/ng-select";
// import { NgxDatatableModule } from "@swimlane/ngx-datatable";
// import { Ng2FlatpickrModule } from "ng2-flatpickr";
// import { TranslateModule } from "@ngx-translate/core";

import { CoreCommonModule } from '@core/common.module';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { SurveyListComponent } from "app/main/apps/survey/survey-list/survey-list.component";

// routing
const routes: Routes = [
  {
    path: "survey-list",
    component: SurveyListComponent,
    data: { animation: "SurveyListComponent" },
  }
];

@NgModule({
  declarations: [
    SurveyListComponent,
    // NewSurveySidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreCommonModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    ContentHeaderModule,
    CardSnippetModule,
    ReactiveFormsModule
  ],
  providers: [],
})
export class SurveyModule {}
