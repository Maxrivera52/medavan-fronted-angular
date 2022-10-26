import { IOperator, IOperatorResponse } from "../models/operator.model";

export const operatorAdapter = (
  operatorResponse: IOperatorResponse
): IOperator => ({
  idOperator: operatorResponse.idoperator,
  firstName: operatorResponse.first_name,
  lastName: operatorResponse.last_name,
  email: operatorResponse.email,
  cellphone: operatorResponse.cellphone,
  enable: operatorResponse.enable,
  createdAt: operatorResponse.created_at,
  updatedAt: operatorResponse.updated_at,
});
