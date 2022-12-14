import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";

import { Observable, Subscription } from "rxjs";

import { IDiagnostico } from '../../models/diagnostico.model';
import { DiagnosticoListService } from "../diagnostico-list.service";

import { ISpecialty } from "../../../specialty/models/specialty.model";
import { SpecialtyListService } from "../../../specialty/specialty-list/specialty-list.service";

import { IResponseGetList } from "@core/models/response-http.model";
import { DiagnosticDetailSpecialtyListService } from "../diagnostico-detail-specialty.service";
@Component({
  selector: "app-new-diagnostico-sidebar",
  templateUrl: "./new-diagnostico-sidebar.component.html",
})
export class NewDiagnosticoSidebarComponent implements OnInit {
  formDiagnostico: FormGroup;

  private _subscription: Subscription;
  private _diagnosticoForEdit: IDiagnostico | null;
  iddiagnostic:number = 0;

  specialtySelect$: Observable<IResponseGetList<ISpecialty>>;

  constructor(
    private _coreSidebarService: CoreSidebarService,
    private _fb: FormBuilder,
    private _diagnosticoListService: DiagnosticoListService,
    private _specialtyService: SpecialtyListService,
    private _diagnosticoDetailSpecialtyService:DiagnosticDetailSpecialtyListService
  ) {
    this.formDiagnostico = this._fb.group({
      description: new FormControl(null),
      idspecialty: new FormControl(null),
    });

    this.specialtySelect$ = new Observable();

    this._subscription = new Subscription();
    this._diagnosticoForEdit = null;
  }

  

  ngOnInit(): void {
    
    /*
    this._diagdetspecService.getDiagnosticosDetailByIdDiagnostic(this.iddiagnostico).subscribe({
      next(value) {
        //console.log(value)
        if(value!=null){
          this.rows = value.data
          this.rows = [...this.rows]

          this.temp =  this.rows
          console.warn(this.rows)
        }  
      },
    })*/
    this.iddiagnostic = 0;
    const subscription = this._diagnosticoListService.diagnosticoSelected$.subscribe({
      next: (diagnostico) => {
        this._diagnosticoForEdit = diagnostico;
        if (this._diagnosticoForEdit) {
          this.iddiagnostic = diagnostico.idDiagnostic;
          this.formDiagnostico.patchValue({
            description: diagnostico.description,
           // idspecialty: diagnostico.idSpecialty,
          });
        }
      },
    });

    this._subscription.add(subscription);
  }
  

  ngOndestroy(): void {
    this._subscription.unsubscribe();
    this._diagnosticoListService.diagnosticoSelected$.unsubscribe();
    this._diagnosticoListService.diagnosticoSelected$.complete();
  }

  toggleSidebar(name): void {
    this.iddiagnostic = 0;
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
    this.formDiagnostico.reset();
    this._diagnosticoListService.diagnosticoSelected$.next(null);
  }

  submit() {
    if (this.formDiagnostico.invalid) return;

    const { description, idspecialty } = this.formDiagnostico.value;

    let subscription;

    if (!this._diagnosticoForEdit) {
      subscription = this._diagnosticoListService
        .createDiagnostico({ 
          description: description,
         // idspecialty: idspecialty
        })
        .subscribe({
          next: (response) => {
            //do something
            this.toggleSidebar("new-diagnostico-sidebar");
            this.formDiagnostico.reset();
            this._diagnosticoListService.changeList$.next();
          },
          error: () => {
            // do something
          },
        });
    } else {
      subscription = this._diagnosticoListService
        .updateDiagnostico({
          id: this._diagnosticoForEdit.idDiagnostic,
          description: description,
          //idspecialty: idspecialty,
        })
        .subscribe({
          next: (response) => {
            //do something
            this.toggleSidebar("new-diagnostico-sidebar");
            this.formDiagnostico.reset();
            this._diagnosticoListService.changeList$.next();
          },
          error: () => {
            // do something
          },
        });
    }

    this._subscription.add(subscription);
  }

}
