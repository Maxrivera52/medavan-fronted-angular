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
  IOperator,
  IOperatorPost,
  IOperatorPut,
  IOperatorResponse,
} from "../models/operator.model";
import { IResponseGetList } from "@core/models/response-http.model";
import { map } from "rxjs/operators";
import { operatorAdapter } from "../adapters/operator.adapter";

@Injectable({
  providedIn: "root",
})
export class OperatorListService implements Resolve<any> {
  public rows: any;
  public onOperatorListChanged: BehaviorSubject<any>;
  public operatorSelected$: Subject<IOperator>;
  public changeList$: Subject<void>;

  private _url: string;

  constructor(private _httpClient: HttpClient) {
    this._url = environment.apiUrl;
    this.operatorSelected$ = new Subject();
    this.changeList$ = new Subject();
    // Set the defaults
    this.onOperatorListChanged = new BehaviorSubject({});
  }

  createOperator(operator: IOperatorPost): Observable<IResponse> {
    return this._httpClient.post<IResponse>(`${this._url}/operator`, operator);
  }

  getOperators(): Observable<IResponseGetList<IOperator>> {
    return this._httpClient
      .get<IResponseGetList<IOperatorResponse>>(`${this._url}/operator`)
      .pipe(
        map(
          (
            response: IResponseGetList<IOperatorResponse>
          ): IResponseGetList<IOperator> => ({
            count: response.count,
            data: response.data.map(operatorAdapter),
          })
        )
      );
  }

  updateOperator(operatorPut: IOperatorPut): Observable<IResponse> {
    return this._httpClient.put<IResponse>(
      `${this._url}/operator/${operatorPut.id}`,
      operatorPut
    );
  }

  deleteOperator(idOperator: number): Observable<IResponse> {
    return this._httpClient.delete<IResponse>(
      `${this._url}/operator/${idOperator}`
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
      this._httpClient.get("api/operators-data").subscribe((response: any) => {
        this.rows = response;
        this.onOperatorListChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }
}
