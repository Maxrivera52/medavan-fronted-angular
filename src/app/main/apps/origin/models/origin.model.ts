export interface IOriginPost {
  description: string;
}

export interface IOriginPut extends IOriginPost {
    id: number;
}

export interface IOrigin {
  idSource: number;
  description: string;
  enable: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOriginResponse {
  idsource: number;
  description: string;
  enable: number;
  created_at: Date;
  updated_at: Date;
}
