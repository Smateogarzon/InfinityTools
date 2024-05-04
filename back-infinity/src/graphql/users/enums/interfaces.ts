import { UserGender, UserRol, UserStatus } from './user.enums';

export interface IQuery {
  completeName?: { $regex: string; $options: string };
  status?: UserStatus;
  rol?: UserRol;
  gender?: UserGender;
}
