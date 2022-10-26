export interface IEquipoPost {
  name: string;
  description: string;
  quantity: number;
}

export interface IEquipoPut extends IEquipoPost {
    id: number;
}

export interface IEquipo {
  idEquipment: number;
  name: string;
  description: string;
  quantity: number;
  enable: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IEquipoResponse {
  idequipment: number;
  name: string;
  description: string;
  quantity: number;
  enable: number;
  created_at: Date;
  updated_at: Date;
}
