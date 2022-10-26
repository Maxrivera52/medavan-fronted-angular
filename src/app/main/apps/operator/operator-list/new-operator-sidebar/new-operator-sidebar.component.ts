import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { Subscription } from "rxjs";
import { IOperator } from "../../models/operator.model";

import { OperatorListService } from "../operator-list.service";

@Component({
  selector: "app-new-operator-sidebar",
  templateUrl: "./new-operator-sidebar.component.html",
})
export class NewOperatorSidebarComponent {
  formOperator: FormGroup;

  private _subscription: Subscription;
  private _operatorForEdit: IOperator | null;

  get firstNameControlIsInvalid(): boolean {
    const firstName = this.formOperator.get("firstName");
    return firstName.touched && firstName.invalid;
  }
  get lastNameControlIsInvalid(): boolean {
    const lastName = this.formOperator.get("lastName");
    return lastName.touched && lastName.invalid;
  }
  get emailControlIsInvalid(): boolean {
    const email = this.formOperator.get("email");
    return email.touched && email.invalid;
  }
  get cellphoneControlIsInvalid(): boolean {
    const cellphone = this.formOperator.get("cellphone");
    return cellphone.touched && cellphone.invalid;
  }

  constructor(
    private _coreSidebarService: CoreSidebarService,
    private _fb: FormBuilder,
    private _operatorListService: OperatorListService
  ) {
    this.formOperator = this._fb.group({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      cellphone: new FormControl(null, Validators.required),
    });

    this._subscription = new Subscription();
    this._operatorForEdit = null;
  }

  ngOnInit(): void {
    const subscription = this._operatorListService.operatorSelected$.subscribe({
      next: (operator) => {
        this._operatorForEdit = operator;

        if (this._operatorForEdit) {
          this.formOperator.patchValue({
            firstName: operator.firstName,
            lastName: operator.lastName,
            email: operator.email,
            cellphone: operator.cellphone,
          });
        }
      },
    });

    this._subscription.add(subscription);
  }

  ngOndestroy(): void {
    this._subscription.unsubscribe();
    this._operatorListService.operatorSelected$.unsubscribe();
    this._operatorListService.operatorSelected$.complete();
  }

  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
    this.formOperator.reset();
    this._operatorListService.operatorSelected$.next(null);
  }

  submit() {
     if (this.formOperator.invalid) return;

    const { firstName, lastName, email, cellphone } = this.formOperator.value;
    let subscription;

    if (!this._operatorForEdit) {
      subscription = this._operatorListService
        .createOperator({
          first_name: firstName,
          last_name: lastName,
          email,
          cellphone,
        })
        .subscribe({
          next: (response) => {
            //do something
            this.toggleSidebar("new-operator-sidebar");
            this.formOperator.reset();
            this._operatorListService.changeList$.next();
          },
          error: () => {
            // do something
          },
        });
    } else {
      subscription = this._operatorListService
        .updateOperator({
          id: this._operatorForEdit.idOperator,
          first_name: firstName,
          last_name: lastName,
          email,
          cellphone,
        })
        .subscribe({
          next: (response) => {
            //do something
            this.toggleSidebar("new-operator-sidebar");
            this.formOperator.reset();
            this._operatorListService.changeList$.next();
          },
          error: () => {
            // do something
          },
        });
    }

    this._subscription.add(subscription);
  }
}
