export interface IUserPost {
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  idrol: number;
}

export interface IUserPut extends IUserPost {
    id: number;
}

export interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  idrol: number;
  enable: number;
  createdAt: Date;
  updatedAt: Date;
  rol: IRol;
}

export interface IUserResponse {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  idrol: number;
  enable: number;
  created_at: Date;
  updated_at: Date;
  rol: IRol;
}

export interface IRol {
  description: string;
}