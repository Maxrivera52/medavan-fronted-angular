import { ITag, ITagResponse } from "../models/tag.model";

export const tagAdapter = (
  tagResponse: ITagResponse
): ITag => ({
  idTag: tagResponse.idtag,
  name: tagResponse.name,
  color: tagResponse.color,
  visible: tagResponse.visible,
  enable: tagResponse.enable,
  createdAt: tagResponse.created_at,
  updatedAt: tagResponse.updated_at,
});
