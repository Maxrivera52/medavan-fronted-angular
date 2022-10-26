export interface IDiagnosticoPost {
  description: string;
  idspecialty: number;
}

export interface IDiagnosticoPut extends IDiagnosticoPost {
    id: number;
}

export interface IDiagnostico {
  idDiagnostic: number;
  description: string;
  idSpecialty: number;
  enable: number;
  createdAt: Date;
  updatedAt: Date;
  specialty:Idspecialty
}

export interface IDiagnosticoResponse {
  iddiagnostic: number;
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