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
  IOrigin,
  IOriginPost,
  IOriginPut,
  IOriginResponse,
} from "../models/origin.model";
import { IResponseGetList } from "@core/models/response-http.model";
import { map } from "rxjs/operators";
import { originAdapter } from "../adapters/origin.adapter";

@Injectable({
  providedIn: "root",
})
export class OriginListService implements Resolve<any> {
  public rows: any;
  public onOriginListChanged: BehaviorSubject<any>;
  public originSelected$: Subject<IOrigin>;
  public changeList$: Subject<void>;

  
  private _url: string;

  constructor(private _httpClient: HttpClient) {
    this._url = environment.apiUrl;
    this.originSelected$ = new Subject();
    this.changeList$ = new Subject();
    // Set the defaults
    this.onOriginListChanged = new BehaviorSubject({});
  }

  createOrigin(origin: IOriginPost): Observable<IResponse> {
    return this._httpClient.post<IResponse>(
      `${this._url}/source`,
      origin
    );
  }

  getOrigins(): Observable<IResponseGetList<IOrigin>> {
    return this._httpClient
      .get<IResponseGetList<IOriginResponse>>(`${this._url}/source`)
      .pipe(
        map(
          (
            response: IResponseGetList<IOriginResponse>
          ): IResponseGetList<IOrigin> => ({
            count: response.count,
            data: response.data.map(originAdapter),
          })
        )
      );
  }

  updateOrigin(originPut: IOriginPut): Observable<IResponse> {
    return this._httpClient.put<IResponse>(`${this._url}/source/${originPut.id}`, originPut);
  }

  deleteOrigin(idOrigin: number): Observable<IResponse> {
    return this._httpClient.delete<IResponse>(`${this._url}/source/${idOrigin}`);
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
      this._httpClient.get("api/origins-data").subscribe((response: any) => {
        this.rows = response;
        this.onOriginListChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }
}
