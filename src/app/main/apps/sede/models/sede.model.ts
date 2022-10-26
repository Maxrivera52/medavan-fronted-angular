export interface ISedePost {
  description: string;
  sala: string;
  cuartos: string;
  cubiculos: string;
  color: string;
}

export interface ISedePut extends ISedePost {
    id: number;
}

export interface ISede {
  idSede: number;
  description: string;
  sala: string;
  cuartos: string;
  cubiculos: string;
  color: string;
  enable: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISedeResponse {
  idsede: number;
  description: string;
  sala: string;
  cuartos: string;
  cubiculos: string;
  color: string;
  enable: number;
  created_at: Date;
  updated_at: Date;
}
