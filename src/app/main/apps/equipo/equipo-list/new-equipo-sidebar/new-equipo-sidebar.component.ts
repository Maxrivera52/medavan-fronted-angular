import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { Subscription } from "rxjs";
import { IEquipo } from "../../models/equipo.model";

import { EquipoListService } from "../equipo-list.service";

@Component({
  selector: "app-new-equipo-sidebar",
  templateUrl: "./new-equipo-sidebar.component.html",
})
export class NewEquipoSidebarComponent implements OnInit {
  formEquipo: FormGroup;

  private _subscription: Subscription;
  private _equipoForEdit: IEquipo | null;

  constructor(
    private _coreSidebarService: CoreSidebarService,
    private _fb: FormBuilder,
    private _equipoListService: EquipoListService
  ) {
    this.formEquipo = this._fb.group({
      name: new FormControl(null),
      description: new FormControl(null),
      quantity: new FormControl(0),
    });

    this._subscription = new Subscription();
    this._equipoForEdit = null;
  }

  ngOnInit(): void {
    const subscription = this._equipoListService.equipoSelected$.subscribe({
      next: (equipo) => {
        this._equipoForEdit = equipo;

        if (this._equipoForEdit) {
          this.formEquipo.patchValue({
            name: equipo.name,
            description: equipo.description,
            quantity: equipo.quantity
          });
        }
      },
    });

    this._subscription.add(subscription);
  }

  ngOndestroy(): void {
    this._subscription.unsubscribe();
    this._equipoListService.equipoSelected$.unsubscribe();
    this._equipoListService.equipoSelected$.complete();
  }

  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
    this.formEquipo.reset();
    this._equipoListService.equipoSelected$.next(null);
  }

  submit() {
    if (this.formEquipo.invalid) return;

    const { quantity, description, name } = this.formEquipo.value;

    let subscription;

    if (!this._equipoForEdit) {
      subscription = this._equipoListService
        .createEquipo({ quantity ,description, name })
        .subscribe({
          next: (response) => {
            //do something
            this.toggleSidebar("new-equipo-sidebar");
            this.formEquipo.reset();
            this._equipoListService.changeList$.next();
          },
          error: () => {
            // do something
          },
        });
    } else {
      subscription = this._equipoListService
        .updateEquipo({
          id: this._equipoForEdit.idEquipment,
          quantity,
          description,
          name
        })
        .subscribe({
          next: (response) => {
            //do something
            this.toggleSidebar("new-equipo-sidebar");
            this.formEquipo.reset();
            this._equipoListService.changeList$.next();
          },
          error: () => {
            // do something
          },
        });
    }

    this._subscription.add(subscription);
  }
}
