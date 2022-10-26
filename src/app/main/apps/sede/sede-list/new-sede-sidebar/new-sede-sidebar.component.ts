import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { Subscription } from "rxjs";
import { ISede } from "../../models/sede.model";

import { SedeListService } from "../sede-list.service";

@Component({
  selector: "app-new-sede-sidebar",
  templateUrl: "./new-sede-sidebar.component.html",
})
export class NewSedeSidebarComponent {
  formSede: FormGroup;

  private _subscription: Subscription;
  private _sedeForEdit: ISede | null;

  constructor(
    private _coreSidebarService: CoreSidebarService,
    private _fb: FormBuilder,
    private _sedeListService: SedeListService
  ) {
    this.formSede = this._fb.group({
      description: new FormControl(null),
      sala: new FormControl(null),
      cuartos: new FormControl(null),
      cubiculos: new FormControl(null),
      color: new FormControl(null),
    });

    this._subscription = new Subscription();
    this._sedeForEdit = null;
  }

  ngOnInit(): void {
    const subscription = this._sedeListService.sedeSelected$.subscribe({
      next: (sede) => {
        this._sedeForEdit = sede;

        if (this._sedeForEdit) {
          this.formSede.patchValue({
            description: sede.description,
            sala: sede.sala,
            cuartos: sede.cuartos,
            cubiculos: sede.cubiculos,
            color: sede.color,
          });
        }
      },
    });

    this._subscription.add(subscription);
  }

  ngOndestroy(): void {
    this._subscription.unsubscribe();
    this._sedeListService.sedeSelected$.unsubscribe();
    this._sedeListService.sedeSelected$.complete();
  }

  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
    this.formSede.reset();
    this._sedeListService.sedeSelected$.next(null);
  }

  submit() {
    if (this.formSede.invalid) return;

    const { 
      description, 
      sala, 
      cuartos, 
      cubiculos, 
      color 
    } = this.formSede.value;

    let subscription;

    if (!this._sedeForEdit) {
      subscription = this._sedeListService
        .createSede({ description, sala, cuartos, cubiculos, color })
        .subscribe({
          next: (response) => {
            //do something
            this.toggleSidebar("new-sede-sidebar");
            this.formSede.reset();
            this._sedeListService.changeList$.next();
          },
          error: () => {
            // do something
          },
        });
    } else {
      subscription = this._sedeListService
        .updateSede({
          id: this._sedeForEdit.idSede,
          description,
          sala,
          cuartos,
          cubiculos,
          color,
        })
        .subscribe({
          next: (response) => {
            //do something
            this.toggleSidebar("new-sede-sidebar");
            this.formSede.reset();
            this._sedeListService.changeList$.next();
          },
          error: () => {
            // do something
          },
        });
    }

    this._subscription.add(subscription);
  }
}
