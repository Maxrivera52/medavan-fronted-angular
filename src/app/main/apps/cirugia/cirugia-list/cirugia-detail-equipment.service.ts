import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { IResponse } from "@core/models";

import { environment } from "environments/environment";
import {
  ICirugiaDetailEquipment,
  ICirugiaDetailEquipmentPost,
  ICirugiaDetailEquipmentPut,
} from "../models/cirugia-detail-equipment";
import { IResponseGetList } from "@core/models/response-http.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CirugiaDetailEquipmentService {

  public rows: any;
  public onCirugiaListChanged: BehaviorSubject<any>;
  public cirugiaDetailSelected$: Subject<ICirugiaDetailEquipment>;
  public changeList$: Subject<void>;

  private _url: string;

  constructor(private _httpClient: HttpClient) {
    this._url = environment.apiUrl;
    this.cirugiaDetailSelected$ = new Subject();
    this.changeList$ = new Subject();
    // Set the defaults
    this.onCirugiaListChanged = new BehaviorSubject({});
  }

  
  create(obj: ICirugiaDetailEquipmentPost): Observable<IResponse> {
    return this._httpClient.post<IResponse>(`${this._url}/cirugiadetailequipment`, obj);
  }

  getCirugiaDetailEquipment(): Observable<IResponseGetList<ICirugiaDetailEquipment>> {
    return this._httpClient
      .get<IResponseGetList<ICirugiaDetailEquipment>>(`${this._url}/cirugiadetailequipment`)
      .pipe(
        map(
          (
            response: IResponseGetList<ICirugiaDetailEquipment>
          ): IResponseGetList<ICirugiaDetailEquipment> => ({
            count: response.count,
            data: response.data,
          })
        )
      );
  }
  getCirugiaDetailByIdCirugia(id: number): Observable<IResponseGetList<ICirugiaDetailEquipment>> {
    return this._httpClient
      .get<IResponseGetList<ICirugiaDetailEquipment>>(`${this._url}/cirugiadetailequipment/${id}`)
      .pipe(
        map(
          (
            response: IResponseGetList<ICirugiaDetailEquipment>
          ): IResponseGetList<ICirugiaDetailEquipment> => ({
            count: response.count,
            data: response.data,
          })
        )
      );
  }

  deleteCirugiaDetailEquipment(id: number): Observable<IResponse> {
    return this._httpClient.delete<IResponse>(
      `${this._url}/cirugiadetailequipment/${id}`
    );
  }

}
