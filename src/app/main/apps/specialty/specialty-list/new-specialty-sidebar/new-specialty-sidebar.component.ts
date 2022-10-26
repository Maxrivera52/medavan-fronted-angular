import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { Subscription } from "rxjs";
import { ISpecialty } from "../../models/specialty.model";

import { SpecialtyListService } from "../specialty-list.service";

@Component({
  selector: "app-new-specialty-sidebar",
  templateUrl: "./new-specialty-sidebar.component.html",
})
export class NewSpecialtySidebarComponent implements OnInit {
  formSpecialty: FormGroup;

  private _subscription: Subscription;
  private _specialtyForEdit: ISpecialty | null;

  get descriptionControlIsInvalid(): boolean {
    const description = this.formSpecialty.get("description");
    return description.touched && description.invalid;
  }

  constructor(
    private _coreSidebarService: CoreSidebarService,
    private _fb: FormBuilder,
    private _specialtyListService: SpecialtyListService
  ) {
    this.formSpecialty = this._fb.group({
      description: new FormControl(null, Validators.required),
    });

    this._subscription = new Subscription();
    this._specialtyForEdit = null;
  }

  ngOnInit(): void {
    const subscription =
      this._specialtyListService.specialtySelected$.subscribe({
        next: (specialty) => {
          this._specialtyForEdit = specialty;

          if (this._specialtyForEdit) {
            this.formSpecialty.patchValue({
              description: specialty.description,
            });
          }
        },
      });

    this._subscription.add(subscription);
  }

  ngOndestroy(): void {
    this._subscription.unsubscribe();
    this._specialtyListService.specialtySelected$.unsubscribe();
    this._specialtyListService.specialtySelected$.complete();
  }

  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
    this.formSpecialty.reset();
    this._specialtyListService.specialtySelected$.next(null);
  }

  submit() {
    if (this.formSpecialty.invalid) return;

    const { description, name } = this.formSpecialty.value;

    let subscription;

    if (!this._specialtyForEdit) {
      subscription = this._specialtyListService
        .createSpecialty({ description })
        .subscribe({
          next: (response) => {
            //do something
            this.toggleSidebar("new-specialty-sidebar");
            this.formSpecialty.reset();
            this._specialtyListService.changeList$.next();
          },
          error: () => {
            // do something
          },
        });
    } else {
      subscription = this._specialtyListService
        .updateSpecialty({
          id: this._specialtyForEdit.idSpecialty,
          description,
        })
        .subscribe({
          next: (response) => {
            //do something
            this.toggleSidebar("new-specialty-sidebar");
            this.formSpecialty.reset();
            this._specialtyListService.changeList$.next();
          },
          error: () => {
            // do something
          },
        });
    }

    this._subscription.add(subscription);
  }
}
