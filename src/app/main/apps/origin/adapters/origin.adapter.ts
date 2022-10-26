import { IOrigin, IOriginResponse } from "../models/origin.model";

export const originAdapter = (
  originResponse: IOriginResponse
): IOrigin => ({
  idSource: originResponse.idsource,
  description: originResponse.description,
  enable: originResponse.enable,
  createdAt: originResponse.created_at,
  updatedAt: originResponse.updated_at,
});
