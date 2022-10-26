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
  IDiagnostico,
  IDiagnosticoPost,
  IDiagnosticoPut,
  IDiagnosticoResponse,
} from "../models/diagnostico.model";
import { IResponseGetList } from "@core/models/response-http.model";
import { map } from "rxjs/operators";
import { diagnosticoAdapter } from "../adapters/diagnostico.adapter";

@Injectable({
  providedIn: "root",
})
export class DiagnosticoListService implements Resolve<any> {
  public rows: any;
  public onDiagnosticoListChanged: BehaviorSubject<any>;
  public diagnosticoSelected$: Subject<IDiagnostico>;
  public changeList$: Subject<void>;

  private _url: string;

  constructor(private _httpClient: HttpClient) {
    this._url = environment.apiUrl;
    this.diagnosticoSelected$ = new Subject();
    this.changeList$ = new Subject();
    // Set the defaults
    this.onDiagnosticoListChanged = new BehaviorSubject({});
  }

  
  createDiagnostico(diagnostico: IDiagnosticoPost): Observable<IResponse> {
    return this._httpClient.post<IResponse>(`${this._url}/diagnostic`, diagnostico);
  }

  getDiagnosticos(): Observable<IResponseGetList<IDiagnostico>> {
    return this._httpClient
      .get<IResponseGetList<IDiagnosticoResponse>>(`${this._url}/diagnostic`)
      .pipe(
        map(
          (
            response: IResponseGetList<IDiagnosticoResponse>
          ): IResponseGetList<IDiagnostico> => ({
            count: response.count,
            data: response.data.map(diagnosticoAdapter),
          })
        )
      );
  }
  getDiagnosticosByIdSpecialty(idspecialty: number): Observable<IResponseGetList<IDiagnostico>> {
    return this._httpClient
      .get<IResponseGetList<IDiagnosticoResponse>>(`${this._url}/diagnostic/specialty/${idspecialty}`)
      .pipe(
        map(
          (
            response: IResponseGetList<IDiagnosticoResponse>
          ): IResponseGetList<IDiagnostico> => ({
            count: response.count,
            data: response.data.map(diagnosticoAdapter),
          })
        )
      );
  }

  updateDiagnostico(diagnosticoPut: IDiagnosticoPut): Observable<IResponse> {
    return this._httpClient.put<IResponse>(
      `${this._url}/diagnostic/${diagnosticoPut.id}`,
      diagnosticoPut
    );
  }

  deleteDiagnostico(idDiagnostico: number): Observable<IResponse> {
    return this._httpClient.delete<IResponse>(
      `${this._url}/diagnostic/${idDiagnostico}`
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
        .get("api/diagnosticos-data")
        .subscribe((response: any) => {
          this.rows = response;
          this.onDiagnosticoListChanged.next(this.rows);
          resolve(this.rows);
        }, reject);
    });
  }
}
