export interface ICirugiaPost {
  description: string;
  idspecialty: number;
}

export interface ICirugiaPut extends ICirugiaPost {
    id: number;
}

export interface ICirugia {
  idCirugia:number,
  description: string;
  idSpecialty: number;
  enable: number;
  createdAt: Date;
  updatedAt: Date;
  specialty:Idspecialty
}

export interface ICirugiaResponse {
  idcirugia: number;
  description: string;
  idspecialty: number;
  enable: number;
  created_at: Date;
  updated_at: Date;
  specialty:Idspecialty
}

export interface Idspecialty {
  description: string;
}