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
  IDiagnosticoDetailSpecialty,
  IDiagnosticoDetailSpecialtyPost,
  IDiagnosticoDetailSpecialtyPut,
 // IDiagnosticoResponse,
} from "../models/diagnostics-detail-specialtys.model";
import { IResponseGetList } from "@core/models/response-http.model";
import { map } from "rxjs/operators";
//import { diagnosticoAdapter } from "../adapters/diagnostico.adapter";

@Injectable({
  providedIn: "root",
})
export class DiagnosticDetailSpecialtyListService implements Resolve<any> {
  public rows: any;
  public onDiagnosticoListChanged: BehaviorSubject<any>;
  public diagnosticoDetailSelected$: Subject<IDiagnosticoDetailSpecialty>;
  public changeList$: Subject<void>;

  private _url: string;

  constructor(private _httpClient: HttpClient) {
    this._url = environment.apiUrl;
    this.diagnosticoDetailSelected$ = new Subject();
    this.changeList$ = new Subject();
    // Set the defaults
    this.onDiagnosticoListChanged = new BehaviorSubject({});
  }

  
  create(diagnostico: IDiagnosticoDetailSpecialtyPost): Observable<IResponse> {
    return this._httpClient.post<IResponse>(`${this._url}/diagnosticdetailspecialtys`, diagnostico);
  }

  getDiagnosticosDetailSpecialty(): Observable<IResponseGetList<IDiagnosticoDetailSpecialty>> {
    return this._httpClient
      .get<IResponseGetList<IDiagnosticoDetailSpecialty>>(`${this._url}/diagnosticdetailspecialtys`)
      .pipe(
        map(
          (
            response: IResponseGetList<IDiagnosticoDetailSpecialty>
          ): IResponseGetList<IDiagnosticoDetailSpecialty> => ({
            count: response.count,
            data: response.data,
          })
        )
      );
  }
  getDiagnosticosDetailByIdDiagnostic(id: number): Observable<IResponseGetList<IDiagnosticoDetailSpecialty>> {
    return this._httpClient
      .get<IResponseGetList<IDiagnosticoDetailSpecialty>>(`${this._url}/diagnosticdetailspecialtys/${id}`)
      .pipe(
        map(
          (
            response: IResponseGetList<IDiagnosticoDetailSpecialty>
          ): IResponseGetList<IDiagnosticoDetailSpecialty> => ({
            count: response.count,
            data: response.data,
          })
        )
      );
  }

  updateDiagnostico(diagnosticoPut: IDiagnosticoDetailSpecialtyPut): Observable<IResponse> {
    return this._httpClient.put<IResponse>(
      `${this._url}/diagnostic/${diagnosticoPut.id}`,
      diagnosticoPut
    );
  }

  deleteDiagnosticDetailSpecialty(idDiagnostico: number): Observable<IResponse> {
    return this._httpClient.delete<IResponse>(
      `${this._url}/diagnosticdetailspecialtys/${idDiagnostico}`
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
