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
  ICirugiaDetailAnesthesia,
  ICirugiaDetailAnesthesiaPost,
  ICirugiaDetailAnesthesiaPut,
 // IDiagnosticoResponse,
} from "../models/cirugia-detail-anesthesia";
import { IResponseGetList } from "@core/models/response-http.model";
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class CirugiaDetailAnesthesiaService{
  public rows: any;
  public onCirugiaListChanged: BehaviorSubject<any>;
  public cirugiaDetailSelected$: Subject<ICirugiaDetailAnesthesia>;
  public changeList$: Subject<void>;

  private _url: string;

  constructor(private _httpClient: HttpClient) {
    this._url = environment.apiUrl;
    this.cirugiaDetailSelected$ = new Subject();
    this.changeList$ = new Subject();
    // Set the defaults
    this.onCirugiaListChanged = new BehaviorSubject({});
  }

  
  create(obj: ICirugiaDetailAnesthesiaPost): Observable<IResponse> {
    return this._httpClient.post<IResponse>(`${this._url}/cirugiadetailanesthesia`, obj);
  }

  getCirugiaDetailAnesthesia(): Observable<IResponseGetList<ICirugiaDetailAnesthesia>> {
    return this._httpClient
      .get<IResponseGetList<ICirugiaDetailAnesthesia>>(`${this._url}/cirugiadetailanesthesia`)
      .pipe(
        map(
          (
            response: IResponseGetList<ICirugiaDetailAnesthesia>
          ): IResponseGetList<ICirugiaDetailAnesthesia> => ({
            count: response.count,
            data: response.data,
          })
        )
      );
  }
  getCirugiaDetailByIdCirugia(id: number): Observable<IResponseGetList<ICirugiaDetailAnesthesia>> {
    return this._httpClient
      .get<IResponseGetList<ICirugiaDetailAnesthesia>>(`${this._url}/cirugiadetailanesthesia/${id}`)
      .pipe(
        map(
          (
            response: IResponseGetList<ICirugiaDetailAnesthesia>
          ): IResponseGetList<ICirugiaDetailAnesthesia> => ({
            count: response.count,
            data: response.data,
          })
        )
      );
  }

  deleteCirugiaDetailAnesthesia(id: number): Observable<IResponse> {
    return this._httpClient.delete<IResponse>(
      `${this._url}/cirugiadetailanesthesia/${id}`
    );
  }


}
