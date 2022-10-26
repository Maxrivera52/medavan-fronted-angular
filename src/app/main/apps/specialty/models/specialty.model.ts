export interface ISpecialtyPost {
  description: string;
}

export interface ISpecialtyPut extends ISpecialtyPost {
    id: number;
}

export interface ISpecialty {
  idSpecialty: number;
  description: string;
  enable: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISpecialtyResponse {
  idspecialty: number;
  description: string;
  enable: number;
  created_at: Date;
  updated_at: Date;
}
