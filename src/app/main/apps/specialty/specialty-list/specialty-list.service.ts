import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";

import { BehaviorSubject, Observable, Subject } from "rxjs";

import { IResponse } from "@core/models";

import { environment } from "environments/environment";
import {
  ISpecialty,
  ISpecialtyPost,
  ISpecialtyPut,
  ISpecialtyResponse,
} from "../models/specialty.model";
import { IResponseGetList } from "@core/models/response-http.model";
import { map } from "rxjs/operators";
import { specialtyAdapter } from "../adapters/specialty.adapter";

@Injectable({
  providedIn: "root",
})
export class SpecialtyListService implements Resolve<any> {
  public rows: any;
  public onSpecialtyListChanged: BehaviorSubject<any>;
  public specialtySelected$: Subject<ISpecialty>;
  public changeList$: Subject<void>;

  private _url: string;

  constructor(private _httpClient: HttpClient) {
    this._url = environment.apiUrl;
    this.specialtySelected$ = new Subject();
    this.changeList$ = new Subject();
    // Set the defaults
    this.onSpecialtyListChanged = new BehaviorSubject({});
  }


  createSpecialty(specialty: ISpecialtyPost): Observable<IResponse> {
    return this._httpClient.post<IResponse>(
      `${this._url}/specialty`,
      specialty
    );
  }

  getSpecialtys(): Observable<IResponseGetList<ISpecialty>> {
    return this._httpClient
      .get<IResponseGetList<ISpecialtyResponse>>(`${this._url}/specialty`)
      .pipe(
        map(
          (
            response: IResponseGetList<ISpecialtyResponse>
          ): IResponseGetList<ISpecialty> => ({
            count: response.count,
            data: response.data.map(specialtyAdapter),
          })
        )
      );
  }

  updateSpecialty(specialtyPut: ISpecialtyPut): Observable<IResponse> {
    return this._httpClient.put<IResponse>(`${this._url}/specialty/${specialtyPut.id}`, specialtyPut);
  }

  deleteSpecialty(idSpecialty: number): Observable<IResponse> {
    return this._httpClient.delete<IResponse>(`${this._url}/specialty/${idSpecialty}`);
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
      this._httpClient.get("api/specialtys-data").subscribe((response: any) => {
        this.rows = response;
        this.onSpecialtyListChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }
}
