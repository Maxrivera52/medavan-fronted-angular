import { IDiagnostico } from "./diagnostico.model";

export interface IDiagnosticoDetailSpecialtyPost {
    id_diagnostic:number;
    id_specialty:number;
  }
  
  export interface IDiagnosticoDetailSpecialtyPut extends IDiagnosticoDetailSpecialtyPost {
      id: number;
  }
  
  export interface IDiagnosticoDetailSpecialty {
    id:number;
    id_diagnostic:number;
    id_specialty:number;
    createdAt: Date;
    updatedAt: Date;
    specialty: ISpecialty
    diagnostic: IDiagnostic
  }

  interface ISpecialty{
    description:string;
  }

  interface IDiagnostic{
    description:string;
  }
  
  