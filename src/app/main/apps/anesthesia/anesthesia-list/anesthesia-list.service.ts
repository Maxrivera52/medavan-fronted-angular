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
  IAnesthesia,
  IAnesthesiaPost,
  IAnesthesiaPut,
  IAnesthesiaResponse,
} from "../models/anesthesia.model";
import { IResponseGetList } from "@core/models/response-http.model";
import { map } from "rxjs/operators";
import { anesthesiaAdapter } from "../adapters/anesthesia.adapter";

@Injectable({
  providedIn: "root",
})
export class AnesthesiaListService implements Resolve<any> {
  public rows: any;
  public onAnesthesiaListChanged: BehaviorSubject<any>;
  public anesthesiaSelected$: Subject<IAnesthesia>;
  public changeList$: Subject<void>;

  private _url: string;

  constructor(private _httpClient: HttpClient) {
    this._url = environment.apiUrl;
    this.anesthesiaSelected$ = new Subject();
    this.changeList$ = new Subject();
    // Set the defaults
    this.onAnesthesiaListChanged = new BehaviorSubject({});
  }

  
  createAnesthesia(anesthesia: IAnesthesiaPost): Observable<IResponse> {
    return this._httpClient.post<IResponse>(`${this._url}/anesthesia`, anesthesia);
  }

  getAnesthesias(): Observable<IResponseGetList<IAnesthesia>> {
    return this._httpClient
      .get<IResponseGetList<IAnesthesiaResponse>>(`${this._url}/anesthesia`)
      .pipe(
        map(
          (
            response: IResponseGetList<IAnesthesiaResponse>
          ): IResponseGetList<IAnesthesia> => ({
            count: response.count,
            data: response.data.map(anesthesiaAdapter),
          })
        )
      );
  }

  updateAnesthesia(anesthesiaPut: IAnesthesiaPut): Observable<IResponse> {
    return this._httpClient.put<IResponse>(
      `${this._url}/anesthesia/${anesthesiaPut.id}`,
      anesthesiaPut
    );
  }

  deleteAnesthesia(idAnesthesia: number): Observable<IResponse> {
    return this._httpClient.delete<IResponse>(
      `${this._url}/anesthesia/${idAnesthesia}`
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
      this._httpClient
        .get("api/anesthesia-data")
        .subscribe((response: any) => {
          this.rows = response;
          this.onAnesthesiaListChanged.next(this.rows);
          resolve(this.rows);
        }, reject);
    });
  }
}
