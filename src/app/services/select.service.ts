import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponseGetList } from '@core/models/response-http.model';
import { IDocumentTypeResponse } from '@core/models/selects.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SelectService {

  private _url: string;

  constructor(private _httpClient:HttpClient) { 
    this._url = environment.apiUrl;
  }

  getDocumentTypes ():Observable<IResponseGetList<IDocumentTypeResponse>> {
      return this._httpClient
        .get<IResponseGetList<IDocumentTypeResponse>>(`${this._url}/documenttype`)
        .pipe(
          map(
            (
              response: IResponseGetList<IDocumentTypeResponse>
            ): IResponseGetList<IDocumentTypeResponse> => ({
              count: response.count,
              data: response.data
            })
          )
        );
  }
}
