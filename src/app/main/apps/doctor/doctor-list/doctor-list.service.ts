import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";

import { BehaviorSubject, Observable , Subject} from "rxjs";

import { IResponse } from "@core/models";

import { environment } from "environments/environment";
import {
  IDoctor,
  IDoctorPost,
  IDoctorPut,
  IDoctorResponse,
} from "../models/doctor.model";
import { IResponseGetList } from "@core/models/response-http.model";
import { map } from "rxjs/operators";
import { doctorAdapter } from "../adapters/doctor.adapter";

@Injectable({
  providedIn: "root",
})
export class DoctorListService implements Resolve<any> {
  public rows: any;
  public onDoctorListChanged: BehaviorSubject<any>;
  public doctorSelected$: Subject<IDoctor>;
  public changeList$: Subject<void>;
  
  private _url: string;
  
  constructor(private _httpClient: HttpClient) {
    this._url = environment.apiUrl;
    this.doctorSelected$ = new Subject();
    this.changeList$ = new Subject();
    // Set the defaults
    this.onDoctorListChanged = new BehaviorSubject({});
  }

  createDoctor(doctor: IDoctorPost): Observable<IResponse> {
    return this._httpClient.post<IResponse>(`${this._url}/doctor`, doctor);
  }

  getDoctors(): Observable<IResponseGetList<IDoctor>> {
    return this._httpClient
      .get<IResponseGetList<IDoctorResponse>>(`${this._url}/doctor`)
      .pipe(
        map(
          (
            response: IResponseGetList<IDoctorResponse>
          ): IResponseGetList<IDoctor> => ({
            count: response.count,
            data: response.data.map(doctorAdapter),
          })
        )
      );
  }
  getDoctorsById(idDoctor: number): Observable<IResponseGetList<IDoctor>> {
    return this._httpClient
      .get<IResponseGetList<IDoctorResponse>>(`${this._url}/doctor/${idDoctor}`)
      .pipe(
        map(
          (
            response: IResponseGetList<IDoctorResponse>
          ): IResponseGetList<IDoctor> => ({
            count: response.count,
            data: response.data.map(doctorAdapter),
          })
        )
      );
  }

  updateDoctor(doctorPut: IDoctorPut): Observable<IResponse> {
    return this._httpClient.put<IResponse>(
      `${this._url}/doctor/${doctorPut.id}`,
      doctorPut
    );
  }

  deleteDoctor(idDoctor: number): Observable<IResponse> {
    return this._httpClient.delete<IResponse>(
      `${this._url}/doctor/${idDoctor}`
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

  /**
   * Get rows
   */
  getDataTableRows(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get("api/doctors-data").subscribe((response: any) => {
        this.rows = response;
        this.onDoctorListChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }
}
