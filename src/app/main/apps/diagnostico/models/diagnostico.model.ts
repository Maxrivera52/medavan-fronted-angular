export interface IDiagnosticoPost {
  description: string;
}

export interface IDiagnosticoPut extends IDiagnosticoPost {
    id: number;
}

export interface IDiagnostico {
  idDiagnostic: number;
  description: string;
  enable: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDiagnosticoResponse {
  iddiagnostic: number;
  description: string;
  enable: number;
  created_at: Date;
  updated_at: Date;
}
