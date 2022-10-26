import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { IResponseGetList } from "@core/models/response-http.model";
import { IDocumentTypeResponse } from "@core/models/selects.model";
import { SelectService } from "app/services/select.service";
import dayjs from "dayjs";
import { Observable, Subscription } from "rxjs";
import { IDoctor } from "../../models/doctor.model";
import { DoctorListService } from "../doctor-list.service";

import { ISpecialty } from "../../../specialty/models/specialty.model";
import { SpecialtyListService } from "app/main/apps/specialty/specialty-list/specialty-list.service";

import { FlatpickrOptions } from "ng2-flatpickr";

import Peru from "flatpickr/dist/l10n/es";
@Component({
  selector: "app-new-doctor-sidebar",
  templateUrl: "./new-doctor-sidebar.component.html",
})
export class NewDoctorSidebarComponent implements OnInit {
  specialtySelect$: Observable<IResponseGetList<ISpecialty>>;

  public dateOptions: FlatpickrOptions = {
    altInput: true,
    locale: Peru.es,
    mode: "single",
    altInputClass:
      "form-control flat-picker flatpickr-input invoice-edit-input",
    enableTime: true,
  };

  formDoctor: FormGroup;

  private _subscription: Subscription;
  private _doctorForEdit: IDoctor | null;

  documentTypeSelect$: Observable<IResponseGetList<IDocumentTypeResponse>>;

  get cmpControlIsInvalid(): boolean {
    const cmp = this.formDoctor.get("cmp");
    return cmp.touched && cmp.invalid;
  }
  get iddocumentTypeControlIsInvalid(): boolean {
    const iddocumentType = this.formDoctor.get("iddocumentType");
    return iddocumentType.touched && iddocumentType.invalid;
  }
  get documentNumberControlIsInvalid(): boolean {
    const documentNumber = this.formDoctor.get("documentNumber");
    return documentNumber.touched && documentNumber.invalid;
  }
  get firstLastNameControlIsInvalid(): boolean {
    const firstLastName = this.formDoctor.get("firstLastname");
    return firstLastName.touched && firstLastName.invalid;
  }

  public meses = [
    { label: "Enero", value: "enero" },
    { label: "Febrero", value: "febrero" },
    { label: "Marzo", value: "marzo" },
    { label: "Abril", value: "abril" },
    { label: "Mayo", value: "mayo" },
    { label: "Junio", value: "junio" },
    { label: "Julio", value: "julio" },
    { label: "Agosto", value: "agosto" },
    { label: "Septiembre", value: "septiembre" },
    { label: "Octubre", value: "octubre" },
    { label: "Noviembre", value: "noviembre" },
    { label: "Diciembre", value: "diciembre" },
  ];

  public dias = [
    { label: "01", value: "01" },
    { label: "02", value: "03" },
    { label: "03", value: "03" },
    { label: "04", value: "04" },
    { label: "05", value: "05" },
    { label: "06", value: "06" },
    { label: "07", value: "07" },
    { label: "08", value: "08" },
    { label: "09", value: "09" },
    { label: "10", value: "10" },
    { label: "11", value: "11" },
    { label: "12", value: "12" },
    { label: "13", value: "13" },
    { label: "14", value: "14" },
    { label: "15", value: "15" },
    { label: "16", value: "16" },
    { label: "17", value: "17" },
    { label: "18", value: "18" },
    { label: "19", value: "19" },
    { label: "20", value: "20" },
    { label: "21", value: "21" },
    { label: "22", value: "22" },
    { label: "23", value: "23" },
    { label: "24", value: "24" },
    { label: "25", value: "25" },
    { label: "26", value: "26" },
    { label: "27", value: "27" },
    { label: "28", value: "28" },
    { label: "29", value: "29" },
    { label: "30", value: "30" },
    { label: "31", value: "31" }
  ];

