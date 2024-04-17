import { registerEnumType } from '@nestjs/graphql';

export enum Rol {
  ADMIN = 'admin',
  USER = 'user',
  DISTRIBUTOR = 'distributor',
}

registerEnumType(Rol, {
  name: 'Rol',
  description: 'Rol de usuario',
  valuesMap: {
    ADMIN: {
      description: 'Administrador',
    },
    USER: {
      description: 'Usuario',
    },
    DISTRIBUTOR: {
      description: 'Distribuidor',
    },
  },
});
