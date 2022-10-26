import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";

import { BehaviorSubject, Observable, Subject } from "rxjs";

import { environment } from "environments/environment";


@Injectable({
  providedIn: "root",
})
export class SurveyListService implements Resolve<any> {
  public rows: any;
  public onPatientListChanged: BehaviorSubject<any>;
  public changeList$: Subject<void>;

  private _url: string;

  constructor(private _httpClient: HttpClient) {
    this._url = environment.apiUrl;
    // this.patientSelected$ = new Subject();
    this.changeList$ = new Subject();
    // Set the defaults
    this.onPatientListChanged = new BehaviorSubject({});
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
      this._httpClient.get("api/patients-data").subscribe((response: any) => {
        this.rows = response;
        this.onPatientListChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }
}
