import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";

import { Observable, Subscription } from "rxjs";

import { ICirugia } from "../../models/cirugia.model";
import { CirugiaListService } from "../cirugia-list.service";

import { ISpecialty } from "../../../specialty/models/specialty.model";
import { SpecialtyListService } from "../../../specialty/specialty-list/specialty-list.service";

import { IResponseGetList } from "@core/models/response-http.model";
import { EquipoListService } from "app/main/apps/equipo/equipo-list/equipo-list.service";
import { IEquipo } from "app/main/apps/equipo/models/equipo.model";
@Component({
  selector: "app-new-cirugia-sidebar",
  templateUrl: "./new-cirugia-sidebar.component.html",
})
export class NewCirugiaSidebarComponent implements OnInit {
  formCirugia: FormGroup;

  private _subscription: Subscription;
  private _cirugiaForEdit: ICirugia | null;

  specialtySelect$: Observable<IResponseGetList<ISpecialty>>;

  equipmentSelect$: Observable<IResponseGetList<IEquipo>>;

  idcirugia:number = 0;
  idequipo:number = 0;
  constructor(
    private _coreSidebarService: CoreSidebarService,
    private _fb: FormBuilder,
    private _cirugiaListService: CirugiaListService,
    private _specialtyService: SpecialtyListService,
    private _equipmentService: EquipoListService
  ) {
    
    this.formCirugia = this._fb.group({
      description: new FormControl(null),
      idspecialty: new FormControl(null),
    });

    this.specialtySelect$ = new Observable();
    this.equipmentSelect$ = new Observable();

    this._subscription = new Subscription();
    this._cirugiaForEdit = null;
  }

  ngOnInit(): void {
    // call selects
    this.specialtySelect$ = this._specialtyService.getSpecialtys();
    this.equipmentSelect$ = this._equipmentService.getEquipos();

    const subscription = this._cirugiaListService.cirugiaSelected$.subscribe({
      next: (cirugia) => {
        this._cirugiaForEdit = cirugia;

        if (this._cirugiaForEdit) {
          this.idcirugia = cirugia.idCirugia
          this.formCirugia.patchValue({
            description: cirugia.description,
            idspecialty: cirugia.idSpecialty,
          });
        }
      },
    });

    this._subscription.add(subscription);
  }

  ngOndestroy(): void {
    this._subscription.unsubscribe();
    this._cirugiaListService.cirugiaSelected$.unsubscribe();
    this._cirugiaListService.cirugiaSelected$.complete();
  }

  toggleSidebar(name): void {
    this.idcirugia = 0;
    this.idequipo = 0;
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
    this.formCirugia.reset();
    this._cirugiaListService.cirugiaSelected$.next(null);
  }

  submit() {
    if (this.formCirugia.invalid) return;

    const { description, idspecialty } = this.formCirugia.value;

    let subscription;

    if (!this._cirugiaForEdit) {
      subscription = this._cirugiaListService
        .createCirugia({
          description: description,
          idspecialty: idspecialty,
        })
        .subscribe({
          next: (response) => {
            //do something
            this.toggleSidebar("new-cirugia-sidebar");
            this.formCirugia.reset();
            this._cirugiaListService.changeList$.next();
          },
          error: () => {
            // do something
          },
        });
    } else {
      subscription = this._cirugiaListService
        .updateCirugia({
          id: this._cirugiaForEdit.idCirugia,
          description: description,
          idspecialty: idspecialty,
        })
        .subscribe({
          next: (response) => {
            //do something
            this.toggleSidebar("new-cirugia-sidebar");
            this.formCirugia.reset();
            this._cirugiaListService.changeList$.next();
          },
          error: () => {
            // do something
          },
        });
    }

    this._subscription.add(subscription);
  }
}
