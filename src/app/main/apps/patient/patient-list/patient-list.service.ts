import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";

import { BehaviorSubject, Observable, Subject } from "rxjs";

import { environment } from "environments/environment";
import {
  IPatient,
  IPatientPost,
  IPatientPut,
  IPatientResponse,
} from "../models/patient.model";
import { IResponseGetList } from "@core/models/response-http.model";
import { map } from "rxjs/operators";
import { patientAdapter } from "../adapters/patient.adapter";

@Injectable({
  providedIn: "root",
})
export class PatientListService implements Resolve<any> {
  public rows: any;
  public onPatientListChanged: BehaviorSubject<any>;
  public patientSelected$: Subject<IPatient>;
  public changeList$: Subject<void>;

  private _url: string;

  constructor(private _httpClient: HttpClient) {
    this._url = environment.apiUrl;
    this.patientSelected$ = new Subject();
    this.changeList$ = new Subject();
    // Set the defaults
    this.onPatientListChanged = new BehaviorSubject({});
  }

  createPatient(patient: IPatientPost): Observable<IPatient> {
    return this._httpClient.post<IPatient>(`${this._url}/patient`, patient);
  }

  getPatients(): Observable<IResponseGetList<IPatient>> {
    return this._httpClient
      .get<IResponseGetList<IPatientResponse>>(`${this._url}/patient`)
      .pipe(
        map(
          (
            response: IResponseGetList<IPatientResponse>
          ): IResponseGetList<IPatient> => ({
            count: response.count,
            data: response.data.map(patientAdapter),
          })
        )
      );
  }
  getPatientsById(idPatient: number): Observable<IResponseGetList<IPatient>> {
    return this._httpClient
      .get<IResponseGetList<IPatientResponse>>(`${this._url}/patient/${idPatient}`)
      .pipe(
        map(
          (
            response: IResponseGetList<IPatientResponse>
          ): IResponseGetList<IPatient> => ({
            count: response.count,
            data: response.data.map(patientAdapter),
          })
        )
      );
  }

  updatePatient(patientPut: IPatientPut): Observable<IPatient> {
    return this._httpClient.put<IPatient>(
      `${this._url}/patient/${patientPut.id}`,
      patientPut
    );
  }

  deletePatient(idPatient: number): Observable<IPatient> {
    return this._httpClient.delete<IPatient>(
      `${this._url}/patient/${idPatient}`
    );
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return new Promise<void>((resolve, reject) => {
      Promise.all([this.getDataTableRows()]).then(() => {
        resolve();
      }, reject);
    });
  }

  getDataTableRows(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get("api/patients-data").subscribe((response: any) => {
        this.rows = response;
        this.onPatientListChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }
}
