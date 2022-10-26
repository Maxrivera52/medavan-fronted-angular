import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { Subscription } from "rxjs";
import { IAnesthesia } from "../../models/anesthesia.model";

import { AnesthesiaListService } from "../anesthesia-list.service";

@Component({
  selector: "app-new-anesthesia-sidebar",
  templateUrl: "./new-anesthesia-sidebar.component.html",
})
export class NewAnesthesiaSidebarComponent implements OnInit {
  formAnesthesia: FormGroup;

  private _subscription: Subscription;
  private _anesthesiaForEdit: IAnesthesia | null;

  constructor(
    private _coreSidebarService: CoreSidebarService,
    private _fb: FormBuilder,
    private _anesthesiaListService: AnesthesiaListService
  ) {
    this.formAnesthesia = this._fb.group({
      description: new FormControl(null),
    });

    this._subscription = new Subscription();
    this._anesthesiaForEdit = null;
  }

  ngOnInit(): void {
    const subscription = this._anesthesiaListService.anesthesiaSelected$.subscribe({
      next: (anesthesia) => {
        this._anesthesiaForEdit = anesthesia;

        if (this._anesthesiaForEdit) {
          this.formAnesthesia.patchValue({
            description: anesthesia.description,
          });
        }
      },
    });

    this._subscription.add(subscription);
  }
  

  ngOndestroy(): void {
    this._subscription.unsubscribe();
    this._anesthesiaListService.anesthesiaSelected$.unsubscribe();
    this._anesthesiaListService.anesthesiaSelected$.complete();
  }

  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
    this.formAnesthesia.reset();
    this._anesthesiaListService.anesthesiaSelected$.next(null);
  }

  submit() {
    if (this.formAnesthesia.invalid) return;

    const { description} = this.formAnesthesia.value;

    let subscription;

    if (!this._anesthesiaForEdit) {
      subscription = this._anesthesiaListService
        .createAnesthesia({ description})
        .subscribe({
          next: (response) => {
            //do something
            this.toggleSidebar("new-anesthesia-sidebar");
            this.formAnesthesia.reset();
            this._anesthesiaListService.changeList$.next();
          },
          error: () => {
            // do something
          },
        });
    } else {
      subscription = this._anesthesiaListService
        .updateAnesthesia({
          id: this._anesthesiaForEdit.idAnesthesia,
          description
        })
        .subscribe({
          next: (response) => {
            //do something
            this.toggleSidebar("new-anesthesia-sidebar");
            this.formAnesthesia.reset();
            this._anesthesiaListService.changeList$.next();
          },
          error: () => {
            // do something
          },
        });
    }

    this._subscription.add(subscription);
  }

}
