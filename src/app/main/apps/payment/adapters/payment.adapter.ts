import { IPayment, IPaymentResponse } from "../models/payment.model";

export const paymentAdapter = (
  paymentResponse: IPaymentResponse
): IPayment => ({
  idPayment: paymentResponse.idpayment,
  description: paymentResponse.description,
  enable: paymentResponse.enable,
  createdAt: paymentResponse.created_at,
  updatedAt: paymentResponse.updated_at,
});
