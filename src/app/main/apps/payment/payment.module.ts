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

import { PaymentEditComponent } from 'app/main/apps/payment/payment-edit/payment-edit.component';
import { PaymentEditService } from 'app/main/apps/payment/payment-edit/payment-edit.service';

import { PaymentListComponent } from 'app/main/apps/payment/payment-list/payment-list.component';
import { PaymentListService } from 'app/main/apps/payment/payment-list/payment-list.service';

import { PaymentViewComponent } from 'app/main/apps/payment/payment-view/payment-view.component';
import { PaymentViewService } from 'app/main/apps/payment/payment-view/payment-view.service';
import { NewPaymentSidebarComponent } from 'app/main/apps/payment/payment-list/new-payment-sidebar/new-payment-sidebar.component';

// routing
const routes: Routes = [
  {
    path: 'payment-list',
    component: PaymentListComponent,
    resolve: {
      uls: PaymentListService
    },
    data: { animation: 'PaymentListComponent' }
  },
  {
    path: 'payment-view/:id',
    component: PaymentViewComponent,
    resolve: {
      data: PaymentViewService,
      InvoiceListService
    },
    data: { path: 'view/:id', animation: 'PaymentViewComponent' }
  },
  {
    path: 'payment-edit/:id',
    component: PaymentEditComponent,
    resolve: {
      ues: PaymentEditService
    },
    data: { animation: 'PaymentEditComponent' }
  },
  {
    path: 'payment-view',
    redirectTo: '/apps/payment/payment-view/2' // Redirection
  },
  {
    path: 'payment-edit',
    redirectTo: '/apps/payment/payment-edit/2' // Redirection
  }
];

@NgModule({
  declarations: [PaymentListComponent, PaymentViewComponent, PaymentEditComponent, NewPaymentSidebarComponent],
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
  providers: [PaymentListService, PaymentViewService, PaymentEditService]
})
export class PaymentModule {}
