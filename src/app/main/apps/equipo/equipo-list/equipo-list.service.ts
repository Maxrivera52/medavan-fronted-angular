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
  IEquipo,
  IEquipoPost,
  IEquipoPut,
  IEquipoResponse,
} from "../models/equipo.model";
import { IResponseGetList } from "@core/models/response-http.model";
import { map } from "rxjs/operators";
import { equipoAdapter } from "../adapters/equipo.adapter";

@Injectable({
  providedIn: "root",
})
export class EquipoListService implements Resolve<any> {
  public rows: any;
  public onEquipoListChanged: BehaviorSubject<any>;
  public equipoSelected$: Subject<IEquipo>;
  public changeList$: Subject<void>;

  private _url: string;

  constructor(private _httpClient: HttpClient) {
    this._url = environment.apiUrl;
    this.equipoSelected$ = new Subject();
    this.changeList$ = new Subject();
    // Set the defaults
    this.onEquipoListChanged = new BehaviorSubject({});
  }

  createEquipo(equipo: IEquipoPost): Observable<IResponse> {
    return this._httpClient.post<IResponse>(`${this._url}/equipment`, equipo);
  }

  getEquipos(): Observable<IResponseGetList<IEquipo>> {
    return this._httpClient
      .get<IResponseGetList<IEquipoResponse>>(`${this._url}/equipment`)
      .pipe(
        map(
          (
            response: IResponseGetList<IEquipoResponse>
          ): IResponseGetList<IEquipo> => ({
            count: response.count,
            data: response.data.map(equipoAdapter),
          })
        )
      );
  }

  updateEquipo(equipoPut: IEquipoPut): Observable<IResponse> {
    return this._httpClient.put<IResponse>(
      `${this._url}/equipment/${equipoPut.id}`,
      equipoPut
    );
  }

  deleteEquipo(idEquipo: number): Observable<IResponse> {
    return this._httpClient.delete<IResponse>(
      `${this._url}/equipment/${idEquipo}`
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
      this._httpClient.get("api/equipos-data").subscribe((response: any) => {
        this.rows = response;
        this.onEquipoListChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }
}
