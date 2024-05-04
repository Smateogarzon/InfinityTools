export interface UserInfo {
  _id?: string;
  firtsName: string;
  middleName?: string;
  lastName?: string;
  middleLastName?: string;
  email?: string;
  rol?: string;
  location?: UserLocation;
  gender?: string;
  subscribe?: boolean;
  status?: string;
  picture?: string;
  date?: string;
}

export interface UserLocation {
  _id?: string;
  tel?: string;
  zipCode?: string;
  address?: string;
  city?: string;
  state?: string;
}

export interface IQueryFindAllusers {
  FindAllusers?: UserInfo[] | undefined;
}

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
  ADMIN = 'ADMIN',
  USER = 'USER',
  DISTRIBUTOR = 'DISTRIBUTOR',
}
