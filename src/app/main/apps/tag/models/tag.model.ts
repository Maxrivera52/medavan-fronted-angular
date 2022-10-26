export interface ITagPost {
  name: string;
  color: string;
  visible: string;
}

export interface ITagPut extends ITagPost {
    id: number;
}

export interface ITag {
  idTag: number;
  name: string;
  color: string;
  visible: string;
  enable: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITagResponse {
  idtag: number;
  name: string;
  color: string;
  visible: string;
  enable: number;
  created_at: Date;
  updated_at: Date;
}
