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
  IUser,
  IUserPost,
  IUserPut,
  IUserResponse,
} from "../models/user.model";
import { IResponseGetList } from "@core/models/response-http.model";
import { map } from "rxjs/operators";
import { userAdapter } from "../adapters/user.adapter";

@Injectable({
  providedIn: "root",
})
export class UserListService implements Resolve<any> {
  public rows: any;
  public onUserListChanged: BehaviorSubject<any>;
  public userSelected$: Subject<IUser>;
  public changeList$: Subject<void>;

  private _url: string;

  constructor(private _httpClient: HttpClient) {
    this._url = environment.apiUrl;
    this.userSelected$ = new Subject();
    this.changeList$ = new Subject();
    // Set the defaults
    this.onUserListChanged = new BehaviorSubject({});
  }

  createUser(userAdd: IUserPost): Observable<IResponse> {
    return this._httpClient.post<IResponse>(`${this._url}/user`, userAdd);
  }

  getUsers(): Observable<IResponseGetList<IUser>> {
    return this._httpClient
      .get<IResponseGetList<IUserResponse>>(`${this._url}/user`)
      .pipe(
        map(
          (
            response: IResponseGetList<IUserResponse>
          ): IResponseGetList<IUser> => ({
            count: response.count,
            data: response.data.map(userAdapter),
          })
        )
      );
  }

  updateUser(userPut: IUserPut): Observable<IResponse> {
    return this._httpClient.put<IResponse>(
      `${this._url}/user/${userPut.id}`,
      userPut
    );
  }

  deleteUser(id: number): Observable<IResponse> {
    return this._httpClient.delete<IResponse>(
      `${this._url}/user/${id}`
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
      this._httpClient.get("api/users-data").subscribe((response: any) => {
        this.rows = response;
        this.onUserListChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }
}