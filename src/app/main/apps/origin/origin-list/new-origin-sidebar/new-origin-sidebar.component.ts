import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { Subscription } from "rxjs";
import { IOrigin } from "../../models/origin.model";

import { OriginListService } from "../origin-list.service";

@Component({
  selector: "app-new-origin-sidebar",
  templateUrl: "./new-origin-sidebar.component.html",
})
export class NewOriginSidebarComponent {
  formOrigin: FormGroup;

  private _subscription: Subscription;
  private _originForEdit: IOrigin | null;

  get descriptionControlIsInvalid(): boolean {
    const description = this.formOrigin.get("description");
    return description.touched && description.invalid;
  }

  constructor(
    private _coreSidebarService: CoreSidebarService,
    private _fb: FormBuilder,
    private _originListService: OriginListService
  ) {
    this.formOrigin = this._fb.group({
      description: new FormControl(null, Validators.required),
    });

    this._subscription = new Subscription();
    this._originForEdit = null;
  }
  
  ngOnInit(): void {
    const subscription = this._originListService.originSelected$.subscribe({
      next: (origin) => {
        this._originForEdit = origin;

        if (this._originForEdit) {
          this.formOrigin.patchValue({
            description: origin.description,
          });
        }
      },
    });

    this._subscription.add(subscription);
  }

  ngOndestroy(): void {
    this._subscription.unsubscribe();
    this._originListService.originSelected$.unsubscribe();
    this._originListService.originSelected$.complete();
  }

  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
    this.formOrigin.reset();
    this._originListService.originSelected$.next(null);
  }

  submit() {
    if (this.formOrigin.invalid) return;

    const { description, name } = this.formOrigin.value;

    let subscription;

    if (!this._originForEdit) {
      subscription = this._originListService
        .createOrigin({ description })
        .subscribe({
          next: (response) => {
            //do something
            this.toggleSidebar("new-origin-sidebar");
            this.formOrigin.reset();
            this._originListService.changeList$.next();
          },
          error: () => {
            // do something
          },
        });
    } else {
      subscription = this._originListService
        .updateOrigin({
          id: this._originForEdit.idSource,
          description,
        })
        .subscribe({
          next: (response) => {
            //do something
            this.toggleSidebar("new-origin-sidebar");
            this.formOrigin.reset();
            this._originListService.changeList$.next();
          },
          error: () => {
            // do something
          },
        });
    }

    this._subscription.add(subscription);
  }
}
