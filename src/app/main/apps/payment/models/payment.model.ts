export interface IPaymentPost {
  description: string;
}

export interface IPaymentPut extends IPaymentPost {
    id: number;
}

export interface IPayment {
  idPayment: number;
  description: string;
  enable: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPaymentResponse {
  idpayment: number;
  description: string;
  enable: number;
  created_at: Date;
  updated_at: Date;
}
