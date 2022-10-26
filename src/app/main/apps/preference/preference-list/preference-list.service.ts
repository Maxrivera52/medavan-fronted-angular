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
  IPreference,
  IPreferencePost,
  IPreferencePut,
  IPreferenceResponse,
} from "../models/preference.model";
import { IResponseGetList } from "@core/models/response-http.model";
import { map } from "rxjs/operators";
import { preferenceAdapter } from "../adapters/preference.adapter";

@Injectable({
  providedIn: "root",
})
export class PreferenceListService implements Resolve<any> {
  public rows: any;
  public onPreferenceListChanged: BehaviorSubject<any>;
  public preferenceSelected$: Subject<IPreference>;
  public changeList$: Subject<void>;
 
  private _url: string;

  constructor(private _httpClient: HttpClient) {
    this._url = environment.apiUrl;
    this.preferenceSelected$ = new Subject();
    this.changeList$ = new Subject();
    // Set the defaults
    this.onPreferenceListChanged = new BehaviorSubject({});
  }

  createPreference(preference: IPreferencePost): Observable<IResponse> {
    return this._httpClient.post<IResponse>(
      `${this._url}/preference`,
      preference
    );
  }

  getPreferences(): Observable<IResponseGetList<IPreference>> {
    return this._httpClient
      .get<IResponseGetList<IPreferenceResponse>>(`${this._url}/preference`)
      .pipe(
        map(
          (
            response: IResponseGetList<IPreferenceResponse>
          ): IResponseGetList<IPreference> => ({
            count: response.count,
            data: response.data.map(preferenceAdapter),
          })
        )
      );
  }

  updatePreference(preferencePut: IPreferencePut): Observable<IResponse> {
    return this._httpClient.put<IResponse>(`${this._url}/preference/${preferencePut.id}`, preferencePut);
  }

  deletePreference(idMaterial: number): Observable<IResponse> {
    return this._httpClient.delete<IResponse>(`${this._url}/preference/${idMaterial}`);
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
      this._httpClient
        .get("api/preferences-data")
        .subscribe((response: any) => {
          this.rows = response;
          this.onPreferenceListChanged.next(this.rows);
          resolve(this.rows);
        }, reject);
    });
  }
}
