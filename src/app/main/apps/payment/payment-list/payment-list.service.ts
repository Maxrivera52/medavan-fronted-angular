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
  IPayment,
  IPaymentPost,
  IPaymentPut,
  IPaymentResponse,
} from "../models/payment.model";
import { IResponseGetList } from "@core/models/response-http.model";
import { map } from "rxjs/operators";
import { paymentAdapter } from "../adapters/payment.adapter";

@Injectable({
  providedIn: "root",
})
export class PaymentListService implements Resolve<any> {
  public rows: any;
  public onPaymentListChanged: BehaviorSubject<any>;
  public paymentSelected$: Subject<IPayment>;
  public changeList$: Subject<void>;

  private _url: string;

  constructor(private _httpClient: HttpClient) {
    this._url = environment.apiUrl;
    this.paymentSelected$ = new Subject();
    this.changeList$ = new Subject();
    // Set the defaults
    this.onPaymentListChanged = new BehaviorSubject({});
  }

  
  createPayment(payment: IPaymentPost): Observable<IResponse> {
    return this._httpClient.post<IResponse>(`${this._url}/payment`, payment);
  }

  getPayments(): Observable<IResponseGetList<IPayment>> {
    return this._httpClient
      .get<IResponseGetList<IPaymentResponse>>(`${this._url}/payment`)
      .pipe(
        map(
          (
            response: IResponseGetList<IPaymentResponse>
          ): IResponseGetList<IPayment> => ({
            count: response.count,
            data: response.data.map(paymentAdapter),
          })
        )
      );
  }

  updatePayment(paymentPut: IPaymentPut): Observable<IResponse> {
    return this._httpClient.put<IResponse>(
      `${this._url}/payment/${paymentPut.id}`,
      paymentPut
    );
  }

  deletePayment(idPayment: number): Observable<IResponse> {
    return this._httpClient.delete<IResponse>(
      `${this._url}/payment/${idPayment}`
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
        .get("api/payment-data")
        .subscribe((response: any) => {
          this.rows = response;
          this.onPaymentListChanged.next(this.rows);
          resolve(this.rows);
        }, reject);
    });
  }
}
