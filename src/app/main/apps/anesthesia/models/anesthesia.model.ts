export interface IAnesthesiaPost {
  description: string;
}

export interface IAnesthesiaPut extends IAnesthesiaPost {
    id: number;
}

export interface IAnesthesia {
  idAnesthesia: number;
  description: string;
  enable: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAnesthesiaResponse {
  idanesthesia: number;
  description: string;
  enable: number;
  created_at: Date;
  updated_at: Date;
}
