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
  ICirugia,
  ICirugiaPost,
  ICirugiaPut,
  ICirugiaResponse,
} from "../models/cirugia.model";
import { IResponseGetList } from "@core/models/response-http.model";
import { map } from "rxjs/operators";
import { cirugiaAdapter } from "../adapters/cirugia.adapter";

@Injectable({
  providedIn: "root",
})
export class CirugiaListService implements Resolve<any> {
  public rows: any;
  public onCirugiaListChanged: BehaviorSubject<any>;
  public cirugiaSelected$: Subject<ICirugia>;
  public changeList$: Subject<void>;

  private _url: string;

  
  constructor(private _httpClient: HttpClient) {
    this._url = environment.apiUrl;
    this.cirugiaSelected$ = new Subject();
    this.changeList$ = new Subject();
    // Set the defaults
    this.onCirugiaListChanged = new BehaviorSubject({});
  }

  
  createCirugia(cirugia: ICirugiaPost): Observable<ICirugia> {
    return this._httpClient.post<ICirugia>(`${this._url}/cirugia`, cirugia);
  }

  getCirugias(): Observable<IResponseGetList<ICirugia>> {
    return this._httpClient
      .get<IResponseGetList<ICirugiaResponse>>(`${this._url}/cirugia`)
      .pipe(
        map(
          (
            response: IResponseGetList<ICirugiaResponse>
          ): IResponseGetList<ICirugia> => ({
            count: response.count,
            data: response.data.map(cirugiaAdapter),
          })
        )
      );
  }
  getCirugiasById(idCirugia: number): Observable<IResponseGetList<ICirugia>> {
    return this._httpClient
      .get<IResponseGetList<ICirugiaResponse>>(`${this._url}/cirugia/${idCirugia}`)
      .pipe(
        map(
          (
            response: IResponseGetList<ICirugiaResponse>
          ): IResponseGetList<ICirugia> => ({
            count: response.count,
            data: response.data.map(cirugiaAdapter)
          })
        )
      );
  }
  getCirugiasByIdSpecialty(idspecialty: number): Observable<IResponseGetList<ICirugia>> {
    return this._httpClient
      .get<IResponseGetList<ICirugiaResponse>>(`${this._url}/cirugia/specialty/${idspecialty}`)
      .pipe(
        map(
          (
            response: IResponseGetList<ICirugiaResponse>
          ): IResponseGetList<ICirugia> => ({
            count: response.count,
            data: response.data.map(cirugiaAdapter)
          })
        )
      );
  }
  updateCirugia(cirugiaPut: ICirugiaPut): Observable<ICirugia> {
    return this._httpClient.put<ICirugia>(
      `${this._url}/cirugia/${cirugiaPut.id}`,
      cirugiaPut
    );
  }

  deleteCirugia(idCirugia: number): Observable<ICirugia> {
    return this._httpClient.delete<ICirugia>(
      `${this._url}/cirugia/${idCirugia}`
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
      this._httpClient.get("api/cirugias-data").subscribe((response: any) => {
        this.rows = response;
        this.onCirugiaListChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }
}
