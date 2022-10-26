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
  IProveedor,
  IProveedorPost,
  IProveedorPut,
  IProveedorResponse,
} from "../models/proveedor.model";
import { IResponseGetList } from "@core/models/response-http.model";
import { map } from "rxjs/operators";
import { proveedorAdapter } from "../adapters/proveedor.adapter";

@Injectable({
  providedIn: "root",
})
export class ProveedorListService implements Resolve<any> {
  public rows: any;
  public onProveedorListChanged: BehaviorSubject<any>;
  public proveedorSelected$: Subject<IProveedor>;
  public changeList$: Subject<void>;

  private _url: string;

  constructor(private _httpClient: HttpClient) {
    this._url = environment.apiUrl;
    this.proveedorSelected$ = new Subject();
    this.changeList$ = new Subject();
    // Set the defaults
    this.onProveedorListChanged = new BehaviorSubject({});
  }


  createProveedor(proveedor: IProveedorPost): Observable<IResponse> {
    return this._httpClient.post<IResponse>(`${this._url}/supplier`, proveedor);
  }

  getProveedors(): Observable<IResponseGetList<IProveedor>> {
    return this._httpClient
      .get<IResponseGetList<IProveedorResponse>>(`${this._url}/supplier`)
      .pipe(
        map(
          (
            response: IResponseGetList<IProveedorResponse>
          ): IResponseGetList<IProveedor> => ({
            count: response.count,
            data: response.data.map(proveedorAdapter),
          })
        )
      );
  }

  updateProveedor(proveedorPut: IProveedorPut): Observable<IResponse> {
    return this._httpClient.put<IResponse>(
      `${this._url}/supplier/${proveedorPut.id}`,
      proveedorPut
    );
  }

  deleteProveedor(idProveedor: number): Observable<IResponse> {
    return this._httpClient.delete<IResponse>(
      `${this._url}/supplier/${idProveedor}`
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
      this._httpClient.get("api/suppliers-data").subscribe((response: any) => {
        this.rows = response;
        this.onProveedorListChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }
}
