export interface ICirugiaDetailSpecialtyPost {
    id_cirugia:number;
    id_specialty:number;
  }
  
  export interface ICirugiaDetailSpecialtyPut extends ICirugiaDetailSpecialtyPost {
      id: number;
  }
  
  export interface ICirugiaDetailSpecialty {
    id:number;
    id_cirugia:number;
    id_specialty:number;
    createdAt: Date;
    updatedAt: Date;
    cirugia: ICirugia
    specialty: ISpecialty
  }

  interface ICirugia{
    description:string;
  }

  interface ISpecialty{
    description:string;
  }
  