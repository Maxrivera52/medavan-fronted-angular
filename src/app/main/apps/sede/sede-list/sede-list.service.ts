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
import { ISede, ISedePost, ISedePut, ISedeResponse } from "../models/sede.model";
import { IResponseGetList } from "@core/models/response-http.model";
import { map } from "rxjs/operators";
import { sedeAdapter } from "../adapters/sede.adapter";

@Injectable({
  providedIn: "root",
})
export class SedeListService implements Resolve<any> {
  public rows: any;
  public onSedeListChanged: BehaviorSubject<any>;
  public sedeSelected$: Subject<ISede>;
  public changeList$: Subject<void>;

  private _url: string;

  constructor(private _httpClient: HttpClient) {
    this._url = environment.apiUrl;
    this.sedeSelected$ = new Subject();
    this.changeList$ = new Subject();
    // Set the defaults
    this.onSedeListChanged = new BehaviorSubject({});
  }

  createSede(sede: ISedePost): Observable<IResponse> {
    return this._httpClient.post<IResponse>(`${this._url}/sede`, sede);
  }

  getSedes(): Observable<IResponseGetList<ISede>> {
    return this._httpClient
      .get<IResponseGetList<ISedeResponse>>(`${this._url}/sede`)
      .pipe(
        map(
          (
            response: IResponseGetList<ISedeResponse>
          ): IResponseGetList<ISede> => ({
            count: response.count,
            data: response.data.map(sedeAdapter),
          })
        )
      );
  }

  updateSede(sedePut: ISedePut): Observable<IResponse> {
    return this._httpClient.put<IResponse>(
      `${this._url}/sede/${sedePut.id}`,
      sedePut
    );
  }

  deleteSede(idSede: number): Observable<IResponse> {
    return this._httpClient.delete<IResponse>(`${this._url}/sede/${idSede}`);
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
      this._httpClient.get("api/sedes-data").subscribe((response: any) => {
        this.rows = response;
        this.onSedeListChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }
}
