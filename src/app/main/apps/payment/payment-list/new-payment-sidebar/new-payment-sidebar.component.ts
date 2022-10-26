import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { Subscription } from "rxjs";
import { IPayment } from "../../models/payment.model";

import { PaymentListService } from "../payment-list.service";

@Component({
  selector: "app-new-payment-sidebar",
  templateUrl: "./new-payment-sidebar.component.html",
})
export class NewPaymentSidebarComponent implements OnInit {
  formPayment: FormGroup;

  private _subscription: Subscription;
  private _paymentForEdit: IPayment | null;

  constructor(
    private _coreSidebarService: CoreSidebarService,
    private _fb: FormBuilder,
    private _paymentListService: PaymentListService
  ) {
    this.formPayment = this._fb.group({
      description: new FormControl(null),
    });

    this._subscription = new Subscription();
    this._paymentForEdit = null;
  }

  ngOnInit(): void {
    const subscription = this._paymentListService.paymentSelected$.subscribe({
      next: (payment) => {
        this._paymentForEdit = payment;

        if (this._paymentForEdit) {
          this.formPayment.patchValue({
            description: payment.description,
          });
        }
      },
    });

    this._subscription.add(subscription);
  }
  

  ngOndestroy(): void {
    this._subscription.unsubscribe();
    this._paymentListService.paymentSelected$.unsubscribe();
    this._paymentListService.paymentSelected$.complete();
  }

  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
    this.formPayment.reset();
    this._paymentListService.paymentSelected$.next(null);
  }

  submit() {
    if (this.formPayment.invalid) return;

    const { description} = this.formPayment.value;

    let subscription;

    if (!this._paymentForEdit) {
      subscription = this._paymentListService
        .createPayment({ description})
        .subscribe({
          next: (response) => {
            //do something
            this.toggleSidebar("new-payment-sidebar");
            this.formPayment.reset();
            this._paymentListService.changeList$.next();
          },
          error: () => {
            // do something
          },
        });
    } else {
      subscription = this._paymentListService
        .updatePayment({
          id: this._paymentForEdit.idPayment,
          description
        })
        .subscribe({
          next: (response) => {
            //do something
            this.toggleSidebar("new-payment-sidebar");
            this.formPayment.reset();
            this._paymentListService.changeList$.next();
          },
          error: () => {
            // do something
          },
        });
    }

    this._subscription.add(subscription);
  }

}
