import { IUser, IUserResponse } from "../models/user.model";

export const userAdapter = (
  userResponse: IUserResponse
): IUser => ({
  id: userResponse.id,
  email: userResponse.email,
  firstName: userResponse.first_name,
  lastName: userResponse.last_name,
  avatar: userResponse.avatar,
  idrol: userResponse.idrol,
  enable: userResponse.enable,
  createdAt: userResponse.created_at,
  updatedAt: userResponse.updated_at,
  rol: {
    description: userResponse.rol.description
  }
});