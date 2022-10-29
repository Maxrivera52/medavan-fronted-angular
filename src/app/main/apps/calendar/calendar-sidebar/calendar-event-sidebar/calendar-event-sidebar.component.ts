import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";

/* import { EventRef } from "app/main/apps/calendar/calendar.model"; */
import { CalendarService } from "app/main/apps/calendar/calendar.service";
import dayjs from "dayjs";
import { Observable, Subscription } from "rxjs";
import { ICalendar } from "../../models/calendar.model";
import { IResponseGetList } from "@core/models/response-http.model";

import { DoctorListService } from "../../../doctor/doctor-list/doctor-list.service";
import { IDoctor } from "../../../doctor/models/doctor.model";

import { PatientListService } from "../../../patient/patient-list/patient-list.service";
import { IPatient } from "../../../patient/models/patient.model";

import { OriginListService } from "../../../origin/origin-list/origin-list.service";
import { IOrigin } from "../../../origin/models/origin.model";

import { MaterialListService } from "../../../material/materials-list/materials-list.service";
import { IMaterial } from "../../../material/models/material.model";
import { filter, tap } from "rxjs/operators";
import { FlatpickrOptions } from "ng2-flatpickr";

import Peru from "flatpickr/dist/l10n/es";

import { PaymentListService } from "../../../payment/payment-list/payment-list.service";
import { IPayment } from "../../../payment/models/payment.model";

import { CirugiaListService } from "../../../cirugia/cirugia-list/cirugia-list.service";
import { ICirugia } from "../../../cirugia/models/cirugia.model";

import { DiagnosticoListService } from "../../../diagnostico/diagnostico-list/diagnostico-list.service";
import { IDiagnostico, Idspecialty } from '../../../diagnostico/models/diagnostico.model';

import { AnesthesiaListService } from "../../../anesthesia/anesthesia-list/anesthesia-list.service";
import { IAnesthesia } from "../../../anesthesia/models/anesthesia.model";

import { SpecialtyListService } from "../../../specialty/specialty-list/specialty-list.service";
import { ISpecialty } from "../../../specialty/models/specialty.model";

import { EquipoListService } from "../../../equipo/equipo-list/equipo-list.service";
import { IEquipo } from "../../../equipo/models/equipo.model";
import { EventClickArg } from "@fullcalendar/core";
import { stringify } from "querystring";
import { id } from '@swimlane/ngx-datatable';
import Swal from "sweetalert2";

