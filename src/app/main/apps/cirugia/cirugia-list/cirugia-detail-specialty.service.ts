import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { IResponse } from "@core/models";

import { environment } from "environments/environment";
import {
  ICirugiaDetailSpecialty,
  ICirugiaDetailSpecialtyPost,
  ICirugiaDetailSpecialtyPut,
} from "../models/cirugia-detail-specialty";
import { IResponseGetList } from "@core/models/response-http.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CirugiaDetailSpecialtyService {

  public rows: any;
  public onCirugiaListChanged: BehaviorSubject<any>;
  public cirugiaDetailSelected$: Subject<ICirugiaDetailSpecialty>;
  public changeList$: Subject<void>;

  private _url: string;

  constructor(private _httpClient: HttpClient) {
    this._url = environment.apiUrl;
    this.cirugiaDetailSelected$ = new Subject();
    this.changeList$ = new Subject();
    // Set the defaults
    this.onCirugiaListChanged = new BehaviorSubject({});
  }

  
  create(obj: ICirugiaDetailSpecialtyPost): Observable<IResponse> {
    return this._httpClient.post<IResponse>(`${this._url}/cirugiadetailspecialty`, obj);
  }

  getCirugiaDetailSpecialty(): Observable<IResponseGetList<ICirugiaDetailSpecialty>> {
    return this._httpClient
      .get<IResponseGetList<ICirugiaDetailSpecialty>>(`${this._url}/cirugiadetailspecialty`)
      .pipe(
        map(
          (
            response: IResponseGetList<ICirugiaDetailSpecialty>
          ): IResponseGetList<ICirugiaDetailSpecialty> => ({
            count: response.count,
            data: response.data,
          })
        )
      );
  }
  getCirugiaDetailByIdCirugia(id: number): Observable<IResponseGetList<ICirugiaDetailSpecialty>> {
    return this._httpClient
      .get<IResponseGetList<ICirugiaDetailSpecialty>>(`${this._url}/cirugiadetailspecialty/${id}`)
      .pipe(
        map(
          (
            response: IResponseGetList<ICirugiaDetailSpecialty>
          ): IResponseGetList<ICirugiaDetailSpecialty> => ({
            count: response.count,
            data: response.data,
          })
        )
      );
  }

  deleteCirugiaDetailSpecialty(id: number): Observable<IResponse> {
    return this._httpClient.delete<IResponse>(
      `${this._url}/cirugiadetailspecialty/${id}`
    );
  }

}
