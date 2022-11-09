export interface ICirugiaDetailAnesthesiaPost {
    id_cirugia:number;
    id_anesthesia:number;
  }
  
  export interface ICirugiaDetailAnesthesiaPut extends ICirugiaDetailAnesthesiaPost {
      id: number;
  }
  
  export interface ICirugiaDetailAnesthesia {
    id:number;
    id_cirugia:number;
    id_anesthesia:number;
    createdAt: Date;
    updatedAt: Date;
    cirugia: ICirugia
    anesthesia: IAnesthesia
  }

  interface ICirugia{
    description:string;
  }

  interface IAnesthesia{
    description:string;
  }
  
  