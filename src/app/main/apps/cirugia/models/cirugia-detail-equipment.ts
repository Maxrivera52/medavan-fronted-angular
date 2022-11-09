export interface ICirugiaDetailEquipmentPost {
    id_cirugia:number;
    id_equipment:number;
  }
  
  export interface ICirugiaDetailEquipmentPut extends ICirugiaDetailEquipmentPost {
      id: number;
  }
  
  export interface ICirugiaDetailEquipment {
    id:number;
    id_cirugia:number;
    id_equipment:number;
    createdAt: Date;
    updatedAt: Date;
    cirugia: ICirugia
    equipment: IEquipment
  }

  interface ICirugia{
    description:string;
  }

  interface IEquipment{
    description:string;
  }
  