export interface IMaterialPost {
  name_material: string;
  description: string;
}

export interface IMaterialPut extends IMaterialPost {
    id: number;
}

export interface IMaterial {
  idMaterial: number;
  nameMaterial: string;
  description: string;
  enable: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMaterialResponse {
  idmaterial: number;
  name_material: string;
  description: string;
  enable: number;
  created_at: Date;
  updated_at: Date;
}
