import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { IDocumentTypeResponse } from "@core/models/selects.model";
import { SelectService } from "app/services/select.service";

import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { Observable, Subscription } from "rxjs";
import { IResponseGetList } from "@core/models/response-http.model";

import { IPatient } from "../../models/patient.model";
import { PatientListService } from "../patient-list.service";

@Component({
  selector: "app-new-patient-sidebar",
  templateUrl: "./new-patient-sidebar.component.html",
})
export class NewPatientSidebarComponent implements OnInit {
  formPatient: FormGroup;

  private _subscription: Subscription;
  private _patientForEdit: IPatient | null;

  documentTypeSelect$: Observable<IResponseGetList<IDocumentTypeResponse>>;

  get iddocumentTypeControlIsInvalid(): boolean {
    const iddocumentType = this.formPatient.get("iddocumentType");
    return iddocumentType.touched && iddocumentType.invalid;
  }
  get documentNumberControlIsInvalid(): boolean {
    const documentNumber = this.formPatient.get("documentNumber");
    return documentNumber.touched && documentNumber.invalid;
  }
  get firstNameControlIsInvalid(): boolean {
    const firstName = this.formPatient.get("firstName");
    return firstName.touched && firstName.invalid;
  }
  get lastNameControlIsInvalid(): boolean {
    const lastName = this.formPatient.get("lastName");
    return lastName.touched && lastName.invalid;
  }

  typedocs = [
    {id: 1, name: 'RUC'},
    {id: 2, name: 'DNI'}
  ];

  selectedTypeDoc: any;

  constructor(
    private _coreSidebarService: CoreSidebarService,
    private _fb: FormBuilder,
    private _patientListService: PatientListService,
    private _selectsService: SelectService
  ) {
    this.formPatient = this._fb.group({
      iddocumentType: new FormControl(null, Validators.required),
      documentNumber: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      age: new FormControl(),
    });

    this.documentTypeSelect$ = new Observable();

    this._subscription = new Subscription();
    this._patientForEdit = null;
  }

  ngOnInit(): void {
    // call selects
    this.documentTypeSelect$ = this._selectsService.getDocumentTypes();

    const subscription = this._patientListService.patientSelected$.subscribe({
      next: (patient) => {
        this._patientForEdit = patient;

        if (this._patientForEdit) {
          this.formPatient.patchValue({
            iddocumentType: patient.iddocumentType,
            documentNumber: patient.documentNumber,
            firstName: patient.firstName,
            lastName: patient.lastName,
            age: patient.age,
          });
        }
      },
    });

    this._subscription.add(subscription);
  }
  ngOndestroy(): void {
    this._subscription.unsubscribe();
    this._patientListService.patientSelected$.unsubscribe();
    this._patientListService.patientSelected$.complete();
  }

  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
    this.formPatient.reset();
    this._patientListService.patientSelected$.next(null);
  }

  submit() {
    if (this.formPatient.invalid) return;

    const { iddocumentType, documentNumber, firstName, lastName, age } =
      this.formPatient.value;

    let subscription;

    if (!this._patientForEdit) {
      subscription = this._patientListService
        .createPatient({
          iddocument_type: iddocumentType,
          document_number: documentNumber,
          first_name: firstName,
          last_name: lastName,
          age: age,
        })
        .subscribe({
          next: (response) => {
            //do something
            this.toggleSidebar("new-patient-sidebar");
            this.formPatient.reset();
            this._patientListService.changeList$.next();
          },
          error: () => {
            // do something
          },
        });
    } else {
      subscription = this._patientListService
        .updatePatient({
          id: this._patientForEdit.idPatient,
          iddocument_type: iddocumentType,
          document_number: documentNumber,
          first_name: firstName,
          last_name: lastName,
          age: age,
        })
        .subscribe({
          next: (response) => {
            //do something
            this.toggleSidebar("new-patient-sidebar");
            this.formPatient.reset();
            this._patientListService.changeList$.next();
          },
          error: () => {
            // do something
          },
        });
    }

    this._subscription.add(subscription);
  }
}
