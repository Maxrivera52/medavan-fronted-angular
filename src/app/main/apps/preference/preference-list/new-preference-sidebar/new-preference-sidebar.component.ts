import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { Subscription } from "rxjs";
import { IPreference } from "../../models/preference.model";

import { PreferenceListService } from "../preference-list.service";

@Component({
  selector: "app-new-preference-sidebar",
  templateUrl: "./new-preference-sidebar.component.html",
})
export class NewPreferenceSidebarComponent {
  formPreference: FormGroup;

  private _subscription: Subscription;
  private _preferenceForEdit: IPreference | null;

  get descriptionControlIsInvalid(): boolean {
    const description = this.formPreference.get("description");
    return description.touched && description.invalid;
  }

  constructor(
    private _coreSidebarService: CoreSidebarService,
    private _fb: FormBuilder,
    private _preferenceListService: PreferenceListService
  ) {
    this.formPreference = this._fb.group({
      description: new FormControl(null, Validators.required),
      value: new FormControl(null),
    });

    this._subscription = new Subscription();
    this._preferenceForEdit = null;
  }

  ngOnInit(): void {
    const subscription = this._preferenceListService.preferenceSelected$.subscribe({
      next: (preference) => {
        this._preferenceForEdit = preference;

        if (this._preferenceForEdit) {
          this.formPreference.patchValue({
            description: preference.description,
            value: preference.value,
          });
        }
      },
    });

    this._subscription.add(subscription);
  }

  ngOndestroy(): void {
    this._subscription.unsubscribe();
    this._preferenceListService.preferenceSelected$.unsubscribe();
    this._preferenceListService.preferenceSelected$.complete();
  }

  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
    this.formPreference.reset();
    this._preferenceListService.preferenceSelected$.next(null);
  }

 
  submit() {
    if (this.formPreference.invalid) return;

    const { description, value } = this.formPreference.value;

    let subscription;

    if (!this._preferenceForEdit) {
      subscription = this._preferenceListService
        .createPreference({ description, value: value })
        .subscribe({
          next: (response) => {
            //do something
            this.toggleSidebar("new-preference-sidebar");
            this.formPreference.reset();
            this._preferenceListService.changeList$.next()
          },
          error: () => {
            // do something
          },
        });
    } else {
      subscription = this._preferenceListService
        .updatePreference({
          id: this._preferenceForEdit.idPreference,
          description,
          value: value,
        })
        .subscribe({
          next: (response) => {
            //do something
            this.toggleSidebar("new-preference-sidebar");
            this.formPreference.reset();
            this._preferenceListService.changeList$.next()
          },
          error: () => {
            // do something
          },
        });
    }

    this._subscription.add(subscription);
  }

}
