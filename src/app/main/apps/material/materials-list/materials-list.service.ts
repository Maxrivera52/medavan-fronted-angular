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
  IMaterial,
  IMaterialPost,
  IMaterialPut,
  IMaterialResponse,
} from "../models/material.model";
import { IResponseGetList } from "@core/models/response-http.model";
import { map } from "rxjs/operators";
import { materialAdapter } from "../adapters/material.adapter";

@Injectable({
  providedIn: "root",
})
export class MaterialListService implements Resolve<any> {
  public rows: any;
  public onMaterialListChanged: BehaviorSubject<any>;
  public materialSelected$: Subject<IMaterial>;
  public changeList$: Subject<void>;

  private _url: string;

  constructor(private _httpClient: HttpClient) {
    this._url = environment.apiUrl;
    this.materialSelected$ = new Subject();
    this.changeList$ = new Subject();
    // Set the defaults
    this.onMaterialListChanged = new BehaviorSubject({});
  }

  createMaterial(material: IMaterialPost): Observable<IResponse> {
    return this._httpClient.post<IResponse>(`${this._url}/material`, material);
  }

  getMaterials(): Observable<IResponseGetList<IMaterial>> {
    return this._httpClient
      .get<IResponseGetList<IMaterialResponse>>(`${this._url}/material`)
      .pipe(
        map(
          (
            response: IResponseGetList<IMaterialResponse>
          ): IResponseGetList<IMaterial> => ({
            count: response.count,
            data: response.data.map(materialAdapter),
          })
        )
      );
  }

  updateMaterial(materialPut: IMaterialPut): Observable<IResponse> {
    return this._httpClient.put<IResponse>(
      `${this._url}/material/${materialPut.id}`,
      materialPut
    );
  }

  deleteMaterial(idMaterial: number): Observable<IResponse> {
    return this._httpClient.delete<IResponse>(
      `${this._url}/material/${idMaterial}`
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
      this._httpClient.get("api/materials-data").subscribe((response: any) => {
        this.rows = response;
        this.onMaterialListChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }
}
