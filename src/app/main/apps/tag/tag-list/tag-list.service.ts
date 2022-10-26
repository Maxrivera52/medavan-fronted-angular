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
import { ITag, ITagPost, ITagPut, ITagResponse } from "../models/tag.model";
import { IResponseGetList } from "@core/models/response-http.model";
import { map } from "rxjs/operators";
import { tagAdapter } from "../adapters/tag.adapter";

@Injectable({
  providedIn: "root",
})
export class TagListService implements Resolve<any> {
  public rows: any;
  public onTagListChanged: BehaviorSubject<any>;
  public tagSelected$: Subject<ITag>;
  public changeList$: Subject<void>;

  private _url: string;

  constructor(private _httpClient: HttpClient) {
    this._url = environment.apiUrl;
    this.tagSelected$ = new Subject();
    this.changeList$ = new Subject();
    // Set the defaults
    this.onTagListChanged = new BehaviorSubject({});
  }

  createTag(tag: ITagPost): Observable<IResponse> {
    return this._httpClient.post<IResponse>(`${this._url}/tag`, tag);
  }

  getTags(): Observable<IResponseGetList<ITag>> {
    return this._httpClient
      .get<IResponseGetList<ITagResponse>>(`${this._url}/tag`)
      .pipe(
        map(
          (
            response: IResponseGetList<ITagResponse>
          ): IResponseGetList<ITag> => ({
            count: response.count,
            data: response.data.map(tagAdapter),
          })
        )
      );
  }

  updateTag(tagPut: ITagPut): Observable<IResponse> {
    return this._httpClient.put<IResponse>(
      `${this._url}/tag/${tagPut.id}`,
      tagPut
    );
  }

  deleteTag(idTag: number): Observable<IResponse> {
    return this._httpClient.delete<IResponse>(`${this._url}/tag/${idTag}`);
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
      this._httpClient.get("api/tags-data").subscribe((response: any) => {
        this.rows = response;
        this.onTagListChanged.next(this.rows);
        resolve(this.rows);
      }, reject);
    });
  }
}
