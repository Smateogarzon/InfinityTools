import { registerEnumType } from '@nestjs/graphql';

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
}

export enum UserGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export enum UserRol {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER',
  DISTRIBUTOR = 'DISTRIBUTOR',
}

registerEnumType(UserRol, { name: 'UserRol' });
registerEnumType(UserStatus, { name: 'UserStatus' });
registerEnumType(UserGender, { name: 'UserGender' });