@Component({
  selector: "app-calendar-event-sidebar",
  templateUrl: "./calendar-event-sidebar.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class CalendarEventSidebarComponent implements OnInit, AfterViewInit {
  formCalendar: FormGroup;
  startDate: Date;
  endDate: Date;
  idEvent: string | null;
  durationFin: Number;

  //combo box
  doctorsSelect$: Observable<IResponseGetList<IDoctor>>;
  doctor$: Observable<IResponseGetList<IDoctor>>;
  patientSelect$: Observable<IResponseGetList<IPatient>>;
  patient$: Observable<IResponseGetList<IPatient>>;
  originSelect$: Observable<IResponseGetList<IOrigin>>;
  materialSelect$: Observable<IResponseGetList<IMaterial>>;
  paymentSelect$: Observable<IResponseGetList<IPayment>>;
  cirugiaSelect$: Observable<IResponseGetList<ICirugia>>;
  diagnosticoSelect$: Observable<IResponseGetList<IDiagnostico>>;
  anesthesiaSelect$: Observable<IResponseGetList<IAnesthesia>>;
  specialtySelect$: Observable<IResponseGetList<ISpecialty>>;
  equipoSelect$: Observable<IResponseGetList<IEquipo>>;
  //  Decorator
  @ViewChild("startDatePicker") startDatePicker;
  @ViewChild("endDatePicker") endDatePicker;

  private _subscription: Subscription;
  private _calendarForEdit: ICalendar | null;

  // Public
  /* public event: EventRef; */
  public isDataEmpty = true;

  //show inputs after changing combos
  public ShowDoctorInputs;
  public ShowPatientInputs;
  public ShowCirugiaInputs;
  public ShowAnestesiaInputs;
  public ShowDiagnosticInputs;
  public ShowProcedenciaInputs;
  public ShowMaterialInputs;

  public selectLabel = [
    { label: "Business", bullet: "warning" },
    { label: "Sala 01", bullet: "success" },
    { label: "Sala 02", bullet: "info" },
  ];
  public resourceId = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
  ];

  public duration = [
    { label: "00:30", value: "0.5" },
    { label: "01:00", value: "1" },
    { label: "01:30", value: "1.5" },
    { label: "02:00", value: "2" },
    { label: "02:30", value: "2.5" },
    { label: "03:00", value: "3" },
    { label: "03:30", value: "3.5" },
    { label: "04:00", value: "4" },
    { label: "04:30", value: "4.5" },
    { label: "05:00", value: "5" },
    { label: "05:30", value: "5.5" },
    { label: "06:00", value: "6" },
    { label: "06:30", value: "6.5" },
    { label: "07:00", value: "7" },
    { label: "07:30", value: "7.5" },
    { label: "08:00", value: "8" },
    { label: "08:30", value: "8.5" },
    { label: "09:00", value: "9" },
    { label: "09:30", value: "9.5" },
    { label: "10:00", value: "10" },
    { label: "10:30", value: "10.5" },
    { label: "11:00", value: "11" },
    { label: "11:30", value: "11.5" },
    { label: "12:00", value: "12" },
    { label: "12:30", value: "12.5" },
  ];
  public dateOptions: FlatpickrOptions = {
    altInput: true,
    locale: Peru.es,
    mode: "single",
    altInputClass:
      "form-control flat-picker flatpickr-input invoice-edit-input",
    enableTime: true,
    minuteIncrement: 30,
    altFormat: "j, F Y H:i K",
    time_24hr: false,
  };

  constructor(
    private _coreSidebarService: CoreSidebarService,
    private _calendarService: CalendarService,
    private _fb: FormBuilder,
    private _doctorListService: DoctorListService,
    private _patientListService: PatientListService,
    private _originListService: OriginListService,
    private _materialListService: MaterialListService,
    private _paymentListService: PaymentListService,
    private _cirugiaListService: CirugiaListService,
    private _diagnosticoListService: DiagnosticoListService,
    private _anesthesiaService: AnesthesiaListService,
    private _specialtyService: SpecialtyListService,
    private _equipoService: EquipoListService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
    this.formCalendar = this._fb.group({
      title: "",
      calendar: new FormControl(null),
      start: new FormControl(null),
      duration: new FormControl(null),
      end: new FormControl(null),
      resourceId: new FormControl(null),
      //doctores
      iddoctor: new FormControl(null),
      firstLastnamedoctor: new FormControl(null),
      secondLastnamedoctor: new FormControl(null),
      namedoctor: new FormControl(null),
      idspecialty: new FormControl(null),
      //pacientes
      idpatient: new FormControl(null),
      firstnamepatient: new FormControl(null),
      lastnamepatient: new FormControl(null),
      agepacient: new FormControl(null),
      //cirugia
      idcirugia: new FormControl(null),
      descriptioncirugia: new FormControl(null),
      //anestesia
      idanesthesia: new FormControl(null),
      descriptionanesthesia: new FormControl(null),

      hospitalDays: new FormControl(null),

      //diagnostico
      iddiagnostic: new FormControl(null),
      descriptiondiagnostic: new FormControl(null),

      //origen
      idsource: new FormControl(null),
      namesource: new FormControl(null),

      //material
      idmaterial: new FormControl(null),
      idequipment: new FormControl(null),
      descripcionmaterial: new FormControl(null),

      observations: new FormControl(null),
      etiqueta: new FormControl(null),
    });
    this.ShowDoctorInputs = true;
    this.ShowPatientInputs = true;
    this.ShowCirugiaInputs = true;
    this.ShowAnestesiaInputs = true;
    this.ShowDiagnosticInputs = true;
    this.ShowProcedenciaInputs = true;
    this.ShowMaterialInputs = true;

    this.doctorsSelect$ = new Observable();
    this.patientSelect$ = new Observable();
    this.originSelect$ = new Observable();
    this.materialSelect$ = new Observable();
    this.paymentSelect$ = new Observable();
    this.cirugiaSelect$ = new Observable();
    this.diagnosticoSelect$ = new Observable();
    this.anesthesiaSelect$ = new Observable();
    this.specialtySelect$ = new Observable();
    this.equipoSelect$ = new Observable();
    //
    this.doctor$ = new Observable();
    this.patient$ = new Observable();

    this.startDate = new Date();

    if (this.startDate.getMinutes() < 30) {
      this.startDate.setMinutes(
        this.startDate.getMinutes() + (30 - this.startDate.getMinutes())
      );
    } else {
      this.startDate.setMinutes(
        this.startDate.getMinutes() + (60 - this.startDate.getMinutes())
      );
    }
    this.endDate = this.startDate;
    this.idEvent = null;
    this._subscription = new Subscription();
  }

  resetForm() {
    this.formCalendar.reset();
  }

  decimalAHora(decimal) {
    if (!decimal) return `00:30`;

    let horas = Math.floor(decimal),
      restoHoras = Math.floor((decimal % 1) * 100),
      decimalMinutos = (restoHoras * 60) / 100,
      minutos = Math.floor(decimalMinutos);

    return `${("00" + horas).slice(-2)}:${("00" + minutos).slice(-2)}`;
  }

  ngOnInit(): void {
    //combo box
    this.doctorsSelect$ = this._doctorListService.getDoctors();
    this.patientSelect$ = this._patientListService.getPatients();
    this.originSelect$ = this._originListService.getOrigins();
    this.materialSelect$ = this._materialListService.getMaterials();
    this.paymentSelect$ = this._paymentListService.getPayments();
    this.cirugiaSelect$ = this._cirugiaListService.getCirugiasById(0);
    this.patient$ = this._patientListService.getPatientsById(0);

    this.diagnosticoSelect$ = this._diagnosticoListService.getDiagnosticos();
    this.anesthesiaSelect$ = this._anesthesiaService.getAnesthesias();
    this.specialtySelect$ = this._specialtyService.getSpecialtys();
    this.equipoSelect$ = this._equipoService.getEquipos();

    const subscription = this._calendarService.onCurrentEventChange$
      .pipe(
        tap((event) => {
          if (!event) {
            this.resetValues();
          }
        }),
        filter((event) => !!event)
      )
      .subscribe((eventRef: any) => {
        const {
          event = {
            id: null,
            start: null,
            end: null,
            title: null,
          },
        } = eventRef;

        // console.log(eventRef.resource.id);
        const { extendedProps } = event;
        this.isDataEmpty = false;

        this.idEvent = event.id || null;
        this.startDate = event.start || eventRef.start;
        this.endDate = event.end || null;

        this.durationFin = this.endDate
          ? (this.endDate.getTime() - this.startDate.getTime()) / 1000 / 60 / 60
          : 0;

        this.formCalendar.patchValue({
          title: event.title,
          start: event.start,
          end: event.end,
          // calendar: extendedProps?.calendar,
          calendar: eventRef.resource?.id ?? extendedProps?.resourceId,
          resourceId: eventRef.resource?.id ?? extendedProps?.resourceId,
          iddoctor: extendedProps?.iddoctor,
          idpatient: extendedProps?.idpatient,
          idcirugia: extendedProps?.idcirugia,
          idanesthesia: extendedProps?.idanesthesia,
          hospitalDays: extendedProps?.hospitalDays,
          iddiagnostic: extendedProps?.iddiagnostic,
          idsource: extendedProps?.idsource,
          idmaterial: extendedProps?.idmaterial,
          idequipment: extendedProps?.idequipment,
          observations: extendedProps?.observations,
          duration: this.decimalAHora(this.durationFin),
        });

        //aqui
        this.resetchangescombos();
        this._changeDetectorRef.detectChanges();
      });

    this._subscription.add(subscription);
  }

  ngAfterViewInit(): void {
    this._changeDetectorRef.detectChanges();
  }
  resetchangescombos() {
    this.doctorchange();
    this.patientchange();
    this.cirugiachange();
    this.anestesiachange();
    this.diagnostichange();
    this.procedenciachange();
    this.materialchange();
  }
  resetValues(): void {
    this.formCalendar.reset();
    this.startDate = new Date();
    this.endDate = new Date();
    this.idEvent = null;
    this.isDataEmpty = true;
  }

  updateOnDrop(eventRef: EventClickArg, resourceID) {
    // console.log(eventRef);
    const { event } = eventRef;
    const { extendedProps } = event;
    this.isDataEmpty = false;

    this.idEvent = event.id;
    this.startDate = event.start;
    this.endDate = event.end;

    // this.durationFin = (this.endDate.getTime() - this.startDate.getTime()) / 1000 / 60 / 60
    this.durationFin = this.endDate
      ? (this.endDate.getTime() - this.startDate.getTime()) / 1000 / 60 / 60
      : 0;
    this.formCalendar.patchValue({
      title: event.title,
      start: [event.start],
      end: [event.end],
      calendar: extendedProps?.calendar,
      resourceId: resourceID,
      iddoctor: extendedProps?.iddoctor,
      idspecialty: extendedProps?.idspecialty,
      idpatient: extendedProps?.idpatient,
      idcirugia: extendedProps?.idcirugia,
      idanesthesia: extendedProps?.idanesthesia,
      hospitalDays: extendedProps?.hospitalDays,
      iddiagnostic: extendedProps?.iddiagnostic,
      idsource: extendedProps?.idsource,
      idmaterial: extendedProps?.idmaterial,
      idequipment: extendedProps?.idequipment,
      observations: extendedProps?.observations,

      duration: this.decimalAHora(this.durationFin),
    });

    this.updateEvent(false);
  }

  updateEvent(comesFromComponent = true) {
    if (this.formCalendar.invalid) return;
    const {
      id,
      title,
      start,
      duration,
      calendar,
      resourceId,
      iddoctor,
      idpatient,
      idcirugia,
      idanesthesia,
      hospitalDays,
      iddiagnostic,
      idsource,
      idmaterial,
      idequipment,
      observations,
      //nuevos campos por si no exiten ids
      firstLastnamedoctor,
      secondLastnamedoctor,
      namedoctor,
      idspecialty,
      firstnamepatient,
      lastnamepatient,
      agepatient,
      descriptioncirugia,
      descriptionanesthesia,
      descriptiondiagnostic,
      namesource,
      descripcionmaterial,
    } = this.formCalendar.value;
    let separacion = duration.split(":");
    let hora = Number(separacion[0]);
    let minutos = Number(separacion[1]);

    const subscription = this._calendarService
      .editMedicalEvent({
        id: Number(this.idEvent),
        title: "",
        start: dayjs(start[0]).format("YYYY-MM-DD HH:mm:ss"),
        end: dayjs(start[0])
          .add(hora, "hour")
          .add(minutos, "minute")
          .format("YYYY-MM-DD HH:mm:ss"),
        calendar: calendar,
        duration: duration,
        resourceId: resourceId,
        //
        iddoctor: iddoctor,
        firstLastnamedoctor: firstLastnamedoctor,
        secondLastnamedoctor: secondLastnamedoctor,
        namedoctor: namedoctor,
        idspecialty: idspecialty,
        //
        idpatient: idpatient,
        firstnamepatient: firstnamepatient,
        lastnamepatient: lastnamepatient,
        agepacient: agepatient,
        //
        idcirugia: idcirugia,
        descriptioncirugia: descriptioncirugia,
        //
        idanesthesia: idanesthesia,
        descriptionanesthesia: descriptionanesthesia,
        //
        iddiagnostic: iddiagnostic,
        descriptiondiagnostic: descriptiondiagnostic,
        //
        idsource: idsource,
        namesource: namesource,
        //
        idmaterial: idmaterial,
        idequipment: idequipment,

        descripcionmaterial: descripcionmaterial,
        hospital_days: hospitalDays,
        observations: observations,
      })
      .subscribe({
        next: (response:any) => {
          this._calendarService.onEventChange.next();
          //console.warn(response)
          if(response?.code == -1){
            Swal.fire('Error',response?.message,'error')
            return
          }else if(response?.code == -2){
            Swal.fire('Precaución',response?.message,'warning')
          }
          Swal.fire('Éxito',response?.message,'success')
          //do something
          comesFromComponent && this.toggleEventSidebar();
          this.resetValues();
          this.resetchangescombos();
          
        },
        error: () => {
          // do something
        },
      });

    this._subscription.add(subscription);
  }

  submit() {
    if (this.formCalendar.invalid) return;

    const {
      id,
      title,
      start,
      duration,
      calendar,
      resourceId,
      iddoctor,
      idpatient,
      idcirugia,
      idanesthesia,
      hospitalDays,
      iddiagnostic,
      idsource,
      idmaterial,
      idequipment,
      observations,
      //nuevos campos por si no exiten ids
      firstLastnamedoctor,
      secondLastnamedoctor,
      namedoctor,
      idspecialty,
      firstnamepatient,
      lastnamepatient,
      agepatient,
      descriptioncirugia,
      descriptionanesthesia,
      descriptiondiagnostic,
      namesource,
      descripcionmaterial,
    } = this.formCalendar.value;

    let separacion = duration.split(":");
    let hora = Number(separacion[0]);
    let minutos = Number(separacion[1]);
    const subscription = this._calendarService
      .createMedicalEvent({
        id: id,
        // title: "",
        title: title,
        start: dayjs(start[0]).format("YYYY-MM-DD HH:mm:ss"),
        duration: duration,
        end: dayjs(start[0])
          .add(hora, "hour")
          .add(minutos, "minute")
          .format("YYYY-MM-DD HH:mm:ss"),
        calendar: resourceId,
        resourceId: resourceId,
        iddoctor: iddoctor,
        firstLastnamedoctor: firstLastnamedoctor,
        secondLastnamedoctor: secondLastnamedoctor,
        namedoctor: namedoctor,
        idspecialty: idspecialty,
        //
        idpatient: idpatient,
        firstnamepatient: firstnamepatient,
        lastnamepatient: lastnamepatient,
        agepacient: agepatient,
        //
        idcirugia: idcirugia,
        descriptioncirugia: descriptioncirugia,
        //
        idanesthesia: idanesthesia,
        descriptionanesthesia: descriptionanesthesia,
        //
        iddiagnostic: iddiagnostic,
        descriptiondiagnostic: descriptiondiagnostic,
        //
        idsource: idsource,
        namesource: namesource,
        //
        idmaterial: idmaterial,
        idequipment: idequipment,
        //
        descripcionmaterial: descripcionmaterial,
        hospital_days: hospitalDays,
        observations: observations,
      })
      .subscribe({
        next: (response) => {
          //do something
          this.toggleEventSidebar();
          this.resetValues();
          this.resetchangescombos();
          this._calendarService.onEventChange.next();
        },
        error: () => {
          // do something
        },
      });
      
    this._subscription.add(subscription);
  }

  changeprueba() {
    console.log(1);
  }

  toggleEventSidebar() {
    this.resetValues();
    this._coreSidebarService
      .getSidebarRegistry("calendar-event-sidebar")
      .toggleOpen();
  }

  //validacion de combos inputs
  //disabled enabled
  disableInputsDoctor() {
    this.formCalendar.get("idspecialty").disable();
    this.formCalendar.get("firstLastnamedoctor").disable();
    this.formCalendar.get("namedoctor").disable();
    this.formCalendar.get("secondLastnamedoctor").disable();
  }
  enableInputsDoctor() {
    this.formCalendar.get("idspecialty").enable();
    this.formCalendar.get("firstLastnamedoctor").enable();
    this.formCalendar.get("namedoctor").enable();
    this.formCalendar.get("secondLastnamedoctor").enable();
  }
  disableInputsPatient() {
    this.formCalendar.get("firstnamepatient").disable();
    this.formCalendar.get("lastnamepatient").disable();
    this.formCalendar.get("agepacient").disable();
  }
  enableInputsPatient() {
    this.formCalendar.get("firstnamepatient").enable();
    this.formCalendar.get("lastnamepatient").enable();
    this.formCalendar.get("agepacient").enable();
  }
  //enviar data a los inputs de doctor
  doctorchange() {
    let valueIdDoctor = this.formCalendar.get("iddoctor").value;
    if (valueIdDoctor != null) {
      this.doctor$ = this._doctorListService.getDoctorsById(valueIdDoctor);
      this.doctor$.subscribe((responseData) => {
        this.formCalendar
          .get("firstLastnamedoctor")
          .setValue(responseData.data[0].firstLastname);
        this.formCalendar
          .get("secondLastnamedoctor")
          .setValue(responseData.data[0].secondLastname);
        this.formCalendar.get("namedoctor").setValue(responseData.data[0].name);
        this.formCalendar
          .get("idspecialty")
          .setValue(responseData.data[0].idspecialty);
        this.disableInputsDoctor();
        // this.selectEspecialidades();
        this.selectCirugia();
        this.selectDiagnosticos();
      });
    } else {
      this.formCalendar.get("firstLastnamedoctor").setValue("");
      this.formCalendar.get("secondLastnamedoctor").setValue("");
      this.formCalendar.get("namedoctor").setValue("");
      this.formCalendar.get("idspecialty").setValue(null);
      this.enableInputsDoctor();
      this.selectCirugia();
      this.selectDiagnosticos();
    }
  }

  patientchange() {
    let valueIdPatient = this.formCalendar.get("idpatient").value;
    if (valueIdPatient != null) {
      this.patient$ = this._patientListService.getPatientsById(valueIdPatient);
      this.patient$.subscribe((responseData) => {
        this.formCalendar
          .get("firstnamepatient")
          .setValue(responseData.data[0].firstName);
        this.formCalendar
          .get("lastnamepatient")
          .setValue(responseData.data[0].lastName);
        this.formCalendar.get("agepacient").setValue(responseData.data[0].age);
        this.disableInputsPatient();
      });
    } else {
      this.formCalendar.get("firstnamepatient").setValue("");
      this.formCalendar.get("lastnamepatient").setValue("");
      this.formCalendar.get("agepacient").setValue("");
      this.enableInputsPatient();
    }
  }
  cirugiachange() {
    let valueIdCirugia = this.formCalendar.get("idcirugia").value;
    valueIdCirugia !== null
      ? (this.ShowCirugiaInputs = false)
      : (this.ShowCirugiaInputs = true);
  }
  anestesiachange() {
    let valueIdAnestesia = this.formCalendar.get("idanesthesia").value;
    /*  valueIdAnestesia !== "null"
      ? (this.ShowAnestesiaInputs = false)
      : (this.ShowAnestesiaInputs = true); */
  }
  diagnostichange() {
    let valueIdDiagnostic = this.formCalendar.get("iddiagnostic").value;
    valueIdDiagnostic !== null
      ? (this.ShowDiagnosticInputs = false)
      : (this.ShowDiagnosticInputs = true);
  }
  procedenciachange() {
    let valueIdProcedencia = this.formCalendar.get("idsource").value;
    valueIdProcedencia !== null
      ? (this.ShowProcedenciaInputs = false)
      : (this.ShowProcedenciaInputs = true);
  }

  materialchange() {
    let valueIdMaterial = this.formCalendar.get("idmaterial").value;
    valueIdMaterial !== null
      ? (this.ShowMaterialInputs = false)
      : (this.ShowMaterialInputs = true);
  }

  //listado ce cirugia
  selectCirugia() {
    let valueIdspecialty = this.formCalendar.get("idspecialty").value;
    this.cirugiaSelect$ =
      this._cirugiaListService.getCirugiasByIdSpecialty(valueIdspecialty);
    this.selectDiagnosticos();
  }

  //listado ce diagnosticos
  selectDiagnosticos() {
    let valueIdspecialty = this.formCalendar.get("idspecialty").value;
    this.diagnosticoSelect$ =
      this._diagnosticoListService.getDiagnosticosByIdSpecialty(
        valueIdspecialty
      );
  }

  //listado ce Especialidad
  selectEspecialidades() {
    this.specialtySelect$ = this._specialtyService.getSpecialtys();
  }
}