  constructor(
    private _coreSidebarService: CoreSidebarService,
    private _fb: FormBuilder,
    private _doctorListService: DoctorListService,
    private _selectsService: SelectService,
    private _specialtyService: SpecialtyListService
  ) {
    this.formDoctor = this._fb.group({
      cmp: new FormControl(null, Validators.required),
      iddocumentType: new FormControl(null, Validators.required),
      documentNumber: new FormControl(null, Validators.required),
      firstLastname: new FormControl(null, Validators.required),
      secondLastname: new FormControl(null),
      name: new FormControl(null),
      birthdayDay: new FormControl(null),
      birthdayMounth: new FormControl(null),
      email: new FormControl(null),
      cellphone: new FormControl(null),
      phoneContact: new FormControl(null),
      idspecialty: new FormControl(null),
    });

    this.documentTypeSelect$ = new Observable();
    this.specialtySelect$ = new Observable();

    this._subscription = new Subscription();
    this._doctorForEdit = null;
  }

  ngOnInit(): void {
    // call selects
    this.documentTypeSelect$ = this._selectsService.getDocumentTypes();
    this.specialtySelect$ = this._specialtyService.getSpecialtys();

    const subscription = this._doctorListService.doctorSelected$.subscribe({
      next: (doctor) => {
        this._doctorForEdit = doctor;

        if (this._doctorForEdit) {
          this.formDoctor.patchValue({
            cmp: doctor.cmp,
            iddocumentType: doctor.iddocumentType,
            documentNumber: doctor.documentNumber,
            firstLastname: doctor.firstLastname,
            secondLastname: doctor.secondLastname,
            name: doctor.name,
            birthdayDay: doctor.birthdayDay,
            birthdayMounth: { label: doctor.birthdayMounth },
            email: doctor.email,
            cellphone: doctor.cellphone,
            phoneContact: doctor.phoneContact,
            idspecialty: doctor.idspecialty,
          });
        }
      },
    });

    this._subscription.add(subscription);
  }

  ngOndestroy(): void {
    this._subscription.unsubscribe();
    this._doctorListService.doctorSelected$.unsubscribe();
    this._doctorListService.doctorSelected$.complete();
  }

  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
    this.formDoctor.reset();
    this._doctorListService.doctorSelected$.next(null);
  }

  submit() {
    if (this.formDoctor.invalid) return;

    const {
      cmp,
      iddocumentType,
      documentNumber,
      birthdayDay,
      birthdayMounth,
      firstLastname,
      secondLastname,
      name,
      email,
      cellphone,
      phoneContact,
      idspecialty,
    } = this.formDoctor.value;

    let subscription;
    if (!this._doctorForEdit) {
      subscription = this._doctorListService
        .createDoctor({
          cmp: cmp,
          iddocument_type: iddocumentType,
          document_number: documentNumber,
          first_lastname: firstLastname,
          second_lastname: secondLastname,
          name: name,
          birthday_day: birthdayDay,
          birthday_mounth: birthdayMounth.value,
          email: email,
          cellphone: cellphone,
          phone_contact: phoneContact,
          idspecialty: idspecialty,
        })
        .subscribe({
          next: (response) => {
            //do something
            this.toggleSidebar("new-doctor-sidebar");
            this.formDoctor.reset();
            this._doctorListService.changeList$.next();
          },
          error: () => {
            // do something
          },
        });
    } else {
      subscription = this._doctorListService
        .updateDoctor({
          id: this._doctorForEdit.idDoctor,
          cmp: cmp,
          iddocument_type: iddocumentType,
          document_number: documentNumber,
          first_lastname: firstLastname,
          second_lastname: secondLastname,
          name: name,
          birthday_day: birthdayDay,
          birthday_mounth: birthdayMounth.value,
          email: email,
          cellphone: cellphone,
          phone_contact: phoneContact,
          idspecialty: idspecialty,
        })
        .subscribe({
          next: (response) => {
            //do something
            this.toggleSidebar("new-doctor-sidebar");
            this.formDoctor.reset();
            this._doctorListService.changeList$.next();
          },
          error: () => {
            // do something
          },
        });
    }

    this._subscription.add(subscription);
  }
}
