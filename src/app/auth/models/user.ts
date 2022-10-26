import { Rol } from './role';

export class User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar: string;
  idrol: Rol;
  accesstoken?: string;
}
