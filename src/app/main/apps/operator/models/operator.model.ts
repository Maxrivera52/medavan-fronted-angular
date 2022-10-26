export interface IOperatorPost {
  first_name: string;
  last_name: string;
  email: string;
  cellphone: string;
}

export interface IOperatorPut extends IOperatorPost {
    id: number;
}

export interface IOperator {
  idOperator: number;
  firstName: string;
  lastName: string;
  email: string;
  cellphone: string;
  enable: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOperatorResponse {
  idoperator: number;
  first_name: string;
  last_name: string;
  email: string;
  cellphone: string;
  enable: number;
  created_at: Date;
  updated_at: Date;
}
